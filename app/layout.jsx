import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// ❌ REMOVE: import { Outfit } from "next/font/google";
// ❌ REMOVE: const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "VoltCart. - Shop smarter",
    description: "VoltCart. - Shop smarter",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                {/* ✅ FIX: Use inline style to apply the font directly from the CSS import */}
                <body style={{ fontFamily: "'Outfit', sans-serif" }} className="antialiased">
                    <StoreProvider>
                        <Toaster />
                        {children}
                    </StoreProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}