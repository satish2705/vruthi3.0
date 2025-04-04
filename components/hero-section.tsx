import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-muted/50 to-muted py-20">
      <div className="container flex flex-col items-center text-center space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl">
          Find Your Dream Job or Perfect Candidate
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Connect with thousands of companies and job seekers on our comprehensive job portal platform
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/register?type=seeker">
            <Button size="lg">Find Jobs</Button>
          </Link>
          <Link href="/register?type=company">
            <Button size="lg" variant="outline">
              Post a Job
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

