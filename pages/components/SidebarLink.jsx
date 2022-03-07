import React from "react";
import tw from "tailwind-styled-components";

const SidebarLink = ({ text, Icon, active }) => {
  return (
    <Wrapper>
      <Icon className="h-7" />
      <Text className={active ? "font-bold" : null}>{text}</Text>
    </Wrapper>
  );
};

const Wrapper = tw.div`
    text-white flex items-center justify-center
    xl:justify-start text-xl xl:ml-24 space-x-3 hoverAnimation
`;
const Text = tw.span`
    hidden xl:inline
`;
export default SidebarLink;
