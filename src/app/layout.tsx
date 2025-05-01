import type { Metadata } from "next";
import { Geist, Geist_Mono, Open_Sans, Noto_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import { PromptContextProvider } from "./components/context/PromptContextProvider";
import { Toaster } from "react-hot-toast";
import { ConvexClientProvider } from "./components/context/ConvexClientProvider";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zeno",
  description: "A data discovery chatbot by Smart Ops",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PromptContextProvider>
        <body
          className={`${openSans.variable} ${notoSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          <div className="fixed top-0 left-0 right-0 h-100px bg-bgPrimary z-50">
            <Header />
          </div>

          <div className="flex ">
            {/* <div className="bg-surfaceCanvas text-primary max-w-[250px] h-screen overflow-y-auto md:min-w-[220px]">
            <Sidebar />
          </div> */}
            <div className="bg-bgPrimary pt-20 md:pt-0 flex-1 min-h-screen text-primary flex-col items-center justify-center">
              <ConvexClientProvider>{children}</ConvexClientProvider>
            </div>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </body>
      </PromptContextProvider>
    </html>
  );
}
