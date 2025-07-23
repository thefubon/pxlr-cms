import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { getGeneralSettings } from "@/lib/settings";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "@/components/ui/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Динамические метаданные из настроек
export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getGeneralSettings();
    return {
      title: settings.siteTitle,
      description: settings.siteDescription,
    };
  } catch (error) {
    console.warn('Failed to load settings for metadata:', error);
    // Возвращаем дефолтные значения
    return {
      title: "PXLR CMS - Современная система управления контентом",
      description: "Современная CMS с Fastify backend, React админ-панелью и Next.js фронтендом",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
