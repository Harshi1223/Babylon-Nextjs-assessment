"use client";

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Login App</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}