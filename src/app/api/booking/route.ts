import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      country,
      date,
      participants,
      specialRequests,
      packageSlug,
      packageName,
      totalPrice,
    } = body

    // Validate required fields
    if (!name || !email || !phone || !country || !date || !packageSlug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // In production, create booking in Supabase
    // const { data, error } = await supabase.from('bookings').insert({
    //   package_slug: packageSlug,
    //   name,
    //   email,
    //   phone,
    //   country,
    //   date,
    //   participants: parseInt(participants),
    //   special_requests: specialRequests,
    //   status: 'pending',
    //   total_price: totalPrice,
    // })

    // In production, create Stripe checkout session
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [{
    //     price_data: {
    //       currency: 'eur',
    //       product_data: { name: packageName },
    //       unit_amount: totalPrice * 100,
    //     },
    //     quantity: 1,
    //   }],
    //   mode: 'payment',
    //   success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/${packageSlug}`,
    //   customer_email: email,
    //   metadata: { bookingId: data.id },
    // })

    // Demo response
    return NextResponse.json({
      success: true,
      bookingId: `BK-${Date.now()}`,
      message: "Booking request received. Confirmation email will be sent shortly.",
      // checkoutUrl: session.url, // Uncomment in production
    })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
