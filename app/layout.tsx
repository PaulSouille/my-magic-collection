/* eslint-disable @next/next/no-css-tags */
import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Inter } from "next/font/google";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My magic collection",
  description: "MTG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌹</text></svg>"
        />

        <link
          href="//cdn.jsdelivr.net/npm/keyrune@latest/css/keyrune.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className={inter.className}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <Header></Header>
            <main className="flex min-h-screen flex-col items-center pt-24">
              {children}
            </main>
            <Footer></Footer>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
