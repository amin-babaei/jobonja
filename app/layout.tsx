import { ThemeProvider } from "@components/theme/ThemeProvider";
import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: 'جاب اونجا',
    template: '%s - جاب اونجا',
  },
};

const myFont = localFont({
  src: '../public/Tanha-WOL.woff2',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa-IR">
      <body className={myFont.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
