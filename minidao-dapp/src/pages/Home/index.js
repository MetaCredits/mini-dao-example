import React, { Component } from "react";
import "./index.css"
class Home extends Component {
  render() {
    return (
        <div className="home-page-div">
          <h2>Welcome to the MetaCredits MiniDAO Dapp</h2>
          <p>
            This site is part of the demo for Rapid Team's Eth Denver Hackathon Submission. MetaCredits is a product designed to allow developers and end users with a 0 balance of any crypto currency to participate in the ethereum ecosystem. We do this by allowing etherless accounts to sign metatransactions which can take advantage of a funded smart contract to reimburse a gas relayer. For a more detailed explaination see <a href="https://github.com/MetaCredits/docs/blob/master/posts/hello.md">this post</a>.
          </p>
          <h2>What is this?</h2>
          <p>
            This is an example Dapp with very minimal functionality but is demonstrating the value of MetaCredits contract funded metatransaction design. The Dapp is wired up to the rinkeby blockchain, you can join the miniDAO and submit "proposals" to it. If you have an ether balance, the transaction created will be a normal transaction, but if you have 0 ether, you will sign a metatransaction message which will be forwarded on to an approver service and then a relayer before it makes it to the blockchain. <a href="/dapp">Try it out!</a>
          </p>

          <h2>What this is NOT</h2>
          <p>
            This example Dapp is not a product. It was not designed to be "useful" in itself, just as a demonstration tool to show the potential power and ease of user onboarding for a dapp with MetaCredits.
          </p>

          <h2>Where can I learn more?</h2>
          <ul>
            <li>MetaCredits Docs: <a href="https://github.com/MetaCredits/docs">https://github.com/MetaCredits/docs</a></li>
          </ul>
        </div>

    );
  }
}

export default Home;