"use client"

import { useState } from "react"
import { Interview } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Phone, 
  Building2,
  Edit2,
  Trash2 
} from "lucide-react"
import { format } from "date-fns"

interface InterviewsTabProps {
  interviews: Interview[]
}

const interviewTypeIcons = {
  PHONE: Phone,
  VIDEO: Video,
  ONSITE: Building2,
  TECHNICAL: Video,
  BEHAVIORAL: Video,
  FINAL: Building2,
}

const interviewTypeColors = {
  PHONE: "bg-blue-100 text-blue-800",
  VIDEO: "bg-purple-100 text-purple-800",
  ONSITE: "bg-green-100 text-green-800",
  TECHNICAL: "bg-orange-100 text-orange-800",
  BEHAVIORAL: "bg-pink-100 text-pink-800",
  FINAL: "bg-emerald-100 text-emerald-800",
}

type InterviewType = "PHONE" | "VIDEO" | "ONSITE" | "TECHNICAL" | "BEHAVIORAL" | "FINAL"

export function InterviewsTab({ interviews: initialInterviews }: InterviewsTabProps) {
  const [interviews, setInterviews] = useState<Interview[]>(initialInterviews)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [formData, setFormData] = useState({
    type: "VIDEO" as InterviewType,
    scheduledAt: "",
    time: "",
    location: "",
    notes: "",
  })

  const handleAddInterview = () => {
    if (!formData.scheduledAt || !formData.time) return
    
    const dateTime = new Date(`${formData.scheduledAt}T${formData.time}`)
    
    const newInterview: Interview = {
      id: `interview-${Date.now()}`,
      type: formData.type,
      scheduledAt: dateTime.toISOString(),
      location: formData.location || undefined,
      notes: formData.notes || undefined,
      applicationId: "temp",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    setInterviews([...interviews, newInterview].sort(
      (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
    ))
    setFormData({
      type: "VIDEO",
      scheduledAt: "",
      time: "",
      location: "",
      notes: "",
    })
    setIsAddOpen(false)
  }

  const handleDeleteInterview = (interviewId: string) => {
    setInterviews(interviews.filter(i => i.id !== interviewId))
  }

  const upcomingInterviews = interviews.filter(
    i => new Date(i.scheduledAt) >= new Date()
  )
  const pastInterviews = interviews.filter(
    i => new Date(i.scheduledAt) < new Date()
  )

  const InterviewCard = ({ interview }: { interview: Interview }) => {
    const Icon = interviewTypeIcons[interview.type]
    const isPast = new Date(interview.scheduledAt) < new Date()
    
    return (
      <Card className={`group ${isPast ? "opacity-60" : ""}`}>
        <CardContent className="py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={interviewTypeColors[interview.type]}>
                    {interview.type.charAt(0) + interview.type.slice(1).toLowerCase()}
                  </Badge>
                  {isPast && (
                    <Badge variant="secondary">Completed</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(interview.scheduledAt), "MMM d, yyyy")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {format(new Date(interview.scheduledAt), "h:mm a")}
                  </div>
                </div>
                {interview.location && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    {interview.location}
                  </div>
                )}
                {interview.notes && (
                  <p className="text-sm mt-2 text-muted-foreground">
                    {interview.notes}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => handleDeleteInterview(interview.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add Interview Button */}
      <div className="flex justify-end">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Schedule Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Interview Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: InterviewType) => 
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PHONE">Phone Screen</SelectItem>
                    <SelectItem value="VIDEO">Video Call</SelectItem>
                    <SelectItem value="ONSITE">On-site</SelectItem>
                    <SelectItem value="TECHNICAL">Technical</SelectItem>
                    <SelectItem value="BEHAVIORAL">Behavioral</SelectItem>
                    <SelectItem value="FINAL">Final Round</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.scheduledAt}
                    onChange={(e) => 
                      setFormData({ ...formData, scheduledAt: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => 
                      setFormData({ ...formData, time: e.target.value })
                    }
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location">Location / Meeting Link</Label>
                <Input
                  id="location"
                  placeholder="e.g., Zoom link or office address"
                  value={formData.location}
                  onChange={(e) => 
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional details..."
                  value={formData.notes}
                  onChange={(e) => 
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddInterview} 
                className="bg-primary hover:bg-primary/90"
              >
                Schedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Empty State */}
      {interviews.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg mb-1">No interviews scheduled</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Schedule your first interview for this application.
            </p>
            <Button 
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={() => setIsAddOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Schedule Interview
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Upcoming Interviews */}
          {upcomingInterviews.length > 0 && (
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-3">
                Upcoming ({upcomingInterviews.length})
              </h3>
              <div className="space-y-3">
                {upcomingInterviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            </div>
          )}

          {/* Past Interviews */}
          {pastInterviews.length > 0 && (
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-3">
                Past ({pastInterviews.length})
              </h3>
              <div className="space-y-3">
                {pastInterviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
