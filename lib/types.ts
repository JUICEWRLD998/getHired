// Application status enum matching Prisma schema
export type ApplicationStatus = 
  | "SAVED"
  | "APPLIED"
  | "INTERVIEWING"
  | "OFFER"
  | "REJECTED"
  | "ACCEPTED"
  | "WITHDRAWN"

// Main Application type
export interface Application {
  id: string
  jobTitle: string
  company: string
  location?: string
  salary?: string
  jobType?: string // Full-time, Part-time, Contract, Remote
  status: ApplicationStatus
  dateApplied: string
  applicationDate?: string
  deadline?: string
  jobUrl?: string
  notes?: string // Initial notes when creating
  description?: string
  resumeId?: string
  resumeName?: string
  createdAt: string
  updatedAt: string
  // Related entities
  applicationNotes?: Note[]
  interviews?: Interview[]
  files?: FileAttachment[]
}

// Note attached to an application
export interface Note {
  id: string
  applicationId: string
  content: string
  createdAt: string
  updatedAt: string
}

// Interview scheduled for an application
export interface Interview {
  id: string
  applicationId: string
  type: "PHONE" | "VIDEO" | "ONSITE" | "TECHNICAL" | "BEHAVIORAL" | "FINAL"
  scheduledAt: string
  location?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

// File attachment (resume, cover letter)
export interface FileAttachment {
  id: string
  applicationId: string
  name: string
  type: "resume" | "cover_letter" | "portfolio" | "other"
  url: string
  createdAt: string
}

// Resume for dropdown selection
export interface Resume {
  id: string
  name: string
  fileName?: string
  fileUrl?: string
  isDefault?: boolean
  createdAt: string
}

// Status configuration for UI
export const statusConfig: Record<ApplicationStatus, { label: string; color: string }> = {
  SAVED: { label: "Saved", color: "bg-muted text-muted-foreground" },
  APPLIED: { label: "Applied", color: "bg-primary/10 text-primary" },
  INTERVIEWING: { label: "Interviewing", color: "bg-amber-500/10 text-amber-600" },
  OFFER: { label: "Offer", color: "bg-green-500/10 text-green-600" },
  REJECTED: { label: "Rejected", color: "bg-destructive/10 text-destructive" },
  ACCEPTED: { label: "Accepted", color: "bg-green-500/10 text-green-600" },
  WITHDRAWN: { label: "Withdrawn", color: "bg-muted text-muted-foreground" },
}
