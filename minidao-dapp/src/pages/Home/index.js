import React, { Component } from "react";
import "./index.css"
class Home extends Component {
  render() {
    return (
        <div className="home-page-div">
          <h2>Welcome to the MiniDAO DAPP</h2>
          <p>
            This site is part of the demo for Rapid Team's Eth Denver Hackathon Submission.
          </p>

          <h2>Where can I learn more?</h2>
          <ul>
            <li>Smart Contract Github: <a href="https://github.com/rapid-eth/ethdenver-metacred-minidao-example">https://github.com/rapid-eth/ethdenver-metacred-minidao-example</a></li>
            <li>Dapp Github: <a href="https://github.com/rapid-eth/ethdenver-minidao-dapp">https://github.com/rapid-eth/ethdenver-minidao-dapp</a></li>
          </ul>
        </div>

    );
  }
}

export default Home;