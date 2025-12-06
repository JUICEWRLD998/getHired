"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar, Briefcase, XCircle, TrendingUp, TrendingDown } from "lucide-react"
import { ApplicationsChart } from "@/components/dashboard/applications-chart"
import { StatusChart } from "@/components/dashboard/status-chart"
import { RecentApplications } from "@/components/dashboard/recent-applications"
import { UpcomingInterviews } from "@/components/dashboard/upcoming-interviews"

// Mock stats data
const stats = {
  totalApplications: 88,
  totalApplicationsChange: 12,
  interviewsThisWeek: 5,
  interviewsChange: 2,
  offersReceived: 3,
  offersChange: 1,
  rejectedApplications: 18,
  rejectedChange: -3,
}

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showSpinner, setShowSpinner] = useState(false)

  // Show spinner for 3 seconds on fresh login
  useEffect(() => {
    const isNewLogin = searchParams.get("welcome") === "true"
    if (isNewLogin) {
      setShowSpinner(true)
      const timer = setTimeout(() => {
        setShowSpinner(false)
        router.replace("/dashboard")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [searchParams, router])

  if (showSpinner) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <Spinner className="size-8 text-primary" />
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your job search progress.
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              {stats.totalApplicationsChange > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{stats.totalApplicationsChange}</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-destructive" />
                  <span className="text-destructive">{stats.totalApplicationsChange}</span>
                </>
              )}
              <span>from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviewsThisWeek}</div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              {stats.interviewsChange > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{stats.interviewsChange}</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-destructive" />
                  <span className="text-destructive">{stats.interviewsChange}</span>
                </>
              )}
              <span>from last week</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers Received</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offersReceived}</div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              {stats.offersChange > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{stats.offersChange}</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-destructive" />
                  <span className="text-destructive">{stats.offersChange}</span>
                </>
              )}
              <span>from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected Applications</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejectedApplications}</div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              {stats.rejectedChange < 0 ? (
                <>
                  <TrendingDown className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">{stats.rejectedChange}</span>
                </>
              ) : (
                <>
                  <TrendingUp className="h-3 w-3 text-destructive" />
                  <span className="text-destructive">+{stats.rejectedChange}</span>
                </>
              )}
              <span>from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ApplicationsChart />
        <StatusChart />
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        <RecentApplications />
        <UpcomingInterviews />
      </div>
    </div>
  )
}
