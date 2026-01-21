import "./globals.css";

export const metadata = {
  title: "Task Management System",
  description: "Full Stack Task App"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
