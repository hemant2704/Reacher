import React, { useEffect } from 'react'
import { Box, IconButton, Container, Grid, Typography } from '@mui/material'
import block from '../img/block.png'
import eth from '../img/eth.jpg'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { motion, useAnimation } from 'framer-motion/dist/framer-motion'
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-scroll';
const HomeInfo = () => {
    const animation = useAnimation();
    const { ref, inView } = useInView();
    useEffect(() => {
        if (inView) {
            animation.start({
                opacity: 1,
                transition: {
                    duration: 2.0,
                }
            })
        }
        else {
            animation.start({ opacity: 0 })
        }
    }, [inView])
    const buttonVariants = {
        visible: {
            opacity: 0.5,
            y: -10,
            transition: {
                duration: 0.6,
                yoyo: Infinity,
            }
        },
    }
    return (
        <>
            <motion.div
                animate={animation}
                ref={ref}
            >
                <Box
                    sx={{
                        height: "100vh", width: '100%', backgroundColor: '#000', opacity: "0.8",
                        boxShadow: '0px 10px 5px #000'
                    }}
                >
                    <Container sx={{ border: "1px solid transparent", minHeight: '100vh' }}>
                        <Grid container sx={{ mt: 12 }} spacing={4}>
                            <Grid item xs={12} md={6} lg={6}>
                                <motion.div
                                    initial={{ opacity: 0, y: '-10vw' }}
                                    animate={{ opacity: 1, y: '0' }}

                                    transition={{ type: 'spring', duration: 2, bounce: 0.6 }}
                                >
                                    <Typography sx={{ typography: { sm: { fontSize: '48px' }, xs: { fontSize: '36px' } }, mt: 10, color: '#fff', fontWeight: '600', letterSpacing: 4, wordSpacing: 2 }}>Blockchain based decentralised Social Media App</Typography>
                                </motion.div>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}
                                sx={{
                                    display: { xs: "none", lg: "flex" },
                                    justifyContent:'center',
                                    alignItems:"center"

                                }}
                            >

                                <motion.div
                                    initial={{ opacity: 0, y: '10vw' }}
                                    animate={{ opacity: 1, y: '0' }}

                                    transition={{ type: 'spring', duration: 2, bounce: 0.6 }}
                                >
                                    <img src={block} style={{ marginLeft: "10px" }} width='75%' alt="logo" />
                                </motion.div>
                            </Grid>
                        </Grid>
                        <Typography align='center'>
                            <motion.div variants={buttonVariants} animate='visible'>
                                <Link smooth={true} to="mainContainer">
                                    <IconButton
                                        sx={{ border: '1px solid #5522ff', borderRadius: 10 }}
                                    >
                                        <KeyboardDoubleArrowDownIcon color='primary' sx={{ fontSize: "40px" }} />
                                    </IconButton>
                                </Link>
                            </motion.div>
                        </Typography>
                    </Container>
                </Box>
            </motion.div>
        </>
    )
}

export default HomeInfo