import "./globals.css";
import { AuthProvider } from "./AuthContext";

export const metadata = {
  title: "Babylon-Nextjs-assessment",
  description: "Login/Register with Firebase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
