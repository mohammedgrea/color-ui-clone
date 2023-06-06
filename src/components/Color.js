import React, { useState } from "react";
import { keyframes, styled, css } from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
export default function Color({ color, id = null }) {
  const [copie, setCopie] = useState(false);

  function copieColor() {
    setCopie(true);
    setTimeout(() => {
      setCopie(false);
    }, 2000);
  }
  return (
    <CopyToClipboard text={color.color}>
      <ColorBlock color={color} copie={copie} onClick={copieColor}>
        {id && (
          <>
            <CopieButton color={color}>Copy</CopieButton>
            <MoreColors>more</MoreColors>
            <ColorName>{color.name}</ColorName>
            <Test copie={copie} color={color}>
              <Copy copie={copie}>copied!</Copy>
              <span>{color.color}</span>
            </Test>
          </>
        )}
      </ColorBlock>
    </CopyToClipboard>
  );
}

const CopieButton = styled.button`
  background-color: ${(props) => props.color.color};
  color: ${(props) => (isDark(props.color.color) ? "white" : "black")};
  cursor: pointer;
  background-color: transparent;
  text-transform: uppercase;
  font-family: "Barlow";
  font-weight: 600;
  font-size: 19px;
  border: none;
  border-radius: 4px;
  padding: 5px 20px;
  border: 2px solid
    ${(props) => (isDark(props.color.color) ? "white" : "black")};
  opacity: 0;
`;

const ColorBlock = styled.div`
  background-color: ${(props) => props.color.color};
  color: ${(props) => (isDark(props.color.color) ? "white" : "black")};
  background-color: ${(props) => props.color.color};
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: top left;
  position: relative;
  &:hover > ${CopieButton} {
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: 100px;
  }
`;
const ColorName = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 5px;
  font-weight: bold;
  text-transform: uppercase;
  @media (max-width: 992px) {
    font-size: 13px;
  }
  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

const MoreColors = styled.button`
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 5px 15px;
  text-transform: uppercase;
  border: none;
  @media (max-width: 992px) {
    font-size: 13px;
    padding: 5px 5px;
  }
  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

const ani = keyframes`
0%{

     height:0px;
    width:0px;
}
10%{
     height:300vh;
    width:300vw;

}
80%{
     height:300vh;
    width:300vw;

}
100%{
     height:0px;
    width:0px;
}
`;
const copyani = keyframes`
0%{
    width:0;
    height:0px;
}
10%{

    font-size:80px;
    width:100%;
    height:180px;
    
}
95%{
    font-size:80px;
    width:100%;
    height:180px;
}
100%{
      font-size:0px;
      width:0%;
    height:0px;
}
`;
const Test = styled.div`
  position: absolute;
  transform-origin: top right;
  background-color: ${(props) => props.color.color};
  animation-name: ${(props) => (props.copie ? ani : null)};
  animation-duration: 2000ms;
  z-index: 1000;
  > span {
    position: fixed;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-name: ${(props) => (props.copie ? copyani : null)};
    animation-delay: 300ms;
    animation-duration: 1400ms;
    font-size: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    text-shadow: 2px 2px #000000;
  }
`;
const Copy = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-name: ${(props) => (props.copie ? copyani : null)};
  animation-delay: 300ms;
  animation-duration: 1400ms;
  font-size: 0px;
  background-color: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  text-shadow: 2px 2px #000000;
`;

const isDark = (color) => {
  const hexColor = color.replace("#", "");
  const red = parseInt(hexColor.substring(0, 2), 16);
  const green = parseInt(hexColor.substring(2, 4), 16);
  const blue = parseInt(hexColor.substring(4, 6), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return brightness < 128;
};
