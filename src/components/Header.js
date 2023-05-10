import React from "react";
import styled from "styled-components";
import NativeSelect from "@mui/material/NativeSelect";
import { keyframes } from "styled-components";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <HeaderContainer>
      <LeftHeader to="/">
        <KeyboardBackspaceIcon fontSize="medium" />
        Back
      </LeftHeader>
      <MiddletHeader></MiddletHeader>
      <RightHeader>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
        >
          <option value={10}>RGB - (255,255,255)</option>
          <option value={20}>HEX - #1234EF</option>
          <option value={30}>
            <span>RGBA - (12,12,12,1.0)</span>
          </option>
        </NativeSelect>
      </RightHeader>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;
const arrowAnimation = keyframes`
 0% {padding-left:0px; }
 /* 50% { padding-left:10px; } */
 100% { padding-left:20px; }`;

const LeftHeader = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding-inline: 20px;
  /* background-color: #eceff1; */
  height: 100%;
  text-decoration: none;
  color: black;
  &:hover .MuiSvgIcon-root {
    animation-name: ${arrowAnimation};
    animation-duration: 0.7s;
    animation-iteration-count: infinite;
  }
`;
const MiddletHeader = styled.div``;
const RightHeader = styled.div``;
