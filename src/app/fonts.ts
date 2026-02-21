import { Montserrat, Fustat } from "next/font/google";

// Montserrat variable font
export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

// Fustat variable font
export const fustat = Fustat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fustat",
});
