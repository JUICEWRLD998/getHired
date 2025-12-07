"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { mockResumes } from "@/lib/mock-data"
import { Application, ApplicationStatus } from "@/lib/types"

interface ApplicationFormProps {
  application?: Application
  mode: "create" | "edit"
}

export function ApplicationForm({ application, mode }: ApplicationFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Form state
  const [jobTitle, setJobTitle] = useState(application?.jobTitle || "")
  const [company, setCompany] = useState(application?.company || "")
  const [location, setLocation] = useState(application?.location || "")
  const [salary, setSalary] = useState(application?.salary || "")
  const [jobType, setJobType] = useState(application?.jobType || "")
  const [jobUrl, setJobUrl] = useState(application?.jobUrl || "")
  const [status, setStatus] = useState<ApplicationStatus>(application?.status || "SAVED")
  const [applicationDate, setApplicationDate] = useState<Date | undefined>(
    application?.applicationDate ? new Date(application.applicationDate) : undefined
  )
  const [resumeId, setResumeId] = useState(application?.resumeId || "")
  const [description, setDescription] = useState(application?.description || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For now, just redirect back to applications list
    router.push("/dashboard/applications")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/applications">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {mode === "create" ? "Add New Application" : "Edit Application"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "create"
              ? "Track a new job application"
              : `Editing ${application?.jobTitle} at ${application?.company}`}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Enter the details of the job you&apos;re applying for
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Job Title & Company */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Senior Frontend Developer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  placeholder="e.g., Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Location & Salary */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, CA or Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Input
                  id="salary"
                  placeholder="e.g., $150,000 - $200,000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
            </div>

            {/* Job Type & Job URL */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type</Label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobUrl">Job Link</Label>
                <Input
                  id="jobUrl"
                  type="url"
                  placeholder="https://..."
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                />
              </div>
            </div>

            {/* Status & Date Applied */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as ApplicationStatus)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAVED">Saved</SelectItem>
                    <SelectItem value="APPLIED">Applied</SelectItem>
                    <SelectItem value="INTERVIEWING">Interviewing</SelectItem>
                    <SelectItem value="OFFER">Offer</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                    <SelectItem value="ACCEPTED">Accepted</SelectItem>
                    <SelectItem value="WITHDRAWN">Withdrawn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date Applied</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !applicationDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {applicationDate ? format(applicationDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={applicationDate}
                      onSelect={setApplicationDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Resume */}
            <div className="space-y-2">
              <Label htmlFor="resume">Resume</Label>
              <Select value={resumeId} onValueChange={setResumeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a resume" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No resume attached</SelectItem>
                  {mockResumes.map((resume) => (
                    <SelectItem key={resume.id} value={resume.id}>
                      {resume.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description / Notes */}
            <div className="space-y-2">
              <Label htmlFor="description">Notes</Label>
              <Textarea
                id="description"
                placeholder="Add any notes about this job application..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/applications">Cancel</Link>
              </Button>
              <Button type="submit" disabled={loading}>
                {loading
                  ? mode === "create"
                    ? "Saving..."
                    : "Updating..."
                  : mode === "create"
                  ? "Save Application"
                  : "Update Application"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
