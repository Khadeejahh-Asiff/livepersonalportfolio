import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import ClientLayout from "@/components/client-layout";

// Font setup
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Khadeeja Asif | Front-end Developer Portfolio",
  description:
    "Khadeeja Asif is a front-end developer specializing in React.js, Next.js, Tailwind CSS, and modern UI libraries. With hands-on experience building responsive, high-performance web applications, she crafts sleek, scalable user experiences.",
  keywords: [
    "frontend developer",
    "react developer",
    "next.js",
    "tailwind css",
    "mui",
    "shadcn",
    "portfolio",
    "web developer",
    "UI developer",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-white dark:bg-[#18181B] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
          <ClientLayout>{children}</ClientLayout>
        </div>
      </body>
    </html>
  );
}
