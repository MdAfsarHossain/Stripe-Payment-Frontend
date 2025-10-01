import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, RefreshCw, Mail, ArrowLeft } from "lucide-react"

export default function PaymentErrorPage() {
  // In a real app, you'd get error details from URL params or state
  const errorDetails = {
    errorCode: "CARD_DECLINED",
    message: "Your card was declined. Please try a different payment method.",
    orderId: "ORD-2024-001",
    amount: "99.99",
  }

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "CARD_DECLINED":
        return "Your card was declined. Please check your card details or try a different payment method."
      case "INSUFFICIENT_FUNDS":
        return "Your card has insufficient funds. Please try a different payment method."
      case "EXPIRED_CARD":
        return "Your card has expired. Please use a different payment method."
      case "NETWORK_ERROR":
        return "There was a network error. Please check your connection and try again."
      default:
        return "An unexpected error occurred during payment processing. Please try again."
    }
  }

  const getTroubleshootingSteps = (errorCode: string) => {
    switch (errorCode) {
      case "CARD_DECLINED":
        return [
          "Check that your card details are correct",
          "Ensure your card has sufficient funds",
          "Contact your bank to verify the transaction",
          "Try using a different payment method",
        ]
      case "NETWORK_ERROR":
        return [
          "Check your internet connection",
          "Refresh the page and try again",
          "Try using a different browser",
          "Contact support if the issue persists",
        ]
      default:
        return [
          "Double-check your payment information",
          "Try refreshing the page",
          "Use a different payment method",
          "Contact our support team for assistance",
        ]
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-destructive">Payment Failed</CardTitle>
          <CardDescription>{getErrorMessage(errorDetails.errorCode)}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Details */}
          <div className="bg-destructive/5 border border-destructive/20 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-destructive">Error Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Error Code:</span>
                <span className="font-mono text-destructive">{errorDetails.errorCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-mono">{errorDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-semibold">${errorDetails.amount}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Troubleshooting Steps */}
          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">What you can do:</h3>
            <ul className="space-y-2">
              {getTroubleshootingSteps(errorDetails.errorCode).map((step, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full" size="lg" asChild>
              <Link href="/payment">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Link>
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="mailto:support@example.com">
                  <Mail className="h-4 w-4 mr-2" />
                  Get Help
                </Link>
              </Button>
            </div>
          </div>

          {/* Support Information */}
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium text-card-foreground mb-2">Need immediate assistance?</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Email: support@example.com</p>
              <p>Phone: 1-800-123-4567</p>
              <p>Live Chat: Available 24/7</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Reference ID: {errorDetails.orderId} • Include this when contacting support
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
