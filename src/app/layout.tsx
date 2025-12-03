import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PC GameFi | Next-Gen Web3 Launchpad",
  description: "Access high-quality IGOs through PC GameFi's quantum-tier allocation system. Fair, transparent, and built for the future of Web3 gaming.",
  keywords: ["GameFi", "IGO", "Launchpad", "Web3", "Crypto Gaming", "IDO", "Token Launch"],
  authors: [{ name: "PC GameFi Team" }],
  openGraph: {
    title: "PC GameFi | Next-Gen Web3 Launchpad",
    description: "Access high-quality IGOs through PC GameFi's quantum-tier allocation system.",
    siteName: "PC GameFi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PC GameFi | Next-Gen Web3 Launchpad",
    description: "Access high-quality IGOs through PC GameFi's quantum-tier allocation system.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rajdhani.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
