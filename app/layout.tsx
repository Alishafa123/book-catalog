import "./globals.css";
import Header from "./components/Header";
import type { Metadata } from "next";


export const metadata: Metadata = {
title: "Book Catalog",
description: "Simple catalog with custom auth",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="min-h-screen bg-white text-gray-900">
<Header />
<main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
</body>
</html>
);
}