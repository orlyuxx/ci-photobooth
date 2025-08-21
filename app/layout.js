import { Lilita_One, Poppins, Cedarville_Cursive } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const kingfink = localFont({
  src: "./fonts/Kingfink.otf",
  variable: "--font-kingfink",
  weight: "400",
  style: "normal",
});

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

const cedarville = Cedarville_Cursive({
  variable: "--font-cedarville",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Snappy",
  description: "Pose and capture your cute moments!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/images/favicon.png" type="image/png" />
      </head>
      <body
        className={`${lilitaOne.variable} ${poppins.variable} ${cedarville.variable} ${kingfink.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
