import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import React, { useRef, useState } from "react";
import tw from "tailwind-styled-components";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
const Input = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const filePickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };
  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      // id: session.user.uid,
      // username: session.user.name,
      // userImg: session.user.image,
      // tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  };

  return (
    <Wrapper className={`${loading && "opacity-60"}`}>
      <ProfileImg alt="profile photo" src="/download.jpg" />
      <TextField>
        <Text className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
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
          {!loading && (
            <AllIcons>
              <IconOne onClick={() => filePickerRef.current.click()}>
                <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                <File
                  type="file"
                  hidden
                  onChange={addImageToPost}
                  ref={filePickerRef}
                />
              </IconOne>

              <IconTwo>
                <ChartBarIcon className="text-[#1d9bf0] h-[22px] rotate-90" />
              </IconTwo>
              <IconThree onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
              </IconThree>
              <IconFour>
                <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
              </IconFour>

              {showEmojis ? (
                <Picker
                  onSelect={addEmoji}
                  style={{
                    position: "absolute",
                    marginTop: "465px",
                    marginLeft: -40,
                    maxWidth: "320px",
                    borderRadius: "20px",
                  }}
                  theme="dark"
                />
              ) : null}
            </AllIcons>
          )}
          <Tweet disabled={!input.trim() && !selectedFile} onClick={sendPost}>Tweet</Tweet>
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
    flex items-center pt-2.5 justify-between
`;
const AllIcons = tw.div`
    flex items-center
`;
const IconOne = tw.div`
    flex items-center icon
`;
const File = tw.input``;
const IconTwo = tw.div`
    icon
`;
const IconThree = tw.div`
    icon
`;
const IconFour = tw.div`
    icon
`;
const Tweet = tw.button`
    bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold
    shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 
    disabled:cursor-default 
`;
export default Input;
