import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "fbase";

const NweetFactory = ({ userObj }) => {
  const [attachment, setAttachment] = useState("");
  const [nweet, setNweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    // try {
    //   await addDoc(collection(dbService, "nweets"), {
    //     text: nweet,
    //     createdAT: Date.now(),
    //     creatorId: userObj.uid,
    //   });
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
    // setNweet("");
    let attachmentUrl = "";
    if (attachment !== "") {
      const storage = getStorage();
      const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      await uploadString(attachmentRef, attachment, "data_url");
      // console.log(await ref(response, getDownloadURL()));
      attachmentUrl = await getDownloadURL(ref(storageService, attachmentRef));
      // console.log(await uploadString(attachmentRef, attachment, "data_url"));
      // console.log(attachmentUrl);
    }

    //트윗하기 누르면 nweetObj 형태로 새로운 document 생성하여 nweets 콜렉션에 넣기
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAT: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl: attachmentUrl,
    });

    //state 비워서 form 비우기
    setNweet("");

    //파일 미리보기 img src 비워주기
    setAttachment("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    // console.log(event.target.files);
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();

    if (theFile) {
      reader.onloadend = (finishedEvent) => {
        // console.log(finishedEvent);
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachment = () => setAttachment("");

  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind"
        maxLength={120}
      />
      <input type="file" accept="imgae/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
