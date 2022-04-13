import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ResidentsModal from "./MUIResidentsModal.jsx";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { yellow } from "@mui/material/colors";

export default function MUIPlanetsTable({ fetchedPlanetData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [personsArray, setPersonsArray] = useState([]);
  const [planetName, setPlanetName] = useState("");

  const fetchResidents = async (arr, name) => {
    setBackdropOpen(true);
    setPersonsArray([]);
    setPlanetName(name);
    for (const person of arr) {
      await fetch(person)
        .then((response) => response.json())
        .then((data) =>
          setPersonsArray((personsArray) => personsArray.concat(data))
        );
    }

    setModalOpen(true);
    setBackdropOpen(false);
  };

  return (
    <div id="mui-container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress style={{ color: "yellow" }} />
      </Backdrop>
      <ResidentsModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={personsArray}
        name={planetName}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Climate</TableCell>
              <TableCell align="center">Gravity</TableCell>
              <TableCell align="center">Terrain</TableCell>
              <TableCell align="center">Population</TableCell>
              <TableCell align="center">Rotational Period</TableCell>
              <TableCell align="center">Orbital Period</TableCell>
              <TableCell align="center">Diameter</TableCell>
              <TableCell align="center">Residents</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedPlanetData.map((e, i) => (
              <TableRow
                key={fetchedPlanetData[i].name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {fetchedPlanetData[i].name}
                </TableCell>
                <TableCell align="center">
                  {fetchedPlanetData[i].climate}
                </TableCell>
                <TableCell align="center">
                  {fetchedPlanetData[i].gravity}
                </TableCell>
                <TableCell align="center">
                  {fetchedPlanetData[i].terrain}
                </TableCell>
                <TableCell align="center">
                  {fetchedPlanetData[i].population}
                </TableCell>
                <TableCell align="center">
                  {fetchedPlanetData[i].rotation_period}
                </TableCell>
                <TableCell align="center">
                  {fetchedPlanetData[i].orbital_period}
                </TableCell>
                <TableCell align="center">
                  {fetchedPlanetData[i].diameter}
                </TableCell>
                <TableCell align="center">
                  {fetchedPlanetData[i].residents.length ? (
                    <button
                      onClick={() =>
                        fetchResidents(
                          fetchedPlanetData[i].residents,
                          fetchedPlanetData[i].name
                        )
                      }
                    >
                      View Residents ({fetchedPlanetData[i].residents.length})
                    </button>
                  ) : (
                    "No residents."
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
