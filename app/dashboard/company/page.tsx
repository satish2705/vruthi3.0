"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@supabase/supabase-js"
import { CompanyJobsList } from "@/components/company-jobs-list"
import { CompanyApplications } from "@/components/company-applications"
import { CompanyProfile } from "@/components/company-profile"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PlusCircle, Briefcase, FileText } from "lucide-react"

// Initialize Supabase client safely with fallbacks for SSR/build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "example-key"
const supabase = createClient(supabaseUrl, supabaseKey)

export default function CompanyDashboard() {
  const [user, setUser] = useState<any>(null)
  const [company, setCompany] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    newApplications: 0,
  })

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)

          // Fetch company profile
          const { data: companyData } = await supabase.from("companies").select("*").eq("id", session.user.id).single()

          if (companyData) {
            setCompany(companyData)

            // Fetch company stats
            const { data: jobsData } = await supabase
              .from("jobs")
              .select("id, status")
              .eq("company_id", session.user.id)

            const { data: applicationsData } = await supabase
              .from("applications")
              .select("id, status, created_at")
              .eq("company_id", session.user.id)

            // Calculate stats
            const totalJobs = jobsData?.length || 0
            const activeJobs = jobsData?.filter((job) => job.status === "active").length || 0
            const totalApplications = applicationsData?.length || 0

            // Applications from the last 7 days
            const oneWeekAgo = new Date()
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
            const newApplications = applicationsData?.filter((app) => new Date(app.created_at) > oneWeekAgo).length || 0

            setStats({
              totalJobs,
              activeJobs,
              totalApplications,
              newApplications,
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
      <DashboardHeader heading="Company Dashboard" text={`Welcome back, ${company?.company_name || "Company"}`}>
        <Link href="/dashboard/company/post-job">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Post a Job
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
            <p className="text-xs text-muted-foreground">{stats.activeJobs} currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">{stats.newApplications} new this week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="profile">Company Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4">
          <CompanyJobsList companyId={user.id} />
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          <CompanyApplications companyId={user.id} />
        </TabsContent>
        <TabsContent value="profile" className="space-y-4">
          <CompanyProfile company={company} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

