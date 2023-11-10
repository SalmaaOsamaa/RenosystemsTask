import React, { useState } from 'react';
import {
    Modal,
    Box,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,

  } from '@mui/material';
import classes from './createuser.module.css'
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
export default function CreateUser({open,onClose,onUserAdded,refetch,setShow,show}) {

    const [userData, setUserData] = useState({
        name:'',
        username:'',
        email:'',
        userGroup:'',
        assignProfile:''
    });

    const [error,setError] = useState('')
    const handleUserDataChange = (event) => {
        const { name, value } = event.target;
        event.preventDefault()
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));


    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUser = {
            id: Date.now(), 
            name: userData.name,
            user_name: userData.username,
            user_email: userData.email,
            group: userData.userGroup,
            status: "Active", 
            created_at: new Date().toLocaleDateString("en-US") 
          };
        
          const response = await fetch("http://localhost:4000/users", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          });
        
          if (response.ok) {
            refetch(newUser)
            onUserAdded();
          setShow({
            ...show,
            showAddUserModal:false,
            showSuccess:true
          })
        
            
          } else {
            setError("an error occured while adding a user")
          }
    };
    const handleReset = () => {
      setUserData({
        name:'',
        username:'',
        email:'',
        userGroup:'',
        assignProfile:''
    })
    }
    return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={style}>
      
      <form onSubmit={handleSubmit} className={classes.formcontainer}>
    <FormControl className={classes.formcontrol}>
    <label className={classes.label}>Full Name</label>

        <TextField
            name="name"
            value={userData.name}
            onChange={handleUserDataChange}
            className={classes.inputfield}
            placeholder='name'
        />
        <label className={classes.label}>User Name</label>

        <TextField
            name="username"
            value={userData.username}
            onChange={handleUserDataChange}
            className={classes.inputfield}
            placeholder='User Name'
      
  />
  <label className={classes.label}>E-mail</label>

        <TextField
            name="email"
            value={userData.email}
            onChange={handleUserDataChange}
            className={classes.inputfield}
            placeholder='email'


        />
<label className={classes.label}>User Group</label>
        <Select
            name="userGroup"
            labelId="user-group-label"
            id="user-group"
            value={userData.userGroup}
            onChange={handleUserDataChange}
            fullWidth
            className={classes.selectfield}

        >

            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="group1">Manager</MenuItem>
            <MenuItem value="group2">Head Office</MenuItem>
        </Select>
        <label className={classes.label}>Assign Profile</label>

        <Select
            name="assignProfile"
            labelId="assign-profile-label"
            id="assign-profile"
            value={userData.assignProfile}
            onChange={handleUserDataChange}
            fullWidth
            className={classes.selectfield}

        >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="profile1">Profile 1</MenuItem>
            <MenuItem value="profile2">Profile 2</MenuItem>
        </Select>
        <Box sx={{
            display:"flex",
            marginTop:"15px"
        }}>
        <Button 
        sx={{
            width:"35%",
            whiteSpace:"nowrap",
        }}
         onClick={handleReset} color="primary">
            Reset fields
          </Button>
         <Box 
         sx={{
            display:'flex',
            justifyContent:"flex-end",
            alignItems:"flex-end",
            width:"100%",
         }}
         >
         <Button
         sx={{
            color:"black"

         }}
          onClick={onClose} variant="outlined" >
            Cancel
          </Button>
          <Button 
          type='submit'
          sx={{
            marginLeft:"5px"
          }}
           onClick={handleSubmit} variant="contained" color="success">
            Add User
          </Button>
         </Box>
      </Box>
    </FormControl>
</form>

  
      </Box>
    </Modal>
  );
  }