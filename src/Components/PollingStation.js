import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LoadingCircles from "../assets/loadingcircles.svg";
import Glow from "../assets/Glow.png";

const PollingStation = (props) => {
  const [candidate1URL, changeCandidate1Url] = useState(LoadingCircles);
  const [candidate2URL, changeCandidate2Url] = useState(LoadingCircles);
  const [showresults, changeResultsDisplay] = useState(false);
  const [buttonStatus, changeButtonStatus] = useState(false);
  const [candidate1Votes, changeVote1] = useState("--");
  const [candidate2Votes, changeVote2] = useState("--");
  const [prompt, changePrompt] = useState("--");

  useEffect(() => {
    const getInfo = async () => {
      // vote count stuff
      let voteCount = await window.contract.getVotes({
        prompt: localStorage.getItem("prompt"),
      });
      changeVote1(voteCount[0]);
      changeVote2(voteCount[1]);

      // image stuff

      changeCandidate1Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate1"),
        })
      );
      changeCandidate2Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate2"),
        })
      );

      changePrompt(localStorage.getItem("prompt"));

      // vote checking stuff

      let didUserVote = await window.contract.didParticipate({
        prompt: localStorage.getItem("prompt"),
        user: window.accountId,
      });

      changeResultsDisplay(didUserVote);
      changeButtonStatus(didUserVote);
    };

    getInfo();
  }, []);

  const addVote = async (index) => {
    changeButtonStatus(true);
    await window.contract.addVote({
      prompt: localStorage.getItem("prompt"),
      index: index,
    });

    await window.contract.recordUser({
      prompt: localStorage.getItem("prompt"),
      user: window.accountId,
    });

    let voteCount = await window.contract.getVotes({
      prompt: localStorage.getItem("prompt"),
    });
    changeVote1(voteCount[0]);
    changeVote2(voteCount[1]);
    changeResultsDisplay(true);
  };

  return (
    <div className="polling-station">
      <div className="polling-station-container">
        <div className="candidate">
          <div>
            <img className="poll-img" src={candidate1URL} />
          </div>
          {showresults ? (
            <div>
              <div className="vote-count">{candidate1Votes}</div>
            </div>
          ) : null}
          <div>
            <button
              className="vote-button"
              disabled={buttonStatus}
              onClick={() => addVote(0)}
            >
              Vote
            </button>
          </div>
        </div>
        <div>
          <div className="prompt">{prompt}</div>
        </div>
        <div>
          <div className="candidate">
            <div>
              <img className="poll-img" src={candidate2URL} />
            </div>
            {showresults ? (
              <div>
                <div className="vote-count">{candidate2Votes}</div>
              </div>
            ) : null}
            <div>
              <button
                className="vote-button"
                disabled={buttonStatus}
                onClick={() => addVote(1)}
              >
                Vote
              </button>
            </div>
          </div>
        </div>
        <img src={Glow} alt="logo" className="bg1" />
      </div>
    </div>
  );
};

export default PollingStation;
