"use client"

import React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          JobPortal
        </Link>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/jobs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Find Jobs</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/companies" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Companies</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/resources/resume-tips" title="Resume Tips">
                      Create a standout resume that gets noticed
                    </ListItem>
                    <ListItem href="/resources/interview-prep" title="Interview Prep">
                      Ace your next interview with our guides
                    </ListItem>
                    <ListItem href="/resources/career-advice" title="Career Advice">
                      Expert advice to advance your career
                    </ListItem>
                    <ListItem href="/resources/salary-guide" title="Salary Guide">
                      Know your worth with our salary insights
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
            <nav className="container py-8 space-y-6">
              <div className="space-y-3">
                <Link href="/jobs" className="block px-2 py-1 text-lg" onClick={() => setIsMenuOpen(false)}>
                  Find Jobs
                </Link>
                <Link href="/companies" className="block px-2 py-1 text-lg" onClick={() => setIsMenuOpen(false)}>
                  Companies
                </Link>
                <div className="pt-2 pb-4">
                  <p className="px-2 text-sm font-medium text-muted-foreground mb-2">Resources</p>
                  <Link href="/resources/resume-tips" className="block px-4 py-1" onClick={() => setIsMenuOpen(false)}>
                    Resume Tips
                  </Link>
                  <Link
                    href="/resources/interview-prep"
                    className="block px-4 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Interview Prep
                  </Link>
                  <Link
                    href="/resources/career-advice"
                    className="block px-4 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Career Advice
                  </Link>
                  <Link href="/resources/salary-guide" className="block px-4 py-1" onClick={() => setIsMenuOpen(false)}>
                    Salary Guide
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { title: string }>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

