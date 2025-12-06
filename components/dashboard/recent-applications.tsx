"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"

// Mock data for recent applications
const recentApplications = [
  {
    id: "1",
    company: "Google",
    position: "Senior Frontend Developer",
    location: "Mountain View, CA",
    status: "INTERVIEWING",
    appliedDate: "2024-12-04",
  },
  {
    id: "2",
    company: "Meta",
    position: "Software Engineer",
    location: "Menlo Park, CA",
    status: "APPLIED",
    appliedDate: "2024-12-03",
  },
  {
    id: "3",
    company: "Amazon",
    position: "Full Stack Developer",
    location: "Seattle, WA",
    status: "APPLIED",
    appliedDate: "2024-12-02",
  },
  {
    id: "4",
    company: "Microsoft",
    position: "React Developer",
    location: "Redmond, WA",
    status: "REJECTED",
    appliedDate: "2024-12-01",
  },
  {
    id: "5",
    company: "Apple",
    position: "iOS Developer",
    location: "Cupertino, CA",
    status: "OFFER",
    appliedDate: "2024-11-30",
  },
]

const statusStyles: Record<string, string> = {
  SAVED: "bg-muted text-muted-foreground",
  APPLIED: "bg-primary/10 text-primary",
  INTERVIEWING: "bg-amber-500/10 text-amber-600",
  OFFER: "bg-green-500/10 text-green-600",
  REJECTED: "bg-destructive/10 text-destructive",
  ACCEPTED: "bg-green-500/10 text-green-600",
  WITHDRAWN: "bg-muted text-muted-foreground",
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export function RecentApplications() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>
            Your latest job applications
          </CardDescription>
        </div>
        <Link
          href="/dashboard/applications"
          className="text-sm text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentApplications.map((application) => (
            <div
              key={application.id}
              className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {application.position}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{application.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {application.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {formatDate(application.appliedDate)}
                </span>
                <Badge
                  variant="secondary"
                  className={statusStyles[application.status]}
                >
                  {application.status.charAt(0) + application.status.slice(1).toLowerCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
