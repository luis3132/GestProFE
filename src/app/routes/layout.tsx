import MainNavbar from "@/components/navbar/mainNavbar";


export default function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <MainNavbar />
            {children}
        </>
    )
  }