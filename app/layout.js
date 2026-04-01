import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-950">
                <Navbar />
                {children}
            </body>
        </html>
    )
}