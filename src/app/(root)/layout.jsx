import Navbar from "@/components/Navbar/Navbar";

export default async function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      {/* Main content Area */}
      <main className="container mx-auto p-4 md:p-0">{children}</main>
    </>
  );
}
