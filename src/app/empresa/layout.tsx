
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full flex">
        <div className="w-full bg-purple-100 h-dvh p-8 overflow-y-scroll custom-scrollbar">
          {children}
        </div>
      </div>
    </>
  )
}