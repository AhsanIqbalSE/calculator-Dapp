import React, { Component }  from 'react';
import { useState,useEffect } from 'react';
import {Modal,Button} from 'react-bootstrap'
// import {BrowserRouter, Routes,Route} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Web3 from "web3";
import loaderImg from './images/loader.gif'

// import { Page1 } from './components/page1';
// import { Home } from './components/home';

function App() {
  const [isConnected,setisConnected] = useState(false);
  const [isConnecting,setisConnecting] = useState(false);
  const [activeAccount,setActiveAccount] = useState(null);
  const [activeBalance,setBalance] = useState(null);
  const [ID,setId] = useState(null);
  const [show, setShow] = useState(false);
  const [contract, setContract] = useState(false);
  const [pendingTx, setPendingTx] = useState(false);

  const [contractBalance, setContractBalance] = useState(0);
  // const [contract, setContract] = useState(false);
  const [data,setData]=useState({
    add:0,
    sub:0,
    mul:0,
    divide:0,
})
  var abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "int256",
          "name": "num1",
          "type": "int256"
        }
      ],
      "name": "Add",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "int256",
          "name": "num1",
          "type": "int256"
        }
      ],
      "name": "Divide",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "int256",
          "name": "num1",
          "type": "int256"
        }
      ],
      "name": "Multiply",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "int256",
          "name": "num1",
          "type": "int256"
        }
      ],
      "name": "Subtract",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "storedData",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]


   useEffect(()=>{
    walletAlreadyConnect()
  },[])

  const getContract = async(web3)=>{
    var contract1 = new web3.eth.Contract(abi, "0x9240eF4BfE1ff4C13Ee25eCdE11d9F6C9D809d89");
    setContract(contract1)
    console.log(abi);
    console.log(contract1);
    var bal=await contract1.methods.getBalance().call()
    setContractBalance(bal)
  }

  const walletAlreadyConnect = async ()=>{
    const provider = detectProvider();
    // console.log(provider.isConnected());
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

        if(id == "1" || id == "3"){
          if(accounts[0] !== activeAccount){
            getContract(web3)
            
            console.log("else");
            setActiveAccount(accounts[0])
            setBalance(balance)
            setId(id)
            setisConnected(true)
          }
        }
        else {
          alert("please switch network to mainnet or Rosten ")
           setisConnected(false)
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
    
    // setisConnecting(true)

    const web3 = new Web3(provider);
    console.log(await web3.eth.getChainId());

    if(await web3.eth.getChainId() == "1" || await web3.eth.getChainId() == "3"){
      await provider.request({
        method:"eth_requestAccounts"
      });
      onLoging(provider)
    }else{
      alert("You can only connect Ethereum Mainnet and Ropsten")
    }
    // setisConnecting(false)
  }
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
      getContract(web3)
      setActiveAccount(accounts[0])
      setBalance(balance)
      setisConnected(true)
      setId(id)
      console.log("setIsConnected true");
    }
  }

  // const onLogout =()=>{

    // setisConnected(false)
  // }

  useEffect(async()=>{
    if(isConnected ){
      window.ethereum.on('networkChanged', function (ID) {
        console.log("useEffect2");
        // Time to reload your interface with accounts[0]!
        walletAlreadyConnect()
      });
    }
  },[])

  function setValue(e) {
    setData({...data,[e.target.name]:e.target.value})
    console.log("setValue");
    console.log(`${e.target.name}:${e.target.value}`);
 } 
 const  Addition=async()=>{
    setPendingTx(true)
    await contract.methods.Add(data.add).send({from:activeAccount})
    .then(async(res)=>{
        console.log(".then");
        console.log(res);
        var bal=await contract.methods.getBalance().call()
        setContractBalance(bal)
        setPendingTx(false)
    }).catch((res)=>{
      console.log("catch");
      console.log(res);
      setPendingTx(false)
    })
    // console.log(response);
 }
 const  subtraction=async()=>{
    setPendingTx(true)
    await contract.methods.Subtract(data.sub).send({from:activeAccount})
    .then(async(res)=>{
        console.log(".then");
        console.log(res);
        var bal=await contract.methods.getBalance().call()
        setContractBalance(bal)
      setPendingTx(false)
    }).catch((res)=>{
      console.log("catch");
      console.log(res);
      setPendingTx(false)
    })
 }
 const  multiplication=async()=>{
    setPendingTx(true)
    await contract.methods.Multiply(data.mul).send({from:activeAccount})
    .then(async(res)=>{
        console.log(".then");
        console.log(res);
        var bal=await contract.methods.getBalance().call()
        setContractBalance(bal)
        setPendingTx(false)
    }).catch((res)=>{
      console.log("catch");
      console.log(res);
      alert("transaction not complete due to some error")
      setPendingTx(false)
    })
 }
 const  division=async()=>{
    setPendingTx(true)
    await contract.methods.Divide(data.divide).send({from:activeAccount})
    .then(async(res)=>{
        console.log(".then");
        console.log(res);
        var bal=await contract.methods.getBalance().call()
        setContractBalance(bal)
        setPendingTx(false)
    }).catch((res)=>{
      console.log("catch");
      console.log(res);
      alert("transaction not complete due to some error")
      setPendingTx(false)
    })
 }
 
//  const  BalanceMethod=async()=>{
//   var bal=await contract.methods.getBalance().call()
//   setContractBalance(bal)
//  }

 

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
          <div className='mt-4'>
            <button className='btn btn-dark mr-5' disabled>Current Balance</button> <b>{contractBalance}</b>
          </div>
          {pendingTx &&
          <div>Transaction is in Process <img src={loaderImg} alt="loader"  style={{height:50}} /></div>
          }
          <div className='mt-5 inputDiv'>
            <input name="add" value={data.add} type="text" onChange={(e)=>setValue(e)} />
            <button className='btn btn-dark' onClick={()=>Addition()}>Add</button>
          </div>
          <div className='mt-5 inputDiv'>
            <input name="sub" value={data.sub} type="text" onChange={(e)=>setValue(e)} />
            <button className='btn btn-dark' onClick={()=>subtraction()}>Subtract</button>
          </div>
          <div className='mt-5 inputDiv'>
            <input name="mul" value={data.mul} type="text" onChange={(e)=>setValue(e)} />
            <button className='btn btn-dark' onClick={()=>multiplication()}>Multiply</button>
          </div>
          <div className='mt-5 inputDiv'>
            <input name="divide" value={data.divide} type="text" onChange={(e)=>setValue(e)} />
            <button className='btn btn-dark' onClick={()=>division()}>Divide</button>
          </div>
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

          <button type='button' className='btn btn-primary mr-3' style={{display:"inline-block"}} onClick={logingHandler}>
           Connect Metamask
          </button>
          <button className='btn btn-primary' >
           Connect Wallet
          </button>
          </div>
        </Modal.Body>
      </Modal>
     
    </div>
  );
}

export default App;
