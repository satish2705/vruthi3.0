"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@supabase/supabase-js"
import { Building, MapPin, Clock, Heart } from "lucide-react"

// Initialize Supabase client safely with fallbacks for SSR/build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "example-key"
const supabase = createClient(supabaseUrl, supabaseKey)

interface SeekerSavedJobsProps {
  seekerId: string
}

export function SeekerSavedJobs({ seekerId }: SeekerSavedJobsProps) {
  const [savedJobs, setSavedJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const { data, error } = await supabase
          .from("saved_jobs")
          .select(`
            id,
            job_id,
            created_at,
            jobs:job_id (
              id,
              title,
              location,
              job_type,
              company_id,
              created_at
            ),
            companies:jobs(company_id).companies (
              company_name
            )
          `)
          .eq("seeker_id", seekerId)
          .order("created_at", { ascending: false })

        if (error) throw error
        setSavedJobs(data || [])
      } catch (error) {
        console.error("Error fetching saved jobs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSavedJobs()
  }, [seekerId])

  const removeSavedJob = async (savedJobId: string) => {
    try {
      const { error } = await supabase.from("saved_jobs").delete().eq("id", savedJobId)

      if (error) throw error

      // Update the saved jobs list
      setSavedJobs(savedJobs.filter((job) => job.id !== savedJobId))
    } catch (error) {
      console.error("Error removing saved job:", error)
    }
  }

  if (loading) {
    return <div>Loading saved jobs...</div>
  }

  if (savedJobs.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-6">
            <h3 className="text-lg font-medium mb-2">No saved jobs</h3>
            <p className="text-muted-foreground mb-4">Save jobs you're interested in to apply later</p>
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
      <h2 className="text-xl font-semibold">Saved Jobs</h2>

      <div className="grid gap-4">
        {savedJobs.map((savedJob) => (
          <Card key={savedJob.id}>
            <CardHeader className="pb-2">
              <CardTitle>{savedJob.jobs.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                  {savedJob.companies[0].company_name}
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  {savedJob.jobs.location}
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  Posted {new Date(savedJob.jobs.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm">
                  <Heart className="mr-2 h-4 w-4 text-muted-foreground" />
                  Saved {new Date(savedJob.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" asChild>
                  <a href={`/jobs/${savedJob.job_id}`}>View Job</a>
                </Button>

                <Button variant="ghost" size="sm" onClick={() => removeSavedJob(savedJob.id)}>
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

