import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Club Cocobongo - Diani's Premier Nightlife Destination",
  description: "Experience the ultimate nightlife at Club Cocobongo in Diani. Live DJs, premium drinks, exceptional cuisine. Open 7 days a week. Powered by StdioX Labs - https://soldoutafrica.com/",
  keywords: "club cocobongo, diani nightlife, diani club, kenya nightlife, diani beach club, live djs diani, soldoutafrica, stdiox labs",
  authors: [{ name: "StdioX Labs", url: "https://soldoutafrica.com/" }],
  creator: "StdioX Labs",
  publisher: "StdioX Labs",
  openGraph: {
    title: "Club Cocobongo - Diani's Premier Nightlife Destination",
    description: "Experience the ultimate nightlife at Club Cocobongo in Diani. Live DJs, premium drinks, exceptional cuisine.",
    url: "https://clubcocobongo.com",
    siteName: "Club Cocobongo",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "developer": "StdioX Labs - https://soldoutafrica.com/",
    "company": "StdioX Labs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="developer" content="StdioX Labs - https://soldoutafrica.com/" />
        <meta name="company" content="StdioX Labs" />
        <link rel="author" href="https://soldoutafrica.com/" />
        <meta name="theme-color" content="#f59e0b" />
      </head>
      <body
        className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
