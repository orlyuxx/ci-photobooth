import {
  Lilita_One,
  Poppins,
  Cedarville_Cursive,
  Fredoka,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const kingfink = localFont({
  src: "./fonts/Kingfink.otf",
  variable: "--font-kingfink",
  weight: "400",
  style: "normal",
});

const ciguatera = localFont({
  src: "./fonts/Ciguatera.otf",
  variable: "--font-ciguatera",
  weight: "400",
  style: "normal",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"], // Multiple weights available!
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
  title: "Croumatic",
  description: "Capture it, remember it",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/croumatic.ico" type="image/x-icon" />
        <link rel="icon" href="/images/croumatic.png" type="image/png" />
      </head>
      <body
        className={`${lilitaOne.variable} ${poppins.variable} ${cedarville.variable} ${kingfink.variable} ${fredoka.variable} ${ciguatera.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
