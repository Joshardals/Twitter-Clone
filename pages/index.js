import Head from "next/head";
import tw from "tailwind-styled-components";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <Wrapper>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Sidebar />
      </Content>
    </Wrapper>
  );
}

const Wrapper = tw.div`
`;
const Content = tw.div`
  bg-black min-h-screen max-w-[1500px] mx-auto
`;
