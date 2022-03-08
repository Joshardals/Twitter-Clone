import { PhotographIcon, XIcon } from "@heroicons/react/outline";
import React, { useRef, useState } from "react";
import tw from "tailwind-styled-components";

const Input = () => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const filePickerRef = useRef(null);

  const addImageToPost = () => {};

  return (
    <Wrapper>
      <ProfileImg src="/download.jpg" />
      <TextField>
        <Text>
          <TextArea
            rows="2"
            value={input}
            placeholder="What's happening?"
            onChange={(e) => setInput(e.target.value)}
          />
          {selectedFile ? (
            <FileField>
              <Content onClick={() => setSelectedFile(null)}>
                <XIcon className="text-white h-5" />
              </Content>
              <SelectedImage src={selectedFile} alt="selected file" />
            </FileField>
          ) : null}
        </Text>

        <IconsTweet>
          <Icons onClick={() => filePickerRef.current.click()}>
            <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
            <File
              type="file"
              hidden
              onChange={addImageToPost}
              ref={filePickerRef}
            />
          </Icons>
        </IconsTweet>
      </TextField>
    </Wrapper>
  );
};
const Wrapper = tw.div`
    border-b border-gray-700 p-3 flex space-x-3
`;
const ProfileImg = tw.img`
    h-11 w-11 rounded-full cursor-pointer 
`;
const TextField = tw.div`
    w-full divide-y divide-gray-700
`;
const Text = tw.div`
`;
const TextArea = tw.textarea`
    outline-none bg-transparent text-[#d9d9d9] 
    text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px] 
`;
const FileField = tw.div`
    relative
`;
const Content = tw.div`
    absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 
    rounded-full flex items-center justify-center top-1 left-1 cursor-pointer
`;
const SelectedImage = tw.img`
    rounded-2xl max-h-80 object-contain
`;
const IconsTweet = tw.div`
    flex items-center justify-between pt-2.5
`;
const Icons = tw.div`
    flex items-center
`;
const File = tw.input``;
export default Input;
