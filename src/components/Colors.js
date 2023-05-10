import React, { useState } from "react";
import { styled } from "styled-components";
import Color from "./Color";
export default function Colors({ colors, id = null }) {
  const clos = colors.map((color) => (
    <Color color={color} key={color.name} id={id} />
  ));
  return <ColorsContainer id={id}>{clos}</ColorsContainer>;
}
const ColorsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  height: ${(props) => (props.id !== null ? "calc(100vh - 50px)" : "100%")};
  overflow: hidden;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
