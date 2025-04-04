"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@supabase/supabase-js"
import { Building, MapPin, Clock } from "lucide-react"

// Initialize Supabase client safely with fallbacks for SSR/build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "example-key"
const supabase = createClient(supabaseUrl, supabaseKey)

interface SeekerApplicationsProps {
  seekerId: string
}

export function SeekerApplications({ seekerId }: SeekerApplicationsProps) {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data, error } = await supabase
          .from("applications")
          .select(`
            *,
            jobs:job_id (title, location, job_type, company_id),
            companies:company_id (company_name)
          `)
          .eq("seeker_id", seekerId)
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
  }, [seekerId])

  const withdrawApplication = async (applicationId: string) => {
    if (confirm("Are you sure you want to withdraw this application?")) {
      try {
        const { error } = await supabase.from("applications").delete().eq("id", applicationId)

        if (error) throw error

        // Update the applications list after withdrawal
        setApplications(applications.filter((app) => app.id !== applicationId))
      } catch (error) {
        console.error("Error withdrawing application:", error)
      }
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
            <p className="text-muted-foreground mb-4">Start applying for jobs to see your applications here</p>
            <Button asChild>
              <a href="/jobs">Browse Jobs</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Applications</h2>

      <div className="grid gap-4">
        {applications.map((application) => (
          <Card key={application.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{application.jobs.title}</CardTitle>
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
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                  {application.companies.company_name}
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  {application.jobs.location}
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  Applied {new Date(application.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" asChild>
                  <a href={`/jobs/${application.job_id}`}>View Job</a>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => withdrawApplication(application.id)}
                  disabled={application.status === "accepted"}
                >
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

