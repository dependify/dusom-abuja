// SEO Utility Functions and Types for DUSOM Website

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article" | "organization" | "educational";
  canonicalUrl?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

// Base URL for the website
export const BASE_URL = "https://dusomabuja.org";

// Default SEO configuration
export const defaultSEO: SEOProps = {
  title: "DUSOM Abuja | Dunamis School of Ministry - Bible School & Ministry Training",
  description: "Join DUSOM Abuja - Dunamis School of Ministry. Train to ignite the world with the Gospel of Jesus Christ. 10,000+ graduates from 50+ countries. Apply for 2026 session.",
  keywords: [
    "DUSOM",
    "Dunamis School of Ministry",
    "Bible School Abuja",
    "Ministry Training Nigeria",
    "Dunamis International Gospel Centre",
    "Christian Education",
    "Theological School",
    "Pastoral Training",
    "Dr Paul Enenche",
    "Bible School Africa"
  ],
  ogType: "website",
  ogImage: "/og-image.jpg"
};

// Page-specific SEO configurations
export const pageSEO: Record<string, SEOProps> = {
  home: {
    title: "DUSOM Abuja | Dunamis School of Ministry - Bible School & Ministry Training",
    description: "Join DUSOM Abuja - Dunamis School of Ministry. Train to ignite the world with the Gospel of Jesus Christ. 10,000+ graduates from 50+ countries. Established 2000 by Dr. Paul Enenche.",
    keywords: [
      "DUSOM Abuja",
      "Dunamis School of Ministry",
      "Bible School Abuja",
      "Ministry Training Nigeria",
      "Dr Paul Enenche",
      "Dunamis Church",
      "Theological Education",
      "Christian Leadership Training"
    ],
    ogType: "website"
  },
  about: {
    title: "About DUSOM | History, Vision & Mission - Dunamis School of Ministry",
    description: "Learn about DUSOM Abuja - Established in 2000 by Dr. Paul Enenche. Our vision: Training firebrands to saturate the world with Gospel fire. 26+ years of excellence in ministry education.",
    keywords: [
      "About DUSOM",
      "DUSOM History",
      "DUSOM Vision Mission",
      "Dr Paul Enenche Ministry",
      "Dunamis School History",
      "Ministry Training Vision"
    ],
    ogType: "organization"
  },
  courses: {
    title: "DUSOM Courses | 22-Week Ministry Training Curriculum - Abuja",
    description: "Explore DUSOM's comprehensive 22-course curriculum. First semester: Foundation & Spiritual Growth. Second semester: Advanced Ministry & Specialization. Spiritual impartation included.",
    keywords: [
      "DUSOM Courses",
      "Bible School Curriculum",
      "Ministry Training Courses",
      "Christian Education Programs",
      "Theological Courses Nigeria",
      "Pastoral Training Curriculum"
    ],
    ogType: "educational"
  },
  admissions: {
    title: "Admissions | Apply to DUSOM Abuja - 2026 Application Open",
    description: "Apply to DUSOM Abuja 2026 session. Full-time & part-time options available. Two sessions: January-June & July-December. Requirements: Born again, able to read/write, recommendation letter.",
    keywords: [
      "DUSOM Admissions",
      "Apply DUSOM",
      "Bible School Application",
      "Ministry School Admission",
      "DUSOM Requirements",
      "Dunamis School Application 2026"
    ],
    ogType: "website"
  },
  studentLife: {
    title: "Student Life at DUSOM | Campus Experience & Facilities",
    description: "Experience life at DUSOM Abuja. Modern library, Media/IT facilities, spiritual impartation from Dr. Paul & Dr. Becky Enenche. Join students from 50+ countries.",
    keywords: [
      "DUSOM Student Life",
      "Campus Life Abuja",
      "Bible School Facilities",
      "Student Experience DUSOM",
      "Ministry School Community"
    ],
    ogType: "website"
  },
  studentAffairs: {
    title: "Student Affairs | Code of Conduct & Policies - DUSOM Abuja",
    description: "DUSOM Student Affairs: Code of conduct, financial policies, DUSOM anthem, weekly evaluation requirements, and student executive positions. Guidelines for all students.",
    keywords: [
      "DUSOM Student Affairs",
      "Code of Conduct",
      "Student Policies",
      "DUSOM Anthem",
      "Weekly Evaluation",
      "Student Guidelines"
    ],
    ogType: "website"
  },
  alumni: {
    title: "DUSOM Alumni Network | 10,000+ Graduates Worldwide",
    description: "Join the DUSOM Alumni Network. 10,000+ graduates across 50+ countries. Access to D-ARC refresher conferences, legacy projects, and global ministry connections.",
    keywords: [
      "DUSOM Alumni",
      "Dunamis School Graduates",
      "Alumni Network Nigeria",
      "Ministry Alumni",
      "D-ARC Conference"
    ],
    ogType: "organization"
  },
  blog: {
    title: "DUSOM Blog | Teaching Articles & Ministry Insights",
    description: "Read teachings from Dunamis School of Ministry. Articles on divine encounters, royal destiny, blood sacrifice, and spiritual growth from Dr. Paul Enenche and faculty.",
    keywords: [
      "DUSOM Blog",
      "Christian Teaching",
      "Ministry Articles",
      "Dr Paul Enenche Messages",
      "Spiritual Growth",
      "Bible Teaching"
    ],
    ogType: "website"
  },
  contact: {
    title: "Contact DUSOM Abuja | Get in Touch With Us",
    description: "Contact DUSOM Abuja. Location: Area 1, Behind Old Federal Secretariat. Phone: +234 808 327 5342. Email: dusomabuja@gmail.com. Office hours: Mon-Fri 9AM-5PM WAT.",
    keywords: [
      "Contact DUSOM",
      "DUSOM Address",
      "DUSOM Phone",
      "Dunamis School Contact",
      "Abuja Bible School Location"
    ],
    ogType: "website"
  },
  apply: {
    title: "Apply Now | Online Application - DUSOM Abuja 2026",
    description: "Complete your online application for DUSOM Abuja 2026 session. 7-step application form with document upload. Full-time & part-time tracks available.",
    keywords: [
      "DUSOM Application",
      "Apply Online",
      "Bible School Application Form",
      "Ministry School Registration",
      "DUSOM 2026 Intake"
    ],
    ogType: "website"
  }
};

// Schema.org structured data generators
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${BASE_URL}/#organization`,
  name: "Dunamis School of Ministry (DUSOM)",
  alternateName: "DUSOM Abuja",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/favicon.png`,
    width: 512,
    height: 512
  },
  image: `${BASE_URL}/og-image.jpg`,
  description: "Dunamis School of Ministry (DUSOM) trains firebrand believers to saturate the world with the Gospel of Jesus Christ. Established in 2000 by Dr. Paul Enenche.",
  foundingDate: "2000",
  founder: {
    "@type": "Person",
    name: "Dr. Paul Enenche"
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Area 1, Behind Old Federal Secretariat",
    addressLocality: "Abuja",
    addressRegion: "FCT",
    postalCode: "900001",
    addressCountry: "NG"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "9.0765",
    longitude: "7.3986"
  },
  telephone: "+234-808-327-5342",
  email: "dusomabuja@gmail.com",
  sameAs: [
    "https://facebook.com/DUNAMIS SCHOOL OF MINISTRY HQ, ABUJA",
    "https://instagram.com/@DusomAbuja",
    "https://twitter.com/@DusomAbuja",
    "https://youtube.com/@DusomAbuja"
  ],
  areaServed: {
    "@type": "Place",
    name: "Global"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Ministry Training Programs",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Full-Time Ministry Training",
          description: "6-month intensive program (Monday-Friday, 8AM-4PM)"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Part-Time Ministry Training",
          description: "6-month program (Thu-Fri 4-8PM, Sat 8AM-4PM)"
        }
      }
    ]
  }
});

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${BASE_URL}/#localbusiness`,
  name: "Dunamis School of Ministry Abuja",
  image: `${BASE_URL}/og-image.jpg`,
  url: BASE_URL,
  telephone: "+234-808-327-5342",
  email: "dusomabuja@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Area 1, Behind Old Federal Secretariat",
    addressLocality: "Abuja",
    addressRegion: "FCT",
    postalCode: "900001",
    addressCountry: "NG"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 9.0765,
    longitude: 7.3986
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00"
    }
  ],
  priceRange: "$$"
});

export const generateCourseSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Course",
        name: "DUSOM Full-Time Program",
        description: "6-month intensive ministry training (Monday-Friday, 8AM-4PM)",
        provider: {
          "@type": "EducationalOrganization",
          name: "Dunamis School of Ministry",
          sameAs: BASE_URL
        },
        timeRequired: "P6M",
        courseMode: ["onsite"],
        educationalLevel: "Ministry Training",
        teaches: [
          "Understanding the Bible",
          "Faith Principles",
          "Leadership and People's Management",
          "Evangelism & Discipleship",
          "Holy Ghost & The End-Time Move of God"
        ]
      }
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Course",
        name: "DUSOM Part-Time Program",
        description: "6-month ministry training for working professionals (Thu-Fri 4-8PM, Sat 8AM-4PM)",
        provider: {
          "@type": "EducationalOrganization",
          name: "Dunamis School of Ministry",
          sameAs: BASE_URL
        },
        timeRequired: "P6M",
        courseMode: ["onsite"],
        educationalLevel: "Ministry Training"
      }
    }
  ]
});

export const generateFAQSchema = (faqs: Array<{question: string; answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
});

export const generateBreadcrumbSchema = (items: Array<{name: string; url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`
  }))
});

export const generateArticleSchema = (article: {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  tags?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: article.title,
  description: article.description,
  image: article.image,
  url: article.url,
  datePublished: article.publishedTime,
  dateModified: article.modifiedTime || article.publishedTime,
  author: {
    "@type": "Person",
    name: article.author
  },
  publisher: {
    "@type": "EducationalOrganization",
    name: "Dunamis School of Ministry",
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/favicon.png`
    }
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": article.url
  },
  keywords: article.tags?.join(", ") || ""
});

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Dunamis School of Ministry (DUSOM)",
  description: "Train to ignite the world with the Gospel of Jesus Christ. Join thousands of firebrands at DUSOM Abuja.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/blog?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});

// Helper function to generate meta tags
export const generateMetaTags = (seo: SEOProps) => {
  const fullTitle = seo.title.includes("DUSOM") ? seo.title : `${seo.title} | DUSOM Abuja`;
  
  return {
    title: fullTitle,
    description: seo.description,
    keywords: seo.keywords?.join(", ") || defaultSEO.keywords?.join(", "),
    ogTitle: fullTitle,
    ogDescription: seo.description,
    ogType: seo.ogType || "website",
    ogImage: seo.ogImage || defaultSEO.ogImage,
    twitterCard: "summary_large_image",
    twitterTitle: fullTitle,
    twitterDescription: seo.description,
    twitterImage: seo.ogImage || defaultSEO.ogImage,
    canonicalUrl: seo.canonicalUrl || BASE_URL,
    robots: `${seo.noindex ? "noindex" : "index"},${seo.nofollow ? "nofollow" : "follow"}`
  };
};
