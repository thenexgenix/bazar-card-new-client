import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navabr";
import Footer from "@/components/common/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['600','700','800','900']
});

export const metadata = {
  title: "Bazar Card",
  description: "Find your needed Card for daily Shopping",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        <main className="flex-1">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
