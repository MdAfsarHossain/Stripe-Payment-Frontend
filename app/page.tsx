import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-card-foreground">Stripe Payment Demo</CardTitle>
          <CardDescription>Experience our secure payment flow</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Click below to start the payment process</p>
            <Link href="/payment">
              <Button className="w-full" size="lg">
                Start Payment
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
