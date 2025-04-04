"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client safely with fallbacks for SSR/build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "example-key"
const supabase = createClient(supabaseUrl, supabaseKey)

interface CompanyApplicationsProps {
  companyId: string
}

export function CompanyApplications({ companyId }: CompanyApplicationsProps) {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data, error } = await supabase
          .from("applications")
          .select(`
            *,
            jobs:job_id (title),
            job_seekers:seeker_id (full_name, email)
          `)
          .eq("company_id", companyId)
          .order("created_at", { ascending: false })

        if (error) throw error
        setApplications(data || [])
      } catch (error) {
        console.error("Error fetching applications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [companyId])

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("applications")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", applicationId)

      if (error) throw error

      // Update the applications list after status change
      setApplications(applications.map((app) => (app.id === applicationId ? { ...app, status } : app)))
    } catch (error) {
      console.error("Error updating application status:", error)
    }
  }

  if (loading) {
    return <div>Loading applications...</div>
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-6">
            <h3 className="text-lg font-medium mb-2">No applications yet</h3>
            <p className="text-muted-foreground">Applications from job seekers will appear here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Job Applications</h2>

      <div className="grid gap-4">
        {applications.map((application) => (
          <Card key={application.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{application.job_seekers.full_name}</CardTitle>
                  <div className="text-sm text-muted-foreground">Applied for: {application.jobs.title}</div>
                </div>
                <Badge
                  variant={
                    application.status === "pending"
                      ? "outline"
                      : application.status === "reviewing"
                        ? "secondary"
                        : application.status === "accepted"
                          ? "default"
                          : "destructive"
                  }
                >
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <div className="text-sm font-medium mb-1">Contact</div>
                  <div className="text-sm">{application.job_seekers.email}</div>
                </div>

                {application.cover_letter && (
                  <div>
                    <div className="text-sm font-medium mb-1">Cover Letter</div>
                    <div className="text-sm bg-muted p-3 rounded-md max-h-32 overflow-y-auto">
                      {application.cover_letter}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Applied {new Date(application.created_at).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    {application.resume_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={application.resume_url} target="_blank" rel="noopener noreferrer">
                          View Resume
                        </a>
                      </Button>
                    )}

                    <Select
                      defaultValue={application.status}
                      onValueChange={(value) => updateApplicationStatus(application.id, value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

