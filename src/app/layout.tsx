import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { rajdhani, nunito, jetbrainsMono } from "@/lib/fonts";
import { Shell } from "@/components/shell/Shell";

export const metadata: Metadata = {
  title: "GINIS | AIEI Africa",
  description: "Geographic, Electoral, Institutions, Economic and Fusion Intelligence for Ghana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rajdhani.variable} ${nunito.variable} ${jetbrainsMono.variable} font-body bg-bg text-ivory antialiased`}>
        <AuthProvider>
          <Shell>{children}</Shell>
        </AuthProvider>
      </body>
    </html>
  );
}
