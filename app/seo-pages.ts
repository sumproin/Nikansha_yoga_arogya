import { brandName, siteUrl, studioAddress, studioName, yogaServices } from "./seo";

export type SeoPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  audience: string;
  benefits: string[];
  sections: {
    title: string;
    text: string;
  }[];
};

const localArea = `${studioAddress.addressLocality}, ${studioAddress.addressRegion}`;

export const servicePages: SeoPage[] = yogaServices.map((service) => ({
  slug: service.slug,
  title: `${service.name} Classes | ${brandName}`,
  h1: `${service.name} Classes at ${brandName}`,
  description: `${service.description} Join ${brandName} for ${service.name.toLowerCase()} in ${localArea} and online through the official Yogaarogya website.`,
  keywords: [
    `${service.name} classes`,
    `${service.name} classes Ghaziabad`,
    `${service.name} classes Indirapuram`,
    `${service.name} online`,
    `${brandName} ${service.name}`,
    `${studioName} ${service.name}`,
  ],
  audience:
    "Students who want personal guidance, steady practice, and a class format that respects their current fitness, lifestyle, and wellness goals.",
  benefits: [
    "Clear instruction with attention to breath, posture, and comfort.",
    "Practice options for beginners and returning yoga students.",
    "Available for students in Ghaziabad, Indirapuram, Delhi NCR, and online.",
  ],
  sections: [
    {
      title: `Why Choose ${service.name}`,
      text: `${service.name} at ${brandName} is planned as a mindful, practical class rather than a rushed routine. The practice supports body awareness, better breathing, consistency, and sustainable wellness.`,
    },
    {
      title: "Studio and Online Support",
      text: `Nikansha Yogaarogya Studio & Wellness supports local learners in ${localArea} and online students who want authentic yoga guidance from home.`,
    },
  ],
}));

export const landingPages: SeoPage[] = [
  {
    slug: "yoga-classes-ghaziabad",
    title: `Yoga Classes in Ghaziabad | ${brandName}`,
    h1: "Yoga Classes in Ghaziabad",
    description:
      "Find yoga classes in Ghaziabad at Nikansha Yoga Arogya for Hatha Yoga, Vinyasa, meditation, pranayama, prenatal yoga, face yoga, and therapeutic wellness.",
    keywords: [
      "yoga classes in Ghaziabad",
      "best yoga classes in Ghaziabad",
      "yoga studio Ghaziabad",
      "yoga center Indirapuram",
      "Nikansha Yoga Ghaziabad",
    ],
    audience:
      "People in Ghaziabad and Indirapuram looking for a dependable yoga studio with beginner-friendly, wellness-focused classes.",
    benefits: [
      "Local yoga studio presence in Indirapuram, Ghaziabad.",
      "Multiple class options for strength, flexibility, calm, and recovery.",
      "Supportive practice for beginners, families, mothers, and wellness seekers.",
    ],
    sections: [
      {
        title: "Local Yoga Studio",
        text: `${brandName} is located in Indirapuram, Ghaziabad and serves students across Ghaziabad, Noida, Delhi NCR, and nearby areas.`,
      },
      {
        title: "Classes for Every Stage",
        text: "Students can explore Hatha Yoga, Vinyasa Flow, meditation, pranayama, prenatal yoga, postnatal yoga, face yoga, and therapeutic yoga.",
      },
    ],
  },
  {
    slug: "online-yoga-classes",
    title: `Online Yoga Classes | ${brandName}`,
    h1: "Online Yoga Classes",
    description:
      "Join online yoga classes with Nikansha Yoga Arogya for beginners, stress relief, flexibility, breathwork, meditation, prenatal care, and therapeutic wellness.",
    keywords: [
      "online yoga classes",
      "online yoga classes India",
      "online yoga classes Ghaziabad",
      "Nikansha Yoga online classes",
      "Yogaarogya online yoga",
    ],
    audience:
      "Students who prefer guided yoga from home while staying connected with a real studio and experienced teachers.",
    benefits: [
      "Practice from home with structured guidance.",
      "Class options for beginners, flexibility, stress relief, and breathwork.",
      "Good fit for busy schedules, families, and outstation students.",
    ],
    sections: [
      {
        title: "Practice From Home",
        text: "Online classes make it easier to stay consistent without travel, while still receiving calm guidance from Nikansha Yogaarogya Studio & Wellness.",
      },
      {
        title: "Wellness-Focused Sessions",
        text: "Sessions can support flexibility, strength, breathing, meditation, stress relief, and gentle therapeutic practice depending on student needs.",
      },
    ],
  },
  {
    slug: "meditation-classes-ghaziabad",
    title: `Meditation Classes in Ghaziabad | ${brandName}`,
    h1: "Meditation Classes in Ghaziabad",
    description:
      "Nikansha Yoga Arogya offers meditation and pranayama classes in Ghaziabad and online for stress relief, anxiety support, focus, and calm breathing.",
    keywords: [
      "meditation classes in Ghaziabad",
      "pranayama classes in Ghaziabad",
      "breathwork classes Ghaziabad",
      "stress relief yoga Ghaziabad",
      "Nikansha Yoga meditation",
    ],
    audience:
      "Students seeking calmer breathing, mental clarity, stress relief, and a sustainable meditation habit.",
    benefits: [
      "Simple meditation practices that can fit daily life.",
      "Pranayama guidance for steadier breath and better focus.",
      "Support for stress relief, anxiety management, and inner calm.",
    ],
    sections: [
      {
        title: "Meditation and Breathwork",
        text: "The classes combine meditation, pranayama, and mindful awareness so students can build calm gradually and safely.",
      },
      {
        title: "Beginner Friendly",
        text: "Students do not need prior meditation experience. The focus is consistency, comfort, and learning how to return attention to the breath.",
      },
    ],
  },
  {
    slug: "prenatal-yoga-ghaziabad",
    title: `Prenatal Yoga in Ghaziabad | ${brandName}`,
    h1: "Prenatal Yoga and Garbh Sanskar in Ghaziabad",
    description:
      "Explore prenatal yoga and Garbh Sanskar classes at Nikansha Yoga Arogya for breath awareness, gentle movement, mother wellness, and conscious bonding.",
    keywords: [
      "prenatal yoga Ghaziabad",
      "pregnancy yoga classes Ghaziabad",
      "Garbh Sanskar classes online",
      "prenatal yoga Indirapuram",
      "Nikansha Yoga prenatal",
    ],
    audience:
      "Expecting mothers looking for gentle, supportive yoga and breath practices during pregnancy after medical clearance.",
    benefits: [
      "Gentle movement and breathing awareness for pregnancy wellness.",
      "Garbh Sanskar guidance for conscious bonding and calm routines.",
      "Studio and online options for expecting mothers.",
    ],
    sections: [
      {
        title: "Supportive Pregnancy Practice",
        text: "Prenatal yoga at Nikansha Yogaarogya focuses on comfort, breath, gentle mobility, and steady emotional support during pregnancy.",
      },
      {
        title: "Garbh Sanskar Classes",
        text: "Garbh Sanskar sessions include mindful routines that support mother wellness, calm attention, and positive bonding.",
      },
    ],
  },
  {
    slug: "therapeutic-yoga-ghaziabad",
    title: `Therapeutic Yoga in Ghaziabad | ${brandName}`,
    h1: "Therapeutic Yoga in Ghaziabad",
    description:
      "Therapeutic yoga at Nikansha Yoga Arogya supports back pain, mobility, stress relief, posture awareness, and long-term wellness in Ghaziabad and online.",
    keywords: [
      "therapeutic yoga Ghaziabad",
      "yoga therapy Ghaziabad",
      "yoga for back pain Ghaziabad",
      "yoga for stress relief Ghaziabad",
      "Nikansha Yoga therapy",
    ],
    audience:
      "Students who want gentler yoga support for posture, mobility, back discomfort, stress, or lifestyle imbalance.",
    benefits: [
      "Gentle movement with attention to comfort and alignment.",
      "Helpful for back pain support, mobility, and posture awareness.",
      "Designed for steady, long-term wellness rather than quick fixes.",
    ],
    sections: [
      {
        title: "Gentle Yoga Therapy Support",
        text: "Therapeutic yoga sessions are built around mindful movement, breath awareness, and practical body care for everyday wellness.",
      },
      {
        title: "Back Pain and Mobility",
        text: "Students can use therapeutic practice to support better posture, mobility, relaxation, and body awareness alongside appropriate medical advice.",
      },
    ],
  },
];

export const allSeoPages = [...landingPages, ...servicePages];

export function getSeoPage(slug: string) {
  return allSeoPages.find((page) => page.slug === slug);
}

export function pageUrl(slug: string) {
  const isService = servicePages.some((page) => page.slug === slug);
  return `${siteUrl}${isService ? "/classes" : ""}/${slug}`;
}
