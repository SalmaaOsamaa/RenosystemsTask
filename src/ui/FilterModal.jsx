import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, Input, TextField, Typography } from "@mui/material";
import classes from "./filtermodal.module.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function FilterModal({
  open,
  onClose,
  users,
  setFilteredUsers,
  
}) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const resetFilter = () => {
    setSelectedDate("");
    setSelectedStatus("");
    setFilteredUsers([...users])
  };

  const filterUsers = () => {
    let filtered = [...users];
    if (selectedDate) {
      filtered = filtered.filter((user) => {
        const userDate = new Date(user.created_at).setHours(0, 0, 0, 0);
        const filterDate = new Date(selectedDate).setHours(0, 0, 0, 0);
        return userDate === filterDate;
      });
    }

    if (selectedStatus) {
      filtered = filtered.filter((user) => {
        return user.status === selectedStatus;
      });
    }
    setFilteredUsers(filtered);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5">Filter Users</Typography>

          <form
            onSubmit={(e) => e.preventDefault()}
            className={classes.formcontainer}
          >
            <FormControl className={classes.formcontrol}>
              <label className={classes.label}>Select Date</label>

              <TextField
                name="name"
                value={selectedDate}
                onChange={handleDateChange}
                className={classes.inputfield}
                placeholder="name"
                type="date"
              />

              <label className={classes.label}>Select status</label>
              <Select
                name="assignProfile"
                labelId="assign-profile-label"
                id="assign-profile"
                value={selectedStatus}
                onChange={handleStatusChange}
                displayEmpty
                fullWidth
                className={classes.selectfield}
              >
                <MenuItem value="" disabled>
                  <em>Select Status</em>
                </MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Locked">Locked</MenuItem>
              </Select>
              <Box
                sx={{
                  display: "flex",
                  marginTop: "15px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    width: "100%",
                  }}
                >
                  <Button
                    sx={{
                      color: "black",
                    }}
                    onClick={resetFilter}
                    variant="outlined"
                  >
                    Reset filters
                  </Button>
                  <Button
                    type="submit"
                    sx={{
                      marginLeft: "5px",
                    }}
                    onClick={filterUsers}
                    variant="contained"
                    color="success"
                  >
                    Filter
                  </Button>
                </Box>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
