import type { Metadata } from "next";

export const SITE_URL = "https://claudetec.com";

// Child pages that set their own openGraph replace the parent's whole object,
// so they spread this to keep the site name, locale and fallback image.
export const openGraph = {
  siteName: "ClaudeTec",
  locale: "es_MX",
  type: "website",
  images: [
    {
      url: "/images/foto-grupal-2400px.jpg",
      width: 2400,
      height: 1600,
      alt: "Integrantes de ClaudeTec en el Tec de Monterrey, campus Monterrey",
    },
  ],
} satisfies Metadata["openGraph"];
