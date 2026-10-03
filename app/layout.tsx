import type { Metadata } from "next";
import { Lora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const cabinet = localFont({
  variable: "--font-cabinet",
  src: "../public/brand/fonts/cabinet-grotesk/Fonts/WEB/fonts/CabinetGrotesk-Variable.woff2",
  weight: "100 800",
});

export const metadata: Metadata = {
  title: "ClaudeTec",
  description: "Grupo estudiantil de IA del Tecnológico de Monterrey, campus Monterrey.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${lora.variable} ${cabinet.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
