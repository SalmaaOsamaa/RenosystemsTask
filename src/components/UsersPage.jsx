import { Box, Button, Container, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DataGrid,GridToolbarExport } from '@mui/x-data-grid';
import Navbar from '../ui/Navbar'
import FilterModal from '../ui/FilterModal'
import React, { useEffect, useState } from 'react';
import CreateUser from '../ui/CreateUser';
import Success from '../ui/Success';
import CustomExport from '../ui/CustomExport';
const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'user_name', headerName: 'Username', width: 150 },
      { field: 'user_email', headerName: 'Email', width: 250 },
      { field: 'group', headerName: 'Group', width: 120 },
      {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) => {
          const currentStatus = params.row.status;
          return (
          <select
            defaultValue={currentStatus} 
           onChange={()=>console.log("selected")}>
            <option value="10">Active</option>
            <option value="10">InActive</option>
            <option value="10">Locked</option>
          </select>
          );
        },
        
      },  
         { field: 'created_at', headerName: 'Created At', width: 130 },
  ];
  async function getTickets() {
      const response = await fetch("http://localhost:4000/users")
    
      return await response.json() 
    }
export default function UsersPage({IsSidebarVisible,handleShowSidebar}) {
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users,setUsers] = useState([])
  const [show,setShow] = useState({
    showFilterModal: false,
    showAddUserModal: false,
    showSuccess:false
  })
  const [page, setPage] = useState(0); 
  const [pageSize, setPageSize] = useState(5);
   useEffect(() => {
    async function fetchData() {
      const ticketsResponse = await getTickets()
      setUsers(ticketsResponse)
      setFilteredUsers(ticketsResponse);

    }
    fetchData()
    }, []);
         
    
    const handleFilterButtonClick = () => {
        setShow({
          ...show,
          showFilterModal:true
        })
      };
    const handleClose = () => {
      setShow({
        ...show,
        showFilterModal:false
      })
    }
    const requestSearch = (searchValue) => {
      setSearchText(searchValue);
      if (searchValue) {
        const lowercasedFilter = searchValue.toLowerCase();
        const filteredData = users.filter((user) =>
          user.name && user.name.toLowerCase().includes(lowercasedFilter)

        );
        setFilteredUsers(filteredData);
        setPage(page)
        
      } else {
        setFilteredUsers(users);
      }
    };
 
    const handleAddUser = () => {
      setShow({
        ...show,
        showAddUserModal:true
      })
    };
      const handleCloseUser = () => {
        setShow({
          ...show,
          showAddUserModal:false
        })
      };
      const refetchData = (user) => {
        setFilteredUsers([
          ...filteredUsers,
          user

        ])
      }
      const openSuccessModal = () => {
        setShow({
          ...show,
          showSuccess:true
        })
      }
      const handleCloseSuccess = () => {
        setShow({
          ...show,
          showSuccess:false
        })
      }
      const handlePageChange = (newPage) => {
        setPage(newPage);
      };
      const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
      };
  return (
  <Box
 sx={{
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems:"center",
  margin:"auto"
 }}
  >
       <Navbar
    handleShowSidebar={handleShowSidebar}
    IsSidebarVisible={IsSidebarVisible}
    />
      <Container
    sx={{
      margin:"5px auto",
      padding:"0",
      border: "1px solid #E3E6EC", 
      height:"90vh"
   
    }}
    >
 
  
    <FilterModal open={show.showFilterModal}
        onClose={handleClose}
        users={users}
        setFilteredUsers={setFilteredUsers}

    />
    <CreateUser
      open={show.showAddUserModal}
      onClose={handleCloseUser}
      setShow={setShow}
      show={show}
      onUserAdded={getTickets}
      refetch={refetchData}
      openSuccess={openSuccessModal}
    />
    <Success
    open={show.showSuccess}
    onClose={handleCloseSuccess}

    />
     <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
          marginTop={4}
        >
          <Typography variant="h5" component="h2">
            Users Managment
          </Typography>
          <Button variant="contained" color="success" onClick={handleAddUser}>
            + Add User
          </Button>
        </Box>
        
    <Box
      display="flex"
      alignItems="center" 
      justifyContent="center" 
      minHeight="50vh"
      sx={{ '& .MuiDataGrid-root': { boxShadow: 2 } }} 
    >
        
      <div style={{ height: 400, width: '100%' }}>
      <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <TextField
            id="search-input"
            label="Search users"
            type="search"
            variant="standard"
            value={searchText}
            onChange={(e) => requestSearch(e.target.value)}
            sx={{ width: '100%', maxWidth: '300px' }}
          />
         <Button onClick={handleFilterButtonClick}>Filter</Button>
        </Box>
        <DataGrid
          columns={columns}
          pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          rows={filteredUsers}
          pagination
            page={page}
            onPageChange={handlePageChange}
          components={{
    Toolbar: CustomExport,
  }}
          
        />
      </div>
      
    </Box>
    
  </Container>
  </Box>
     
 
  );
}
