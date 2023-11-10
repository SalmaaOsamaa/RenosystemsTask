import classes from './App.module.css';
import UsersPage from './components/UsersPage';
import Sidebar from './components/Sidebar';
import { useState } from 'react';

function App() {
  const [IsSidebarVisible, setIsSidebarVisible] = useState(false)
  const handleShowSidebar = () => {
    setIsSidebarVisible(!IsSidebarVisible)
  }
  return (
    <div className={classes.App}>
 <Sidebar IsSidebarVisible={IsSidebarVisible} />
    <UsersPage
    IsSidebarVisible={IsSidebarVisible}
    handleShowSidebar={handleShowSidebar}
    />
    </div>
  );
}

export default App;
