import React,{useEffect} from 'react'
import { Box, Container, Grid, Typography, Stack, Tooltip, Card, Avatar } from '@mui/material'
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import { motion, useAnimation } from 'framer-motion/dist/framer-motion'
import { useInView } from 'react-intersection-observer';
const theme = createTheme({

  typography: {
    fontFamily: ['"Poppins"', 'Sans-serif'].join(','),
    button: {
      textTransform: "none"
    }
  },
});
const Footer = () => {
  const animation=useAnimation();
  const {ref,inView}=useInView();
  useEffect(()=>{
    if(inView){
      animation.start({
        opacity: 1,
        transition:{
          duration:2.5,
        }
      })
    }
    else{
      animation.start({opacity:0})
    }
  },[inView])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <motion.div
        ref={ref}
        animate={animation}
      >
        <Box
          component="footer"
          sx={{ boxShadow:"0px -2px 10px",backgroundImage: 'linear-gradient(to right top, #814f7f, #6d4b79, #594771, #474267, #383c5b, #353450, #312d45, #2c263b, #2c1d2e, #291521, #240d14, #1f0201)', py: 3 }}
        >
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={6}>
                <Typography align="center" gutterBottom sx={{ my: 3,fontWeight:'600', fontSize: '36px', color: 'white' }}>
                  Reacher
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Stack spacing={1}>
                    <Tooltip title='Github' placement="right">
                      <a href='https://www.github.com/hemant2704' target='_blank' rel="noreferrer"><GitHubIcon color='primary' /></a>
                    </Tooltip>
                    <Tooltip title='LinkedIN' placement="right">
                      <a href='https://www.linkedin.com/in/hemant-singh-75022719b' target='_blank' rel="noreferrer"><LinkedInIcon color='primary' /></a>
                    </Tooltip>
                    <Tooltip title='Portfolio' placement="right">
                      <a href='https://hemant2704.github.io/hemant-portfolio' target='_blank' rel="noreferrer"><LanguageIcon color='primary' /></a>
                    </Tooltip>
                  </Stack>
                </div>
              </Grid>
            </Grid>

          </Container>
        </Box>
      </motion.div>
    </ThemeProvider>
  )
}

export default Footer