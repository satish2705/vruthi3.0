import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturedCompanies() {
  const companies = [
    { id: 1, name: "TechCorp", logo: "/placeholder.svg?height=60&width=60", jobCount: 12 },
    { id: 2, name: "DesignHub", logo: "/placeholder.svg?height=60&width=60", jobCount: 8 },
    { id: 3, name: "DataSystems", logo: "/placeholder.svg?height=60&width=60", jobCount: 15 },
    { id: 4, name: "CloudNine", logo: "/placeholder.svg?height=60&width=60", jobCount: 6 },
  ]

  return (
    <section className="container py-12 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Companies</h2>
          <p className="text-muted-foreground">Top employers who trust our platform</p>
        </div>
        <Link href="/companies">
          <Button variant="outline">View All Companies</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {companies.map((company) => (
          <Link key={company.id} href={`/companies/${company.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <h3 className="font-semibold text-lg">{company.name}</h3>
                <p className="text-sm text-muted-foreground">{company.jobCount} open positions</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

