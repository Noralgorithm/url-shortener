"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "URL shortener",
  description: "Noralgorithm's personal URL shortener project.",
};

export default function RootLayout({ children }) {
  useEffect(
    () =>
      (function () {
        window.__insp = window.__insp || [];
        __insp.push(["wid", 1648111492]);
        var ldinsp = function () {
          if (typeof window.__inspld != "undefined") return;
          window.__inspld = 1;
          var insp = document.createElement("script");
          insp.type = "text/javascript";
          insp.async = true;
          insp.id = "inspsync";
          insp.src =
            ("https:" == document.location.protocol ? "https" : "http") +
            "://cdn.inspectlet.com/inspectlet.js?wid=1648111492&r=" +
            Math.floor(new Date().getTime() / 3600000);
          var x = document.getElementsByTagName("script")[0];
          x.parentNode.insertBefore(insp, x);
        };
        setTimeout(ldinsp, 0);
      })(),
    []
  );
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
