"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Eye, 
  Pencil, 
  Trash2,
  ExternalLink,
  FileText,
  Building2,
  MapPin,
  Calendar,
  ArrowUpDown,
  Briefcase
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { mockApplications } from "@/lib/mock-data"
import { statusConfig, ApplicationStatus } from "@/lib/types"

// Format date as relative time (e.g., "3 days ago")
function formatRelativeDate(dateString?: string) {
  if (!dateString) return "—"
  
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return "1 week ago"
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 60) return "1 month ago"
  return `${Math.floor(diffDays / 30)} months ago`
}

type SortOption = "date-desc" | "date-asc" | "company-asc" | "company-desc" | "title-asc"

export default function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<SortOption>("date-desc")

  // Filter and sort applications
  const filteredApplications = useMemo(() => {
    let result = mockApplications.filter((app) => {
      const matchesSearch =
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.company.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = statusFilter === "all" || app.status === statusFilter

      return matchesSearch && matchesStatus
    })

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.dateApplied || b.createdAt).getTime() - new Date(a.dateApplied || a.createdAt).getTime()
        case "date-asc":
          return new Date(a.dateApplied || a.createdAt).getTime() - new Date(b.dateApplied || b.createdAt).getTime()
        case "company-asc":
          return a.company.localeCompare(b.company)
        case "company-desc":
          return b.company.localeCompare(a.company)
        case "title-asc":
          return a.jobTitle.localeCompare(b.jobTitle)
        default:
          return 0
      }
    })

    return result
  }, [searchQuery, statusFilter, sortBy])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground">
            Track and manage your job applications
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/applications/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Application
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by job title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="SAVED">Saved</SelectItem>
            <SelectItem value="APPLIED">Applied</SelectItem>
            <SelectItem value="INTERVIEWING">Interviewing</SelectItem>
            <SelectItem value="OFFER">Offer</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
            <SelectItem value="ACCEPTED">Accepted</SelectItem>
            <SelectItem value="WITHDRAWN">Withdrawn</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Date (Newest)</SelectItem>
            <SelectItem value="date-asc">Date (Oldest)</SelectItem>
            <SelectItem value="company-asc">Company (A-Z)</SelectItem>
            <SelectItem value="company-desc">Company (Z-A)</SelectItem>
            <SelectItem value="title-asc">Job Title (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-48">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Briefcase className="h-12 w-12 text-muted-foreground mb-3" />
                      <h3 className="font-medium text-lg mb-1">No applications found</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {searchQuery || statusFilter !== "all"
                          ? "Try adjusting your search or filters"
                          : "Start tracking your job search by adding your first application"}
                      </p>
                      {!searchQuery && statusFilter === "all" && (
                        <Button asChild size="sm">
                          <Link href="/dashboard/applications/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Application
                          </Link>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <Link 
                          href={`/dashboard/applications/${app.id}`}
                          className="font-medium hover:text-primary hover:underline"
                        >
                          {app.jobTitle}
                        </Link>
                        {app.location && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {app.location}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <span>{app.company}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusConfig[app.status as ApplicationStatus].color}
                      >
                        {statusConfig[app.status as ApplicationStatus].label}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatRelativeDate(app.dateApplied || app.applicationDate)}</TableCell>
                    <TableCell>
                      {app.resumeName ? (
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <FileText className="h-3 w-3" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/applications/${app.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/applications/${app.id}/edit`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          {app.jobUrl && (
                            <DropdownMenuItem asChild>
                              <a href={app.jobUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Open Job Link
                              </a>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {filteredApplications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Briefcase className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="font-medium text-lg mb-1">No applications found</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Start tracking your job search"}
              </p>
              {!searchQuery && statusFilter === "all" && (
                <Button asChild size="sm">
                  <Link href="/dashboard/applications/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Application
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredApplications.map((app) => (
            <Card key={app.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Link 
                      href={`/dashboard/applications/${app.id}`}
                      className="font-semibold hover:text-primary hover:underline"
                    >
                      {app.jobTitle}
                    </Link>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {app.company}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={statusConfig[app.status as ApplicationStatus].color}
                  >
                    {statusConfig[app.status as ApplicationStatus].label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    {app.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {app.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatRelativeDate(app.dateApplied || app.applicationDate)}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/applications/${app.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/applications/${app.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
