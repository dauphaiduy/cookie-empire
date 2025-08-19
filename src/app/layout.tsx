import '@ant-design/v5-patch-for-react-19';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConfigProvider } from 'antd';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cookie Clicker Idle Game",
  description: "A fun idle clicking game built with Next.js, Tailwind CSS, and Ant Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1677ff',
              borderRadius: 8,
            },
          }}
        >
          <Navbar />
          <main className="flex-1 bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
          <Footer />
        </ConfigProvider>
      </body>
    </html>
  );
}
