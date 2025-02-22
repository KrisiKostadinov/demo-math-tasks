import { ToastContainer } from "react-toastify";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg">
      <body>
        {children}
        <ToastContainer position="top-center" />
      </body>
    </html>
  );
}
