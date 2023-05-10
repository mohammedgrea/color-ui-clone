import { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import SeedColor from "../SeedColor";
import Palette from "./Palette";

export default function Palettes() {
  const palettes = SeedColor.map((palette) => (
    <PaletteBox key={palette.id} to={`/${palette.id}`}>
      <Cont>
        <Palette colors={palette.colors} />
      </Cont>
      <PaletteInfo>
        <PaletteName>{palette.paletteName}</PaletteName>
        <PaletteEmoji>{palette.emoji}</PaletteEmoji>
      </PaletteInfo>
    </PaletteBox>
  ));
  return (
    <PalettesContainer>
      <PaletteHeader>
        Color ui
        <CreateNewPalette to="/create-palette">
          Create New Palette
        </CreateNewPalette>
      </PaletteHeader>
      <PalettesBox>{palettes}</PalettesBox>
    </PalettesContainer>
  );
}

const PalettesContainer = styled.div`
  background-color: #3c40c6;
  padding-block: 40px;
  padding-inline: 500px;
`;
const PalettesBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  height: 90%;
  background-color: #3c40c6;
`;
const Cont = styled.div`
  pointer-events: none;
  height: 100%;
`;
const PaletteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-block: 20px;
  font-family: "Barlow";
  font-weight: bold;
  font-size: 20px;
  color: white;
`;
const CreateNewPalette = styled(Link)`
  cursor: pointer;
  color: white;
  font-weight: bold;
  text-decoration: none;
  position: relative;
  &::after {
    position: absolute;
    content: "";
    bottom: -5px;
    left: 0;
    width: 0%;
    background-color: white;
    transition: width 0.2s;
    height: 2px;
  }
  &:hover::after {
    width: 100%;
  }
`;

const PaletteBox = styled(Link)`
  background-color: #3c40c6;
  background-color: white;
  padding: 10px 10px 50px 10px;
  min-height: 220px;
  border-radius: 4px;
  color: black;
  font-family: "Barlow";
  font-weight: bold;
  text-decoration: none;
`;
const PaletteInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const PaletteName = styled.div``;
const PaletteEmoji = styled.div``;
