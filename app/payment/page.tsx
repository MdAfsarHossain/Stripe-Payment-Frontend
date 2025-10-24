"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock } from "lucide-react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export default function PaymentPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    email: "",
    amount: "49",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cardNumber || formData.cardNumber.length < 16) {
      newErrors.cardNumber = "Please enter a valid card number";
    }
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Please enter expiry date (MM/YY)";
    }
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV";
    }
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = "Please enter cardholder name";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const stripe = await loadStripe(
  //     "pk_test_51S9OjCHC5EVDQ9mwxG1I2Z0NDWKgycCtgk9xpdsDakKzP1tdPYdWGxZKZxP4Dqpadjni14a6hwztW5JYMf39us2n003jEyRJEt"
  //   );

  //   setIsProcessing(true);

  //   try {
  //     const result = await axios.post(
  //       "http://localhost:5008/api/v1/payments/create-checkout-session",
  //       {
  //         successUrl: "http://localhost:3000/payment/success",
  //         cancelUrl: "http://localhost:3000/payment/error",
  //       }
  //     );

  //     if (result.data.data.url) {
  //       router.push(result.data.data.url);
  //     } else {
  //       router.push("/payment/error");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     router.push("/payment/error");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const stripe = await loadStripe(
      "pk_test_51S9OjCHC5EVDQ9mwxG1I2Z0NDWKgycCtgk9xpdsDakKzP1tdPYdWGxZKZxP4Dqpadjni14a6hwztW5JYMf39us2n003jEyRJEt"
    );

    setIsProcessing(true);

    try {
      const result = await axios.post(
        // "http://localhost:5007/api/v1/payments/create-checkout-session",
        // "https://38100f0bfe48.ngrok-free.app/api/v1/payments/create-checkout-session",
        "https://a633a90686af.ngrok-free.app/api/v1/payments/create-checkout-session",
        {
          successUrl: "http://localhost:3000/payment/success",
          cancelUrl: "http://localhost:3000/payment/error",
          couponCode: "WELCOME10", // 10% discount applied
          // ADD THESE REQUIRED FIELDS:
          items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Your Product Name",
                },
                unit_amount: 1000, // $10.00 in cents
              },
              quantity: 1,
            },
          ],
        }
      );

      console.log(result);
      

      if (result.data.data.session_id) {
        // Should return session ID, not URL
        const { error } = await stripe!.redirectToCheckout({
          sessionId: result.data.data.session_id,
        });

        if (error) {
          console.error("Stripe redirect error:", error);
          router.push("/payment/error");
        }
      } else {
        router.push("/payment/error");
      }
    } catch (err) {
      console.error(err);
      router.push("/payment/error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            <CreditCard className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-card-foreground">
            Secure Payment
          </CardTitle>
          <CardDescription>Enter your payment details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Display */}
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Amount to pay</p>
              <p className="text-2xl font-bold text-card-foreground">
                ${formData.amount}
              </p>
            </div>

            {/* Email */}
            {/* <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div> */}

            <Separator />

            {/* Card Details */}
            {/* <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Your payment information is secure and encrypted
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "cardNumber",
                      formatCardNumber(e.target.value)
                    )
                  }
                  maxLength={19}
                  className={errors.cardNumber ? "border-destructive" : ""}
                />
                {errors.cardNumber && (
                  <p className="text-sm text-destructive">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      handleInputChange(
                        "expiryDate",
                        formatExpiryDate(e.target.value)
                      )
                    }
                    maxLength={5}
                    className={errors.expiryDate ? "border-destructive" : ""}
                  />
                  {errors.expiryDate && (
                    <p className="text-sm text-destructive">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) =>
                      handleInputChange(
                        "cvv",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    maxLength={4}
                    className={errors.cvv ? "border-destructive" : ""}
                  />
                  {errors.cvv && (
                    <p className="text-sm text-destructive">{errors.cvv}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  placeholder="John Doe"
                  value={formData.cardholderName}
                  onChange={(e) =>
                    handleInputChange("cardholderName", e.target.value)
                  }
                  className={errors.cardholderName ? "border-destructive" : ""}
                />
                {errors.cardholderName && (
                  <p className="text-sm text-destructive">
                    {errors.cardholderName}
                  </p>
                )}
              </div>
            </div> */}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing
                ? "Processing Payment..."
                : `Pay $${formData.amount}`}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By clicking "Pay", you agree to our terms of service and privacy
              policy.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
