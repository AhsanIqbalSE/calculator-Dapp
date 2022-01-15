import React, { Component }  from 'react';
import { useState,useEffect } from 'react';
import {Modal,Button} from 'react-bootstrap'
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
  const [activeBalance,setBalance] = useState(null);
  const [ID,setId] = useState(null);
  const [show, setShow] = useState(false);


   useEffect( async()=>{

    walletAlreadyConnect()
  },[])

  const walletAlreadyConnect = async ()=>{

    const provider = detectProvider();
    console.log(provider.isConnected());
    if(provider){
      const web3 =  new Web3(provider);
      let accounts = await web3.eth.getAccounts();
   
       if(accounts.length > 0){
        let id =await web3.eth.getChainId()
        const balance = await web3.eth.getBalance(accounts[0])
  
         console.log(provider.isConnected());
         console.log(id);
         console.log(accounts);
         console.log(balance);

        if(id != "1"){
           alert("please switch network to mainnet")
           setisConnected(false)
        }
        else {
          if(accounts[0] !== activeAccount){
            console.log("else");
            setActiveAccount(accounts[0])
            setBalance(balance)
            setId(id)
            setisConnected(true)
          }
        }
      }
      console.log(web3);
     }
  }

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
    }
    return provder;
  }

  const logingHandler = async ()=>{
    const provider = detectProvider();
    if(provider){
      if(provider !== window.ethereum)
      console.error("dont have window.ethereum provider")
    }
    // setisConnecting(true)

    const web3 = new Web3(provider);
    // const account = await web3.eth.getAccounts();
    // console.log(account);
    console.log(await web3.eth.getChainId());

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

  const onLoging = async(provider)=>{
    const web3 = new Web3(provider);
    // const accounts =  web3.eth.getAccounts();
    let id =await web3.eth.getChainId()
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0])
    console.log(accounts);
    console.log(accounts[0].length);
    if(accounts.length ===0){
      console.log("Please Connect metamask");
    }
    else if(accounts[0] !== activeAccount){
      setActiveAccount(accounts[0])
      setBalance(balance)
      setisConnected(true)
      setId(id)
    }
  }

  // const onLogout =()=>{

    // setisConnected(false)
  // }

  useEffect(()=>{
    if(ID){
      console.log("useEffect2");
      window.ethereum.on('networkChanged', function (ID) {
        // Time to reload your interface with accounts[0]!
        walletAlreadyConnect()
      });
    }
  },[])
  




 

  return (
    <div className="App">
      <div className='main'>
        {!isConnected && 
          <button className='btn btn-primary' onClick={() => setShow(true)}>
           Connect Wallet
          </button>
        }
        {isConnected && 
        <>
          <div>
              Successfully Connected
          </div>
          <div>{activeAccount}</div>
          <div>Account Balance: {activeBalance}</div>
        </>
        }
      </div>

   

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="d-flex" style={{justifyContent:"center"}}>

          <button className='btn btn-primary mr-3' style={{display:"inline-block"}} onClick={logingHandler}>
           Connect Metamask
          </button>
          <button className='btn btn-primary' onClick="">
           Connect Wallet
          </button>
          </div>
        </Modal.Body>
      </Modal>
     
    </div>
  );
}

export default App;
