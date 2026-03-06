export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Sotogrande Polo Tourism",
    description: "Premium polo experiences and holidays in Sotogrande, Andalusia, Spain. Beginner-friendly polo lessons, weekend packages, and corporate events.",
    url: "https://sotograndepolo.com",
    telephone: "+34690036016",
    email: "info@sotograndepolo.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sotogrande",
      addressRegion: "Andalusia",
      postalCode: "11310",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.2882,
      longitude: -5.2746,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "19:00",
    },
    sport: "Polo",
    offers: [
      {
        "@type": "Offer",
        name: "Polo Discovery Experience",
        price: "199.00",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        description: "2-hour polo introduction including riding basics, stickwork, and first chukker",
      },
      {
        "@type": "Offer",
        name: "Polo Weekend Package",
        price: "599.00",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        description: "2-day polo experience with 3 lessons, meals, and photo package",
      },
      {
        "@type": "Offer",
        name: "Polo Week Immersion",
        price: "1499.00",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        description: "5-day polo holiday with accommodation, daily lessons, and tournament",
      },
      {
        "@type": "Offer",
        name: "Corporate Team Building",
        price: "2500.00",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        description: "Half-day corporate polo event for 6-12 people with catering",
      },
      {
        "@type": "Offer",
        name: "Private Polo Lessons",
        price: "150.00",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        description: "1-hour private polo instruction with personal coach",
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function BlogPostJsonLd({
  title,
  description,
  date,
  slug,
  image,
}: {
  title: string
  description: string
  date: string
  slug: string
  image: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Organization",
      name: "Sotogrande Polo Tourism",
    },
    publisher: {
      "@type": "Organization",
      name: "Sotogrande Polo Tourism",
      url: "https://sotograndepolo.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sotograndepolo.com/blog/${slug}`,
    },
    image,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
