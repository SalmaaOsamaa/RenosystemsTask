import React, { useState } from "react";
import classes from "./sidebar.module.css";
import { SidebarData } from "./SidebarData";
import { Box, TextField, Typography } from "@mui/material";
import Logo from "../assets/logo.png";
import { AiOutlineDown } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { motion } from "framer-motion";



export default function Sidebar({ IsSidebarVisible }) {
  const [searchText, setSearchText] = useState("");
  const [activeElement, setActiveElement] = useState(null);

  const requestSearch = (searchValue) => {
    console.log(searchText);
    setSearchText(searchValue);
  };

  const handleElementClick = (key) => {
    setActiveElement(key);
  };
  return IsSidebarVisible ? (
    <motion.div
      className={`${
        IsSidebarVisible ? classes.sidebar : classes.sidebarHidden
      }`}
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <img
        src={Logo}
        alt="logo"
        width={80}
        height={80}
        className={classes.image}
      />
      <TextField
        id="search-input"
        type="search"
        variant="standard"
        value={searchText}
        onChange={(e) => requestSearch(e.target.value)}
        placeholder="Quick Access"
        InputProps={{
          style: {
            border: "1px solid #ccc",
            borderRadius: "25px",
            padding: "3px",
            backgroundColor: "white",
          },
        }}
      />
      <Box
        sx={{
          display:"flex",
          flexDirection:"column",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            margin: "15px",
          }}
          color="grey"
          variant="h6"
        >
          <BiSolidDashboard /> Dashboard
        </Typography>
     
        <ul className={classes.SidebarEl}>
          {SidebarData.map((val, key) => {
            return (
              
              <Box
                sx={{
                 display:"flex",
                 justifyContent:"center",
                 alignItems:"center",
                  width: "100%",
                  height: "50px",
                  backgroundColor:
                    activeElement === key ? "#21A565" : "initial", 
                  transition: "background-color 0.2s ease-in-out",
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#2A324C",
                  },
                }}
                key={key}
                onClick={() => handleElementClick(key)}
              >
              
                <Typography 
                 color={activeElement === key ? "white" : "grey"}>
                  {val.title}   <AiOutlineDown />
                </Typography>
         
              </Box>
            );
          })}
        </ul>
      </Box>
    </motion.div>
  ) : null;
}
