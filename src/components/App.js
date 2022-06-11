import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import Reacher from '../abis/Reacher.json'
import Box from '@mui/material/Box'
import Navbar from './Navbar'
import Main from './Main'
import Particles from './ParticlesAnim'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeInfo from './HomeInfo';
import Footer from './Footer';
import CircularProgress from '@mui/material/CircularProgress';
import Picupload from './Picupload';
import Backdrop from '@mui/material/Backdrop';


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const theme = createTheme({
  typography: {
    fontFamily: ['"Poppins"', 'Sans-serif'].join(','),
    button: {
      textTransform: "none"
    }
  },
});

const App = () => {
  const [account, setAccount] = useState('0x0')
  const [reacher, setReacher] = useState(null)
  const [imageCount, setImageCount] = useState(0);
  const [imageList, setImageList] = useState([])
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert("Non-Ethereum browser detected. You should consider trying Metamask")
    }
  }
  const loadBlockchainData = async () => {
    setLoading(true)
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId()
    const networkData = Reacher.networks[networkId]

    if (networkData) {
      const reacher = web3.eth.Contract(Reacher.abi, networkData.address)
      setReacher(reacher)
      const imageCount = await reacher.methods.imageCount().call();
      setImageCount(imageCount);

      for (let i = 0; i < imageCount; i++) {
        const image=await reacher.methods.images(i).call()
        setImageList([...imageList,image]);
      }
      setLoading(false)
    }
    else {
      window.alert('Reacher contract not deployed to detected network');
    }

  }
  const handleImageUpload = async (bufferFile, description) => {
    console.log("Submitting file to ipfs")

    try {
      setFileLoading(true)
      const result = await ipfs.add(bufferFile);
      console.log('Ipfs result', result)
      reacher.methods.uploadImage(result[0].hash, description).send({ from: account }).on('transactionHash', (hash) => setFileLoading(false))
    }
    catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);
  console.log(imageList)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading &&
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
      {
        !loading &&
        <>
          <Navbar account={account} />
          <HomeInfo />
          <Particles />
          <Main/>
          <Picupload handleImageUpload={handleImageUpload} />
          <Footer />
        </>
      }
    </ThemeProvider>
  );
}

export default App;