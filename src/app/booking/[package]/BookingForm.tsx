"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Loader2, CheckCircle2 } from "lucide-react"

const countries = [
  "United Kingdom",
  "Germany",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Netherlands",
  "France",
  "Spain",
  "Italy",
  "United States",
  "Canada",
  "Australia",
  "Other",
]

// Generate next 90 days for availability
function getAvailableDates(): string[] {
  const dates: string[] = []
  const today = new Date()
  for (let i = 3; i < 93; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    // Skip Mondays (polo clubs typically closed)
    if (date.getDay() !== 1) {
      dates.push(date.toISOString().split("T")[0])
    }
  }
  return dates
}

interface BookingFormProps {
  packageSlug: string
  packageName: string
  packagePrice: number
}

export function BookingForm({ packageSlug, packageName, packagePrice }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    date: "",
    participants: "1",
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const availableDates = getAvailableDates()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.country) newErrors.country = "Please select a country"
    if (!formData.date) newErrors.date = "Please select a date"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          packageSlug,
          packageName,
          totalPrice:
            packagePrice * parseInt(formData.participants),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // In production, redirect to Stripe checkout
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl
        } else {
          setIsSuccess(true)
        }
      } else {
        setErrors({ form: "Something went wrong. Please try again." })
      }
    } catch {
      // Demo mode: show success
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
          <h2 className="mt-4 font-serif text-2xl font-bold text-foreground">
            Booking Request Received!
          </h2>
          <p className="mt-2 text-muted-foreground">
            Thank you, {formData.name}! We&apos;ve received your booking request
            for the {packageName} on{" "}
            {new Date(formData.date).toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            .
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            You&apos;ll receive a confirmation email at {formData.email} within
            the next few minutes. If you have any questions, contact us at
            info@sotograndepolo.com.
          </p>
          <div className="mt-6 rounded-lg bg-accent p-4">
            <p className="text-sm font-medium text-foreground">
              Booking Summary
            </p>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <p>Package: {packageName}</p>
              <p>Participants: {formData.participants}</p>
              <p>
                Total: &euro;
                {packagePrice * parseInt(formData.participants)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-8">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Book Your Experience
        </h2>
        <p className="mt-2 text-muted-foreground">
          Fill in your details below and we&apos;ll confirm your booking
          within 24 hours.
        </p>

        {errors.form && (
          <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Name & Email */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Smith"
                className="mt-1"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
                className="mt-1"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone & Country */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+44 7700 900000"
                className="mt-1"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
              )}
            </div>
            <div>
              <Label htmlFor="country">Country *</Label>
              <Select
                value={formData.country}
                onValueChange={(value) =>
                  setFormData({ ...formData, country: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.country}
                </p>
              )}
            </div>
          </div>

          {/* Date & Participants */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="date">Preferred Date *</Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select
                  id="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-border bg-background py-2 pl-10 pr-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select a date</option>
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString("en-GB", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </option>
                  ))}
                </select>
              </div>
              {errors.date && (
                <p className="mt-1 text-xs text-destructive">{errors.date}</p>
              )}
            </div>
            <div>
              <Label htmlFor="participants">Number of Participants</Label>
              <Select
                value={formData.participants}
                onValueChange={(value) =>
                  setFormData({ ...formData, participants: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n} {n === 1 ? "person" : "people"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <Label htmlFor="specialRequests">
              Special Requests (Optional)
            </Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) =>
                setFormData({ ...formData, specialRequests: e.target.value })
              }
              placeholder="Any dietary requirements, experience level, or special occasions..."
              className="mt-1"
              rows={3}
            />
          </div>

          {/* Price Summary */}
          <div className="rounded-lg bg-accent p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {packageName} x {formData.participants}{" "}
                {parseInt(formData.participants) === 1 ? "person" : "people"}
              </span>
              <span className="font-serif text-lg font-bold text-primary">
                &euro;{packagePrice * parseInt(formData.participants)}
              </span>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="gold"
            size="xl"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              `Book Now — €${packagePrice * parseInt(formData.participants)}`
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Secure payment processed by Stripe. Full refund available for
            cancellations made 48+ hours in advance.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
