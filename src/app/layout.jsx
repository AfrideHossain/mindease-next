import { Quicksand } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "@/components/providers/Providers";
const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "MindEase | Private Digital Journal and Mood Tracker",
  description:
    "MindEase - a private digital journal and mood tracker. MindEase helps users log daily thoughts, track moods and visualize their emotional patterns - encouraging mindfulness and mental wellbeing.",
};

export default async function GlobalLayout({ children }) {
  // const session = await auth();
  // console.log("-- [app/layout.jsx] SESSION LOG --", session);
  return (
    <html lang="en" className="h-full w-full" suppressHydrationWarning>
      <body className={`${quicksand.className} antialiased h-full w-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {/* Navbar */}
            {/* <Navbar /> */}
            {/* Main content Area */}
            {children}

            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
