import { useState } from "react";
import axios from "axios";
import LinkReady from "./LinkReady";

function TextBox() {
  const [link, setLink] = useState("");
  const [shortLink, setShortLink] = useState("");

  const handleClick = async () => {
    console.log("?")
    try {
      const test = await axios.post("http://localhost:4000/shorten", {
        link,
      });
      setShortLink(test.data);
      console.log(shortLink)
    } catch (error) {
      console.error("Erm what the flip", error);
    }
  };

  return (
    <>
      <div>
        <input
          type="url"
          className="form-control"
          aria-label="Enter Complete URL"
          placeholder="www.example.com"
          onChange={(e) => setLink(e.target.value)}
        />
        <div>
          <button
            type="button"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
      </div>
      {shortLink !== "" && <LinkReady shortLink={shortLink}/>}
    </>

  );
}

export default TextBox;
