import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { JobCard } from "@/components/job-card"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCompanies } from "@/components/featured-companies"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="container py-12 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Jobs</h2>
            <p className="text-muted-foreground">Explore the latest opportunities from top companies</p>
          </div>
          <Link href="/jobs">
            <Button variant="outline">View All Jobs</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <JobCard
            title="Frontend Developer"
            company="TechCorp"
            location="Remote"
            salary="$80,000 - $100,000"
            type="Full-time"
            logo="/placeholder.svg?height=40&width=40"
            postedDate="2 days ago"
          />
          <JobCard
            title="UX Designer"
            company="DesignHub"
            location="New York, NY"
            salary="$90,000 - $110,000"
            type="Full-time"
            logo="/placeholder.svg?height=40&width=40"
            postedDate="1 week ago"
          />
          <JobCard
            title="Backend Engineer"
            company="DataSystems"
            location="San Francisco, CA"
            salary="$120,000 - $150,000"
            type="Full-time"
            logo="/placeholder.svg?height=40&width=40"
            postedDate="3 days ago"
          />
        </div>
      </section>

      <FeaturedCompanies />

      <section className="bg-muted py-12">
        <div className="container space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
              Our platform connects talented professionals with great companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>For Job Seekers</CardTitle>
                <CardDescription>Find your dream job</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      1
                    </span>
                    <span>Create your profile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      2
                    </span>
                    <span>Browse available jobs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      3
                    </span>
                    <span>Apply with one click</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/register?type=seeker" className="w-full">
                  <Button className="w-full">Sign Up as Job Seeker</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>For Companies</CardTitle>
                <CardDescription>Find the right talent</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      1
                    </span>
                    <span>Create company profile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      2
                    </span>
                    <span>Post job openings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      3
                    </span>
                    <span>Review applications</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/register?type=company" className="w-full">
                  <Button className="w-full">Sign Up as Company</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Stories</CardTitle>
                <CardDescription>Join thousands of happy users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm italic">"I found my dream job within 2 weeks of signing up!"</p>
                  <p className="text-sm font-medium">- Sarah T., Software Engineer</p>

                  <p className="text-sm italic">"We've hired 5 amazing team members through this platform."</p>
                  <p className="text-sm font-medium">- John D., HR Manager</p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/testimonials" className="w-full">
                  <Button variant="outline" className="w-full">
                    Read More Stories
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

