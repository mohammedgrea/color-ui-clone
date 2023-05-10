import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { styled, keyframes } from "styled-components";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";

import Modal from "../components/Modal";
export default function CreateNewPalette() {
  const [background, setBackground] = useState("#fff");
  const [colorName, setColorName] = useState(" ");
  const [tracker, setTracker] = useState(false);
  const [CheckDoubleColor, setCheckDoubleColor] = useState(false);
  let colors = JSON.parse(localStorage.getItem("couleur")) || [];
  const [Folderstate, setFolderState] = useState(false);
  const [error, setError] = useState(false);

  function showCreateFolderModal() {
    setFolderState(false);
  }

  let boxs = colors?.map((color) => (
    <ColorBox color={color.color}>
      <Tooltip title="Delete">
        <IconButton onClick={(e) => deleteColor(e, color)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <span color={color.color}>{color.name}</span>
    </ColorBox>
  ));

  function handleChangeComplete(color) {
    setBackground(color.hex);
  }

  function addColor() {
    if (
      !colors.find((color) => color.name === colorName) &&
      colorName !== " "
    ) {
      if (!colors.find((color) => color.color === background)) {
        setCheckDoubleColor((CheckDoubleColor) => (CheckDoubleColor = true));
        setError(false);
      } else return alert("change color");
    } else return setError(true);
  }
  function deleteColor(e, col) {
    colors = colors.filter((color) => color !== col);
    localStorage.setItem("couleur", JSON.stringify(colors));
    setTracker(!tracker);
    e.stopPropagation();
  }

  useEffect(() => {
    boxs = colors?.map((color) => (
      <ColorBox color={color.color}>
        <Tooltip title="Delete">
          <IconButton onClick={(e) => deleteColor(e, color)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <span color={color.color}>{color.name}</span>
      </ColorBox>
    ));
  }, [tracker]);
  useEffect(() => {
    if (!CheckDoubleColor) return;
    colors.push({ color: background, name: colorName });
    localStorage.setItem("couleur", JSON.stringify(colors));
    setTracker(!tracker);
    setCheckDoubleColor((CheckDoubleColor) => (CheckDoubleColor = false));
  }, [CheckDoubleColor]);
  return (
    <>
      <HeaderContainer>
        <LeftHeader to="/">
          <KeyboardBackspaceIcon fontSize="medium" />
          Back
        </LeftHeader>
        <Button
          variant="contained"
          onClick={() => {
            if (!colors.length > 0) {
              return alert("The palette is empty.Create Some Colors");
            }
            setFolderState(true);
          }}
        >
          Save
        </Button>
      </HeaderContainer>
      <CreateNewPaletteContainer>
        <ColorsBox>{boxs}</ColorsBox>
        <Add>
          <ChromePicker color={background} onChange={handleChangeComplete} />
          <TextField
            error={error}
            onChange={({ target }) => setColorName(target.value)}
            helperText={error ? "you have already or empty" : ""}
            id="standard-basic"
            label="Color Name"
            variant="standard"
          />
          <AddButttn onClick={() => addColor()}>Add New Color</AddButttn>
        </Add>
        <Modal
          isCreateFolderAppeared={Folderstate}
          showCreateFolderModal={showCreateFolderModal}
        />
      </CreateNewPaletteContainer>
    </>
  );
}

const CreateNewPaletteContainer = styled.div`
  display: flex;
`;
const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 5px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  z-index: 10;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
  }
`;
const ColorsBox = styled.div`
  display: flex;
  margin-left: 260px;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const ColorBox = styled.div`
  height: 150px;
  width: 150px;
  background-color: ${(props) => props.color};
  position: relative;
  > span {
    position: absolute;
    bottom: 5px;
    left: 5px;
    color: ${(props) => (isDark(props.color) ? "white" : "black")};
    font-size: 14px;
  }
  > button {
    position: absolute;
    bottom: 0px;
    right: 0px;
    > .MuiSvgIcon-root {
      font-size: 14px;
      &:hover {
        color: white;
      }
    }
  }
`;
const Add = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  gap: 50px;
  padding-inline: 20px;
  height: 100vh;
  width: 260px;
  padding-top: 200px;
  border-right: 2px solid rgba(0, 0, 0, 0.1);
`;
const AddButttn = styled.button`
  cursor: pointer;
  width: 220px;
  background-color: #4688f4;
  border: none;
  height: 50px;
  color: white;
  font-weight: bold;
  transition: 0.2s;
  &:hover {
    background-color: #3d6ec9;
  }
`;

const isDark = (color) => {
  const hexColor = color.replace("#", "");
  const red = parseInt(hexColor.substring(0, 2), 16);
  const green = parseInt(hexColor.substring(2, 4), 16);
  const blue = parseInt(hexColor.substring(4, 6), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return brightness < 128;
};

const arrowAnimation = keyframes`
 0% {padding-left:0px; }
 100% { padding-left:20px; }`;

const LeftHeader = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding-inline: 20px;
  height: 100%;
  text-decoration: none;
  color: black;
  &:hover .MuiSvgIcon-root {
    animation-name: ${arrowAnimation};
    animation-duration: 0.7s;
    animation-iteration-count: infinite;
  }
`;
