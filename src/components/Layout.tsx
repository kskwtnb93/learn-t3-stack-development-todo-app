import React from "react";
import Head from "next/head";

type Props = {
  title: string;
  children: ReactNode;
};

export const Layout: FC<Props> = ({ title = "T3 Stack", children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Gentrated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        {children}
      </main>
    </>
  );
};
