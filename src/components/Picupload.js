import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Button, Grid } from "@mui/material"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { withStyles } from '@mui/styles'
import HideImageIcon from '@mui/icons-material/HideImage';
import SearchIcon from '@mui/icons-material/Search';
import { motion, useAnimation } from 'framer-motion/dist/framer-motion'
import Tooltip from "@mui/material/Tooltip"
import TextField from '@mui/material/TextField';


const Input = styled('input')({
    display: 'none',
});
const StyledTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '1px solid #78909C',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#d16ba5',
            },
        },
    },
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
const StyledCancelButton = withStyles({
    root: {
        backgroundColor: '#d16ba5',
        color: '#fff',

        '&:hover': {
            backgroundColor: '#ff8888 !important',
            color: '#fff',
        },
    }
})(Button);
const StyledUploadButton = withStyles({
    root: {
        backgroundColor: '#d16ba5',
        color: '#fff',

        '&:hover': {
            backgroundColor: '#88ff88 !important',
            color: '#000',
        },
    }
})(Button);

const Picupload = ({handleImageUpload}) => {
    const [open, setOpen] = useState(false);
    const [bufferFile, setBufferFile] = useState(undefined)
    const [previewImage, setPreviewImage] = useState(undefined)
    const [screenSize, setScreenSize] = useState(null)
    const [description,setDescription]=useState('');
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener(`resize`, handleResize);
        handleResize();
        return () => window.removeEventListener(`resize`, handleResize);
    }, []);
    const handleClose = () => {
        setOpen(false)
        setBufferFile(undefined);
        setPreviewImage(undefined)
        setDescription('')
    }
    const selectImage = (event) => {
        event.preventDefault();
        const file=event.target.files[0]
        const reader=new window.FileReader()
        reader.readAsArrayBuffer(file)
        setPreviewImage(URL.createObjectURL(event.target.files[0]))
        reader.onloadend=()=>{
            setBufferFile(Buffer(reader.result))
            console.log(Buffer(reader.result))
        }
    }
    
    return (
        <>
            <Tooltip title="Click to upload image" placement="top">
                <Fab onClick={() => setOpen(true)} sx={{ backgroundColor: '#FDADAD', boxShadow: '0px 0px 15px #171717', display: 'absolute', top: '85%', left: screenSize > 786 ? '90%' : '80%', position: "fixed" }} aria-label="add">
                    <svg style={{ stroke: '#000' }} viewBox="0 0 100 100">
                        <line
                            x1="32.5" y1="50" x2="67.5" y2="50" stroke-width="4"></line>
                        <line
                            x1="50" y1="32.5" x2="50" y2="67.5" stroke-width="4"></line>
                    </svg>
                </Fab>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth >
                <DialogTitle sx={{ backgroundColor: "#0E3B56" }}>
                    <Container maxWidth='md'>
                        <Typography sx={{ color: '#fff', fontSize: '20px', fontWeight: 600 }}>
                            Upload a pic
                        </Typography>
                    </Container>
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: "#E7EDE5", height: '70vh' }}>
                    <Container maxWidth="md" sx={{ mt: 5 }}>
                        <Grid container>
                            <Grid item xs={12} md={6} style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                <label htmlFor="contained-button-file">
                                    <Input
                                        accept="image/*"
                                        id="contained-button-file" type="file"
                                        onChange={selectImage}
                                    />
                                    <StyledButton variant="contained" component="span" sx={{ height: "50px", width: "100px", mx: 1, fontWeight: 600, borderRadius: 0, boxShadow: '8px 8px #898de7' }}>
                                        <SearchIcon />Browse
                                    </StyledButton>
                                </label>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", width: "200px", height: "300px", borderRadius: 2, backgroundColor: '#C4D9FF', boxShadow: '0px 0px 10px #d16ba5' }}>
                                    {previewImage && <img src={previewImage} alt='image' width='200px' />}
                                    {!previewImage && <Typography sx={{ color: '#999999' }}><HideImageIcon sx={{ color: '#171717' }} /></Typography>}
                                </Box>
                            </Grid>
                        </Grid>
                        <Typography
                            sx={{
                                color:previewImage === undefined?"#aaa":"#000",
                                fontSize: '14px',
                                fontWeight: 600,
                            }}
                        >
                            Description
                        </Typography>
                        <StyledTextField
                            margin="dense"
                            InputProps={{ style: { height: '48px' } }}
                            required
                            fullWidth
                            id="text"
                            type='text'
                            name="description"
                            onChange={(e)=>setDescription(e.target.value)}
                            disabled={previewImage === undefined}
                        />
                    </Container>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#0E3B56" }}>
                    <StyledCancelButton onClick={handleClose} variant="contained" sx={{ my: 1, mx: 2, fontWeight: 600, borderRadius: 0, boxShadow: '5px 5px #ff8888' }}>
                        Cancel
                    </StyledCancelButton>
                    <StyledUploadButton onClick={(e)=>handleImageUpload(bufferFile,description)} variant="contained" sx={{ my: 1, mx: 2, fontWeight: 600, borderRadius: 0, boxShadow: '5px 5px #88ff88' }}>
                        Upload
                    </StyledUploadButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Picupload