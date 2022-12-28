import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { dbService } from "fbase";
import Nweet from "components/Nweet";

import NweetFactory from "./NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  //   const getNweets = async () => {
  //     const dbNweets = await getDocs(collection(dbService, "nweets"));
  //     // console.log(dbNweet);
  //     dbNweets.forEach((document) => {
  //       const nweetObject = { ...document.data(), id: document.id };
  //       setNweets((prev) => [nweetObject, ...prev]);
  //     });
  //   };

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAT", "desc")
    );
    // query(orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);
  //   console.log(nweets);

  return (
    <>
      {/* <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form> */}
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweet) => (
          //   <div key={nweet.id}>
          //     <h4>{nweet.text}</h4>
          //   </div>
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};
export default Home;
