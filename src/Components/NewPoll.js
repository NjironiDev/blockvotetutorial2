import React, { useRef, useState } from "react";
import Glow from "../assets/Glow.png";

const NewPoll = (props) => {
  const candidateName1 = useRef();
  const candidateName2 = useRef();

  const candidateName1URL = useRef();
  const candidateName2URL = useRef();

  const promptRef = useRef();

  const [disableButton, changeDisable] = useState(false);

  const sendToBlockChain = async () => {
    changeDisable(true);
    await window.contract.addUrl({
      name: candidateName1.current.value,
      url: candidateName1URL.current.value,
    });

    await window.contract.addUrl({
      name: candidateName2.current.value,
      url: candidateName2URL.current.value,
    });

    await window.contract.addCandidatePair({
      prompt: promptRef.current.value,
      name1: candidateName1.current.value,
      name2: candidateName2.current.value,
    });

    await window.contract.addToPromptArray({ prompt: promptRef.current.value });

    alert("head back to home page");
  };

  return (
    <div className="new-poll">
      <img src={Glow} alt="logo" className="bg" />
      <div className="poll-form">
        <h1 className="poll-form-title">Create a New Poll</h1>
        <form>
          <div className="form-flex">
            <label htmlFor="Candidate 1 Name">Candidate 1 Name</label>
            <input
              type="text"
              id="Candidate 1 Name"
              ref={candidateName1}
              required
            />
          </div>
          <div className="form-flex">
            <label htmlFor="Candidate 1 URL">Candidate 1 URL</label>
            <input
              type="text"
              id="Candidate 1 URL"
              ref={candidateName1URL}
              required
            />
          </div>
          <div className="form-flex">
            <label htmlFor="Candidate 2 Name">Candidate 2 Name</label>
            <input
              type="text"
              id="Candidate 2 Name"
              ref={candidateName2}
              required
            />
          </div>

          <div className="form-flex">
            <label htmlFor="Candidate 2 URL">Candidate 2 URL</label>
            <input
              type="text"
              id="Candidate 2 URL"
              ref={candidateName2URL}
              required
            />
          </div>
          <div className="form-flex">
            <label htmlFor="Prompt">Prompt</label>
            <input type="text" id="Prompt" ref={promptRef} required />
          </div>
          <div className="form-flex button-grid">
            <div class="buttons-grid-item">
              <button class="gradient-button gradient-button-6">Button</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPoll;
