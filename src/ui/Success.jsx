import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import successgif from '../assets/giphy.gif'

//styling for the modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:400,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',      
    flexDirection: 'column',
    justifyContent:"center",
    alignItems:"center"
};
export default function Success({open,onClose}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
        <Box sx={style}>
    <img
        src={successgif}
        width={80}
        height={80}
    />
    <Typography variant='h6' textAlign='center'>
        User Added Successfully
    </Typography>
    <Button
    sx={{
        marginTop:"20px"
    }}
    variant="contained" 
    color="success"
    onClick={onClose}
    >Done</Button>
        </Box>
    </Modal>
  );
}
