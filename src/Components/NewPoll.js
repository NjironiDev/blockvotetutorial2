import React, { useRef, useState } from "react";
import Glow from "../assets/Glow.png";
import eclipse from "../assets/eclipse.svg";
import toast, { Toaster } from "react-hot-toast";

const NewPoll = (props) => {
  const candidateName1 = useRef();
  const candidateName2 = useRef();

  const candidateName1URL = useRef();
  const candidateName2URL = useRef();

  const promptRef = useRef();

  const [disableButton, changeDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendToBlockChain = async () => {
    changeDisable(true);
    setIsLoading(true);

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
    toast.success("head back to home page");
    setIsLoading(false);
  };

  return (
    <div className="new-poll">
      <img src={Glow} alt="logo" className="bg" />
      <p className="poll-form-title">
        Create a <span className="poll-form-subtitle">New Poll</span>
      </p>
      <div className="poll-form">
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
          <div className="form-flex">
            <button
              onClick={sendToBlockChain}
              disabled={disableButton}
              class="form-button"
            >
              {isLoading ? (
                <img src={eclipse} alt="loading" className="loading" />
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default NewPoll;
