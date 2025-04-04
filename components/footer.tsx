import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">JobPortal</h3>
            <p className="text-sm text-muted-foreground">
              Connecting talented professionals with great companies since 2023.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="text-muted-foreground hover:text-foreground">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-muted-foreground hover:text-foreground">
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link href="/resources/resume-tips" className="text-muted-foreground hover:text-foreground">
                  Resume Tips
                </Link>
              </li>
              <li>
                <Link href="/resources/interview-prep" className="text-muted-foreground hover:text-foreground">
                  Interview Prep
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/post-job" className="text-muted-foreground hover:text-foreground">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/resources/hiring-guide" className="text-muted-foreground hover:text-foreground">
                  Hiring Guide
                </Link>
              </li>
              <li>
                <Link href="/contact-sales" className="text-muted-foreground hover:text-foreground">
                  Contact Sales
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold">Subscribe to our newsletter</h3>
            <p className="text-sm text-muted-foreground">Get the latest jobs and industry news</p>
            <div className="flex space-x-2">
              <Input placeholder="Email address" type="email" className="max-w-[220px]" />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2023 JobPortal. All rights reserved. Created by JohnSatish and Twinkle Roy</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/terms" className="text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

