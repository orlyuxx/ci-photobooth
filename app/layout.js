import { Lilita_One, Poppins } from "next/font/google";
import "./globals.css";

const lilitaOne = Lilita_One({
  variable: "--font-lilita-one",
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "CI's Photobooth",
  description: "Pose and capture your cute moments!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/images/photobooth-logo.ico"
          type="image/x-icon"
        />
        <link rel="icon" href="/images/photobooth-logo.png" type="image/png" />
      </head>
      <body className={`${lilitaOne.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
