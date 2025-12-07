"use client"

import { useParams } from "next/navigation"
import { mockApplications } from "@/lib/mock-data"
import { ApplicationForm } from "@/components/applications/application-form"

export default function EditApplicationPage() {
  const params = useParams()
  const applicationId = params.id as string
  
  // Find application from mock data
  const application = mockApplications.find(app => app.id === applicationId)

  if (!application) {
    return null
  }

  return <ApplicationForm mode="edit" application={application} />
}
