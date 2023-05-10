import React from "react";
import Header from "../components/Header";
import Colors from "../components/Colors";
import SeedColor from "../SeedColor";
import { useParams } from "react-router-dom";

export default function Palette({ colors }) {
  const { id } = useParams();

  if (id) {
    colors = SeedColor.filter((palette) => palette.id === id)[0].colors;
  }

  return (
    <>
      {id && <Header />}
      <Colors colors={colors} id={id} />
    </>
  );
}
