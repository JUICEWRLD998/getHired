"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, MapPin } from "lucide-react"
import Link from "next/link"

// Mock data for upcoming interviews
const upcomingInterviews = [
  {
    id: "1",
    company: "Google",
    position: "Senior Frontend Developer",
    date: "2024-12-10",
    time: "10:00 AM",
    type: "Video Call",
    round: "Technical Round 2",
  },
  {
    id: "2",
    company: "Stripe",
    position: "Full Stack Engineer",
    date: "2024-12-12",
    time: "2:00 PM",
    type: "Video Call",
    round: "System Design",
  },
  {
    id: "3",
    company: "Netflix",
    position: "React Developer",
    date: "2024-12-15",
    time: "11:00 AM",
    type: "On-site",
    round: "Final Round",
  },
  {
    id: "4",
    company: "Airbnb",
    position: "Software Engineer",
    date: "2024-12-18",
    time: "3:30 PM",
    type: "Video Call",
    round: "HR Interview",
  },
  {
    id: "5",
    company: "Shopify",
    position: "Frontend Developer",
    date: "2024-12-20",
    time: "9:00 AM",
    type: "Phone",
    round: "Initial Screen",
  },
]

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

function getDaysUntil(dateString: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const interviewDate = new Date(dateString)
  interviewDate.setHours(0, 0, 0, 0)
  const diffTime = interviewDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Tomorrow"
  if (diffDays < 0) return "Passed"
  return `In ${diffDays} days`
}

export function UpcomingInterviews() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Upcoming Interviews</CardTitle>
          <CardDescription>
            Your scheduled interviews this month
          </CardDescription>
        </div>
        <Link
          href="/dashboard/interviews"
          className="text-sm text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingInterviews.map((interview) => (
            <div
              key={interview.id}
              className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {interview.company}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {interview.position}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {interview.time}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      {interview.type === "Video Call" ? (
                        <Video className="h-3 w-3" />
                      ) : (
                        <MapPin className="h-3 w-3" />
                      )}
                      {interview.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge
                  variant="secondary"
                  className="bg-amber-500/10 text-amber-600"
                >
                  {getDaysUntil(interview.date)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDate(interview.date)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
