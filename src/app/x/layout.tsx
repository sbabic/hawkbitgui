import Layout from "@/app/components/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Layout>
          {children}
      </Layout>
  );
}
