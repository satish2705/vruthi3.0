"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@supabase/supabase-js"
import { SeekerApplications } from "@/components/seeker-applications"
import { SeekerProfile } from "@/components/seeker-profile"
import { SeekerSavedJobs } from "@/components/seeker-saved-jobs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Briefcase, Heart } from "lucide-react"

// Initialize Supabase client safely with fallbacks for SSR/build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "example-key"
const supabase = createClient(supabaseUrl, supabaseKey)

export default function SeekerDashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalApplications: 0,
    savedJobs: 0,
  })

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)

          // Fetch seeker profile
          const { data: profileData } = await supabase
            .from("job_seekers")
            .select("*")
            .eq("id", session.user.id)
            .single()

          if (profileData) {
            setProfile(profileData)

            // Fetch seeker stats
            const { data: applicationsData } = await supabase
              .from("applications")
              .select("id")
              .eq("seeker_id", session.user.id)

            const { data: savedJobsData } = await supabase
              .from("saved_jobs")
              .select("id")
              .eq("seeker_id", session.user.id)

            setStats({
              totalApplications: applicationsData?.length || 0,
              savedJobs: savedJobsData?.length || 0,
            })
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
          <div className="text-center">Loading...</div>
        </div>
      </DashboardShell>
    )
  }

  if (!user) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Not authenticated</CardTitle>
              <CardDescription>You need to be logged in to access this page</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/login">
                <Button className="w-full">Log In</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Job Seeker Dashboard" text={`Welcome back, ${profile?.full_name || "User"}`}>
        <Link href="/jobs">
          <Button>
            <Briefcase className="mr-2 h-4 w-4" />
            Browse Jobs
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">Jobs you've applied to</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.savedJobs}</div>
            <p className="text-xs text-muted-foreground">Jobs you've saved for later</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="applications" className="space-y-4">
          <SeekerApplications seekerId={user.id} />
        </TabsContent>
        <TabsContent value="saved" className="space-y-4">
          <SeekerSavedJobs seekerId={user.id} />
        </TabsContent>
        <TabsContent value="profile" className="space-y-4">
          <SeekerProfile profile={profile} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

