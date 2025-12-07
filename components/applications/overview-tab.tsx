"use client"

import { Application } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Calendar, 
  ExternalLink, 
  FileText, 
  Mail, 
  MapPin 
} from "lucide-react"
import { format } from "date-fns"

interface OverviewTabProps {
  application: Application
}

const statusColors: Record<string, string> = {
  SAVED: "bg-gray-100 text-gray-800",
  APPLIED: "bg-blue-100 text-blue-800",
  INTERVIEWING: "bg-purple-100 text-purple-800",
  OFFER: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  ACCEPTED: "bg-emerald-100 text-emerald-800",
  WITHDRAWN: "bg-orange-100 text-orange-800",
}

export function OverviewTab({ application }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Job Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Job Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Company</p>
                <p className="font-medium">{application.company}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Date Applied</p>
                <p className="font-medium">
                  {format(new Date(application.dateApplied), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
            
            {application.location && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{application.location}</p>
                </div>
              </div>
            )}
            
            {application.salary && (
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Salary</p>
                  <p className="font-medium">{application.salary}</p>
                </div>
              </div>
            )}
          </div>
          
          {application.jobUrl && (
            <div className="pt-4 border-t">
              <Button variant="outline" asChild>
                <a 
                  href={application.jobUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Job Posting
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Send Follow-up
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Interview
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Add Note
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Application Timeline Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Application Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="font-medium text-sm">Application Submitted</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(application.dateApplied), "MMMM d, yyyy")}
                </p>
              </div>
              <Badge className={statusColors["APPLIED"]}>Applied</Badge>
            </div>
            
            {application.status !== "APPLIED" && application.status !== "SAVED" && (
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Status Updated</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(application.updatedAt), "MMMM d, yyyy")}
                  </p>
                </div>
                <Badge className={statusColors[application.status]}>
                  {application.status.charAt(0) + application.status.slice(1).toLowerCase()}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Description Card */}
      {application.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Initial Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {application.notes}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
