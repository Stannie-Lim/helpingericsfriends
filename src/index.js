import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import axios from "axios";

const App = () => {
  const [userURL, setUserURL] = useState("");
  const [isSafe, setIsSafe] = useState(null);

  const checkIfSafe = async () => {
    const { data } = await axios.post("/isThisSafe", { userURL });
    console.log(data);
  };

  return (
    <>
      <input
        value={userURL}
        onChange={({ target: { value } }) => setUserURL(value)}
      />
      <button onClick={checkIfSafe}>Is this safe?</button>
      {isSafe === true
        ? "Yes this is safe"
        : isSafe === false
        ? "No this is not safe"
        : "Type in a URL"}
    </>
  );
};

const root = createRoot(document.querySelector("#root"));

root.render(<App />);
