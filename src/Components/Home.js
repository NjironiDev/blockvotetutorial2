import React, { useEffect, useState } from "react";

const Home = (props) => {
  const [promptList, changePromptList] = useState([]);

  useEffect(() => {
    const getPrompts = async () => {
      changePromptList(await window.contract.getAllPrompts());
      console.log(await window.contract.getAllPrompts());
    };
    getPrompts();
  }, []);

  return (
    <div className="home">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>List of Polls</th>
            <th>Go to Poll</th>
          </tr>
        </thead>
        <tbody>
          {promptList.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el}</td>
                <td>
                  {" "}
                  <button
                    className="poll-button"
                    onClick={() => props.changeCandidates(el)}
                  >
                    Go to Poll
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
