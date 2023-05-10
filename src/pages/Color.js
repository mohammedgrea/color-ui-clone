import React, { useState } from "react";
import { keyframes, styled } from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
export default function Color({ color, id = null }) {
  // const [copie, setCopie] = useState(false);
  const [c, setc] = useState(false);
  function copie() {
    setc(true);
    setTimeout(() => {
      setc(false);
    }, 5000);
  }

  return (
    <CopyToClipboard
      text={color.color}
      // onCopy={() => setCopie({ copied: true })}
    >
      <ColorBlock color={color} onClick={copie}>
        {id && (
          <>
            <CopieButton>Copy</CopieButton>
            <MoreColors>more</MoreColors>
            <ColorName>{color.name}</ColorName>
            <Test c={c} color={color}>
              <Copy c={c}>Copy</Copy>
            </Test>
          </>
          //    <CopyToClipboard>
          //   <CopieButton>Copy</CopieButton>
          //   <ColorName>more</ColorName>
          // </CopyToClipboard>
        )}
      </ColorBlock>
    </CopyToClipboard>
  );
}

const CopieButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  text-transform: uppercase;
  /* color: white; */

  color: hsl(0, 0%, var(--switch));
  font-family: "Barlow";
  font-weight: 600;
  font-size: 19px;
  border: none;
  border-radius: 4px;
  padding: 5px 20px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  opacity: 0;
`;

const ColorBlock = styled.div`
  background-color: ${(props) => props.color.color};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
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
  text-transform: uppercase;
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
`;

const ani = keyframes`
0%{

     height:0px;
    width:0px;
}
10%{
     height:100vh;
    width:100vw;

}
90%{
     height:100vh;
    width:100vw;

}
100%{
     height:0px;
    width:0px;
}
`;
const copyani = keyframes`
0%{
    font-size:0px;
    background-color:transparent;
    width:0;
    padding:0px;
}
10%{
 font-size:30px;
    background-color:white;
    width:100%;
    padding:50px;
}
90%{
      font-size:30px;
    background-color:white;
    width:100%;
    padding:50px;
}
100%{
    font-size:0px;
    background-color:transparent;
    width:0;
    padding:0px;
}
`;
const Test = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.color.color};
  animation-name: ${(props) => (props.c ? ani : null)};
  animation-duration: 5000ms;
  /* animation-iteration-count: infinite; */
`;
const Copy = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-name: ${(props) => (props.c ? copyani : null)};
  animation-delay: 300ms;
  animation-duration: 4400ms;
  /* animation-iteration-count: infinite; */
`;
