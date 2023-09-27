import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full  flex-col items-center">
      <div className="flex w-full flex-1 justify-center dark:bg-neutral-950">
        <div className="max-w-[920px] mx-auto flex-1   flex flex-col px-4 py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
