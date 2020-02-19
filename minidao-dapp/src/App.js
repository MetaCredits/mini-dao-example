import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';

import './App.css';
import { Router } from "@reach/router"

import Home from "./pages/Home"
import MainDapp from "./pages/MainDapp"
import { MyWeb3Provider } from "./web3/EthersContext"
import Web3NotFound from './web3/web3NotFoundPage';

function App() {
  return (
    <>
      <div className="app-class">
        <MyWeb3Provider>
          <Header />
          <div className="page-div">
            <Router>
              <Home path="/" />
              <MainDapp path="/dapp" />
              <Web3NotFound path="/web3NotFound" />
            </Router>
          </div>
        </MyWeb3Provider>
        <Footer />
      </div>
    </>
  );
}

export default App;