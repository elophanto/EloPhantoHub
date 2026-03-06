import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { packageName, totalPrice, email, bookingId } = body

    // In production, create Stripe payment intent
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: totalPrice * 100,
    //   currency: 'eur',
    //   metadata: { bookingId, packageName },
    //   receipt_email: email,
    // })

    return NextResponse.json({
      success: true,
      // clientSecret: paymentIntent.client_secret,
      message: "Payment intent created (demo mode)",
    })
  } catch (error) {
    console.error("Stripe error:", error)
    return NextResponse.json(
      { error: "Payment processing error" },
      { status: 500 }
    )
  }
}
