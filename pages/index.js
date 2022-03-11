import Head from "next/head";
import tw from "tailwind-styled-components";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";

export default function Home() {
  return (
    <Wrapper>
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Sidebar />
        <Feed />
      </Content>
    </Wrapper>
  );
}

const Wrapper = tw.div`
`;
const Content = tw.div`
  bg-black min-h-screen max-w-[1500px] mx-auto flex
`;
