"use client"

import { useParams, useRouter } from "next/navigation"
import { mockApplications } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { 
  ArrowLeft, 
  Building2, 
  Edit, 
  Trash2,
  FileText,
  MessageSquare,
  Calendar,
  Folder
} from "lucide-react"
import { useState } from "react"
import { ApplicationStatus } from "@/lib/types"
import { OverviewTab } from "@/components/applications/overview-tab"
import { NotesTab } from "@/components/applications/notes-tab"
import { InterviewsTab } from "@/components/applications/interviews-tab"
import { FilesTab } from "@/components/applications/files-tab"

const statusColors: Record<string, string> = {
  SAVED: "bg-gray-100 text-gray-800 border-gray-300",
  APPLIED: "bg-blue-100 text-blue-800 border-blue-300",
  INTERVIEWING: "bg-purple-100 text-purple-800 border-purple-300",
  OFFER: "bg-green-100 text-green-800 border-green-300",
  REJECTED: "bg-red-100 text-red-800 border-red-300",
  ACCEPTED: "bg-emerald-100 text-emerald-800 border-emerald-300",
  WITHDRAWN: "bg-orange-100 text-orange-800 border-orange-300",
}

const statusLabels: Record<string, string> = {
  SAVED: "Saved",
  APPLIED: "Applied",
  INTERVIEWING: "Interviewing",
  OFFER: "Offer Received",
  REJECTED: "Rejected",
  ACCEPTED: "Accepted",
  WITHDRAWN: "Withdrawn",
}

export default function ApplicationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const applicationId = params.id as string
  
  // Find application from mock data
  const application = mockApplications.find(app => app.id === applicationId)
  
  const [status, setStatus] = useState<ApplicationStatus>(
    application?.status || "APPLIED"
  )

  if (!application) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Application not found</h2>
        <p className="text-muted-foreground mb-4">
          The application you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button onClick={() => router.push("/dashboard/applications")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Applications
        </Button>
      </div>
    )
  }

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    setStatus(newStatus)
    // In real app, would save to database here
  }

  const handleDelete = () => {
    // In real app, would delete from database
    router.push("/dashboard/applications")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/applications")}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">{application.jobTitle}</h1>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{application.company}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 ml-12 sm:ml-0">
          {/* Status Selector */}
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className={`w-40 ${statusColors[status]}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SAVED">Saved</SelectItem>
              <SelectItem value="APPLIED">Applied</SelectItem>
              <SelectItem value="INTERVIEWING">Interviewing</SelectItem>
              <SelectItem value="OFFER">Offer Received</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="ACCEPTED">Accepted</SelectItem>
              <SelectItem value="WITHDRAWN">Withdrawn</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Edit Button */}
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/applications/${applicationId}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          
          {/* Delete Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Application</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this application for{" "}
                  <strong>{application.jobTitle}</strong> at{" "}
                  <strong>{application.company}</strong>? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="overview" className="gap-2">
            <FileText className="h-4 w-4 hidden sm:inline" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="notes" className="gap-2">
            <MessageSquare className="h-4 w-4 hidden sm:inline" />
            Notes
            {application.applicationNotes && application.applicationNotes.length > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs justify-center">
                {application.applicationNotes.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="interviews" className="gap-2">
            <Calendar className="h-4 w-4 hidden sm:inline" />
            Interviews
            {application.interviews && application.interviews.length > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs justify-center">
                {application.interviews.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="files" className="gap-2">
            <Folder className="h-4 w-4 hidden sm:inline" />
            Files
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab application={application} />
        </TabsContent>

        <TabsContent value="notes">
          <NotesTab notes={application.applicationNotes || []} />
        </TabsContent>

        <TabsContent value="interviews">
          <InterviewsTab interviews={application.interviews || []} />
        </TabsContent>

        <TabsContent value="files">
          <FilesTab 
            files={application.files || []} 
            resumeId={application.resumeId}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
