import React, { Component }  from 'react';
import { useState,useEffect } from 'react';
// import {BrowserRouter, Routes,Route} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Web3 from "web3";

// import { Page1 } from './components/page1';
// import { Home } from './components/home';

function App() {
  const [isConnected,setisConnected] = useState(false);
  const [isConnecting,setisConnecting] = useState(false);
  const [activeAccount,setActiveAccount] = useState(null);

  //  useEffect( async()=>{

  //    if(window.ethereum){
       
  //     const web3 =  new Web3(window.ethereum);
  //     let id =await web3.eth.getChainId()
  //      console.log(window.ethereum.isConnected());
  //      if(window.ethereum.isConnected()){
  //       id != "1" && alert("please switch network to mainnet");window.ethereum.enable()
        
  //      //   // let asd = web3.eth.getAccounts()
  //      //   // if(web3.version.network){
  //          console.log(web3)
  //      //     console.log(web3.eth)
  //        } 

  //    }
  // },[])
  const detectProvider =()=>{
    let provder;
    if(window.ethereum){
      provder=window.ethereum;
      console.log("ethereum");
    }else if(window.web3){
      provder= window.web3.currentProvider;
      console.log("web3");
    }else{
      window.alert("no ethereum browser detected")
      console.log(provder);
    }
    return provder;
  }

  const logingHandler = async ()=>{
    const provider = detectProvider();
    if(provider){
      if(provider !== window.ethereum)
      console.error("dont have window.ethereum provider")
    
    // setisConnecting(true)

    const web3 = new Web3(provider);
    // const account = await web3.eth.getAccounts();
    // console.log(account);
    console.log(web3);
    // console.log(await web3.eth.getChainId());

    if(await web3.eth.getChainId() == "1"){
      await provider.request({
        method:"eth_requestAccounts"
      });
      onLoging(provider)
    }else{
      alert("You can only connect Ethereum Mainnet")
    }
    // setisConnecting(false)
  }
}

  const onLoging = async(provider)=>{
    const web3 = new Web3(provider);
    // const accounts =  web3.eth.getAccounts();
    let accounts = await web3.eth.getAccounts();
    console.log(web3);
    console.log(accounts[0].length);
    if(accounts.length ===0){
      console.log("Please Connect metamask");
    }
    else if(accounts[0] !== activeAccount){
      setActiveAccount(accounts[0])
      setisConnected(true)
    }
  }

  const onLogout =()=>{
    setisConnected(false)
  }
 

  return (
    <div className="App">
      <div className='main'>
        {!isConnected && 
          <button className='btn btn-primary' onClick={logingHandler}>
           Connect Wallet
          </button>
        }
        {isConnected && 
        <>
          <div>
              Successfully Connected
          </div>
          <div>{activeAccount}</div>
        </>
        }
      </div>
     
    </div>
  );
}

export default App;
