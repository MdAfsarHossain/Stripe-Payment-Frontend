import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, Mail } from "lucide-react"

export default function PaymentSuccessPage() {
  // In a real app, you'd get this data from URL params or API
  const orderDetails = {
    orderId: "ORD-2024-001",
    amount: "99.99",
    email: "customer@example.com",
    date: new Date().toLocaleDateString(),
    paymentMethod: "**** **** **** 1234",
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-card-foreground">Payment Successful!</CardTitle>
          <CardDescription>Thank you for your purchase. Your payment has been processed successfully.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-card-foreground">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-mono">{orderDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-semibold">${orderDetails.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span>{orderDetails.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span>{orderDetails.date}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">What happens next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Confirmation Email</p>
                  <p className="text-xs text-muted-foreground">A receipt has been sent to {orderDetails.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Download className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Download Receipt</p>
                  <p className="text-xs text-muted-foreground">
                    You can download your receipt anytime from your account
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full" size="lg" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/payment">Make Another Payment</Link>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">Need help? Contact our support team at support@example.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
