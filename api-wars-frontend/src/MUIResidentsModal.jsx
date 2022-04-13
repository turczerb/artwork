import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  maxHeight: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

export default function ResidentsModal({ open, setOpen, data, name }) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <TableContainer component={Paper}>
              <h1 style={{ textAlign: "center" }}>Residents of {name}</h1>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Height</TableCell>
                    <TableCell align="center">Mass</TableCell>
                    <TableCell align="center">Skin Color</TableCell>
                    <TableCell align="center">Eye Color</TableCell>
                    <TableCell align="center">Birth Year</TableCell>
                    <TableCell align="center">Gender</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((e, i) => (
                    <TableRow
                      key={data[i].name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {data[i].name}
                      </TableCell>
                      <TableCell align="center">{data[i].height}</TableCell>
                      <TableCell align="center">{data[i].mass}</TableCell>
                      <TableCell align="center">{data[i].skin_color}</TableCell>
                      <TableCell align="center">{data[i].eye_color}</TableCell>
                      <TableCell align="center">{data[i].birth_year}</TableCell>
                      <TableCell align="center">{data[i].gender}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{ width: "100%", textAlign: "right", marginTop: "20px" }}
            >
              <button style={{ width: "100px" }} onClick={handleClose}>
                Close
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

//
