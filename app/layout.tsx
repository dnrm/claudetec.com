import type { Metadata } from "next";
import { Lora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { openGraph, SITE_URL } from "./seo";
import { Footer, Header } from "./site";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const cabinet = localFont({
  variable: "--font-cabinet",
  src: "../public/brand/fonts/cabinet-grotesk/Fonts/WEB/fonts/CabinetGrotesk-Variable.woff2",
  weight: "100 800",
});

const description =
  "ClaudeTec es un grupo estudiantil independiente del Tec de Monterrey, campus Monterrey, que explora y aprende inteligencia artificial con Claude. Eventos, talleres y el Hackathon Claude.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ClaudeTec · Grupo estudiantil de IA del Tec de Monterrey",
    template: "%s · ClaudeTec",
  },
  description,
  applicationName: "ClaudeTec",
  keywords: [
    "ClaudeTec",
    "Claude",
    "inteligencia artificial",
    "IA",
    "grupo estudiantil",
    "Tec de Monterrey",
    "Monterrey",
    "Hackathon Claude",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    ...openGraph,
    title: "ClaudeTec · Grupo estudiantil de IA del Tec de Monterrey",
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${lora.variable} ${cabinet.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
