import { Button } from '@mui/material';
import React from 'react';
import logo from '../assets/logoimage.png'
import classes from './welcomepage.module.css'
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
    const navigate = useNavigate()
     const handleOnClick = () => {
        navigate('/users-page')
     }
  return (
    <div className={classes.container}>
    <div className={classes.imagehalf}>
      <img src={logo} alt="Welcome" />
    </div>
    <div className={classes.texthalf}>
      <p>Welcome to Dashboard!</p>
      <Button 
      sx={{
        marginTop:"20px"
      }}
      variant="contained" color="success" onClick={handleOnClick}>Click Here</Button>
    </div>
  </div>
  );
}
