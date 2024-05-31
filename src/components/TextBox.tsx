import { useState } from "react";
import axios from "axios";
import LinkReady from "./LinkReady";
import InvalidURL from "./InvalidURL";

function TextBox() {
  const [link, setLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [badLink, setBadLink] = useState(0); // 0 = not bad, 1 = empty, 2 = non empty bad

  const handleClick = async () => {
    try {
      const id = await axios.post("http://localhost:4000/shorten", {
        link,
      });
      setShortLink(id.data);
      setBadLink(0);
    } catch (error) {
      if (link.length === 0) {
        setBadLink(1);
      } else {
        setBadLink(2);
      }
    }
  };

  return (
    <>
        <input
          type="url"
          className="form-control"
          aria-label="Enter Complete URL"
          placeholder="www.example.com"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button type="button" onClick={handleClick}>
          Submit
        </button>
        {shortLink !== "" && <LinkReady shortLink={shortLink} />}
        {badLink !== 0 && <InvalidURL empty={badLink} />}
    </>
  );
}

export default TextBox;
