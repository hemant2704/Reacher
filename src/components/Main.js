import React, { useEffect, useState } from 'react';
import Identicon from 'identicon.js';
import { Box, Button, Typography, Tooltip, IconButton, TextField, Container, Stack } from '@mui/material'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { withStyles } from '@mui/styles'
import { motion, useAnimation } from 'framer-motion/dist/framer-motion'
import { useInView } from 'react-intersection-observer';
import Picupload from './Picupload';


const StyledTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-input': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          border: '1px solid #78909C !important',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#E40088 !important',
        },
      },
    },
  }
})(TextField);
const StyledButton = withStyles({
  root: {
    backgroundColor: '#d16ba5',
    color: '#fff',

    '&:hover': {
      backgroundColor: '#898de7 !important',
      color: '#fff',
    },
  }
})(Button);

const Main = (props) => {
  const [tipAmount, setTipAmount] = useState(0);

  const animation = useAnimation();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: '0',
        transition: {
          type: 'spring',
          duration: 1.5,
          bounce: 0.6
        }
      })
    }
    else {
      animation.start({ opacity: 0, y: '20vw' })
    }
  }, [inView])

  return (
    <Box id="mainContainer" sx={{ width: "100%", minHeight: '100vh', display: "flex", pt: 2, justifyContent: 'center', alignItems: "center" }}>
      <Container maxWidth="sm" sx={{ display: "flex", justifyContent: 'center' }}>
        <motion.div
          animate={animation}
          ref={ref}
          style={{ width: '100%', display: "flex", justifyContent: 'center' }}
        >
          {
            props.imageList.length != 0 &&

            props.imageList.map(imageContent => (
              imageContent[1] != '' ?
                <Box sx={{ backgroundColor: '#fff', border: "1px solid #7777ff", boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px', width: "80%", height: "auto" }}>
                  <Box sx={{ height: "50px" }}>
                    {
                      imageContent.author !== '0x0' &&
                      <img style={{ borderRadius: 4 }} width='30' height='30' src={`data:image/png;base64,${new Identicon(imageContent.author, 30).toString()}`} />
                    }
                    <Tooltip title={imageContent.author === undefined ? null : imageContent.author} placement="bottom-start">
                      <Button color="inherit" sx={{ fontWeight: 600, }}>
                        {imageContent.author === undefined && null}

                        {imageContent.author !== undefined && (imageContent.author === '0x0' ? imageContent.author : imageContent.author.slice(0, 7) + "..." + imageContent.author.slice(imageContent.author.length - 4))}

                      </Button>
                    </Tooltip>
                  </Box>
                  <Box sx={{ height: "auto", textAlign: "center", }}>
                    <Tooltip title={imageContent.description} placement='right'>
                      <img src={`https://ipfs.infura.io/ipfs/${imageContent[1]}`} style={{ minWidth: "inherit", minHeight: "inherit", maxHeight: "63vmin", width: "100%", objectFit: "cover" }} />
                    </Tooltip>
                  </Box>
                  <Box sx={{ mt: 1, width: "100%", height: "50px" }}>
                    <Typography align='center' sx={{ width: "100%" }}>
                      <StyledTextField
                        onChange={(e) => setTipAmount(e.target.value)}
                        InputProps={{ style: { height: '36px', borderRadius: 0 } }}
                        sx={{ width: '100px', mx: 1 }}
                        type='number'
                        color='secondary'
                        value={tipAmount === 0 ? null : tipAmount}
                        placeholder='0 eth'
                      />
                      <StyledButton variant="contained" sx={{ mx: 1, fontWeight: 600, borderRadius: 0, boxShadow: '5px 5px #898de7' }}>Tip</StyledButton>
                    </Typography>
                  </Box>
                </Box>
                :
                null
              
            ))
          }


        </motion.div>
      </Container>

    </Box>
  );
}

export default Main;