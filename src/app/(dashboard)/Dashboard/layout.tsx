"use client"
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";


export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar/>
      <main className="min-h-dvh">{children}</main>
 
    </div>
  );
}