import React, { useState } from 'react';
import classes from './Navbar.module.css'
import {AiOutlineClose,AiOutlineBars,AiOutlineQuestionCircle} from 'react-icons/ai'
import {IoMdNotificationsOutline} from 'react-icons/io'

export default function Navbar({IsSidebarVisible,handleShowSidebar}) {
  
  return (
<>
  <div>
  
  </div>
  <nav className={classes.nav}>
    <div className={classes.wrapper}>
   
      <h6 className={classes.heading}> {IsSidebarVisible ? 
      <AiOutlineClose onClick={handleShowSidebar}/> : 
      <AiOutlineBars onClick={handleShowSidebar}/> 
      } Good morning <span style={{
        color:"grey"
      }}>Tue Jan 12,2021 9:39</span></h6>
      <div className={classes.end}>
     <div className={classes.icon}>
     <AiOutlineQuestionCircle className={classes.question} size={30} color='grey'/>
      <IoMdNotificationsOutline size={30} color='grey'/>
     
     </div>
     <p>Nader Amen <span className={classes.span}>NA</span></p>

      </div>
    </div>
  </nav>

</>
  );
}
