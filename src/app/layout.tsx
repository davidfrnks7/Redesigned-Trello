"use client";
import React, { ReactNode } from "react";
import { Providers } from "./providers";
import Header from "./ui/layout/Header";
// import Footer from "./ui/layout/Footer";
import { inter } from "@/app/ui/fonts";

interface LayoutProps {
  children: ReactNode;
}

// ! TODO: Make an about page for details about the app. Add link to a floating footer with a copyright for the app.

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Header />
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
