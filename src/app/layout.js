import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Scale Masters",
  description: "Plataforma líder en enseñanza digital",
};

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // podés ajustar los pesos que necesites
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} antialiased`}>{children}</body>
    </html>
  );
}
