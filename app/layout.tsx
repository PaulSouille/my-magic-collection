import type { Metadata } from "next";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
