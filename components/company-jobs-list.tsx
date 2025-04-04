"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@supabase/supabase-js"
import { Edit, Trash, Eye, Clock } from "lucide-react"

// Initialize Supabase client safely with fallbacks for SSR/build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "example-key"
const supabase = createClient(supabaseUrl, supabaseKey)

interface CompanyJobsListProps {
  companyId: string
}

export function CompanyJobsList({ companyId }: CompanyJobsListProps) {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("company_id", companyId)
          .order("created_at", { ascending: false })

        if (error) throw error
        setJobs(data || [])
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [companyId])

  const deleteJob = async (jobId: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        const { error } = await supabase.from("jobs").delete().eq("id", jobId)

        if (error) throw error

        // Update the jobs list after deletion
        setJobs(jobs.filter((job) => job.id !== jobId))
      } catch (error) {
        console.error("Error deleting job:", error)
      }
    }
  }

  if (loading) {
    return <div>Loading jobs...</div>
  }

  if (jobs.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-6">
            <h3 className="text-lg font-medium mb-2">No jobs posted yet</h3>
            <p className="text-muted-foreground mb-4">Start attracting candidates by posting your first job</p>
            <Link href="/dashboard/company/post-job">
              <Button>Post a Job</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Job Listings</h2>
        <Link href="/dashboard/company/post-job">
          <Button>Post a New Job</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{job.title}</CardTitle>
                <Badge variant={job.status === "active" ? "default" : "secondary"}>
                  {job.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline">{job.location}</Badge>
                <Badge variant="outline">{job.job_type}</Badge>
                {job.salary_min && job.salary_max && (
                  <Badge variant="outline">
                    ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                Posted {new Date(job.created_at).toLocaleDateString()}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Link href={`/dashboard/company/jobs/${job.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => deleteJob(job.id)}>
                  <Trash className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </div>
              <Link href={`/dashboard/company/jobs/${job.id}`}>
                <Button variant="secondary" size="sm">
                  <Eye className="mr-1 h-4 w-4" />
                  View Applications
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

