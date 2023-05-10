import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import SeedColor from "../SeedColor";
export default function Modal({
  isCreateFolderAppeared,
  showCreateFolderModal,
}) {
  const [stateFolder, setStateFolder] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [checkDoublicateName, setcheCkDoublicateName] = useState(false);
  const [PaletteName, setPaletteName] = useState("");
  const inputRef = useRef();
  let colors = JSON.parse(localStorage.getItem("couleur")) || [];

  function hideModal(e) {
    if (!inputRef.current?.contains(e.target)) {
      showCreateFolderModal();
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", hideModal);
  });
  useEffect(() => {
    setStateFolder(isCreateFolderAppeared);
  }, [isCreateFolderAppeared]);

  function save() {
    if (
      !SeedColor.find((palette) => palette.id === PaletteName) &&
      PaletteName !== " "
    ) {
      setcheCkDoublicateName(
        (checkDoublicateName) => (checkDoublicateName = true)
      );
    } else setError(true);
  }
  useEffect(() => {
    if (!checkDoublicateName) return;
    SeedColor.push({
      paletteName: PaletteName,
      id: PaletteName,
      emoji: "🤙",
      colors: colors,
    });
    localStorage.removeItem("couleur");
    // localStorage.clear();
    localStorage.setItem("seedColor", JSON.stringify(SeedColor));
    showCreateFolderModal();
    setDone(true);
    setError(false);
  }, [checkDoublicateName]);
  return (
    <NewFolderContainer stateFolder={stateFolder}>
      <InputContainer ref={inputRef}>
        <FolderTitle>new folder</FolderTitle>
        <Input
          error={error}
          type="txt"
          value={PaletteName}
          placeholder="Untitled Name"
          onChange={({ target }) => setPaletteName(target.value)}
        />
        {error && <p>You already have this name or empty </p>}
        <Btns>
          <Cancel type="button" onClick={showCreateFolderModal}>
            cancel
          </Cancel>
          <FolderCreate onClick={save}>create</FolderCreate>
        </Btns>
      </InputContainer>
      {done && <Navigate to="/" />}
    </NewFolderContainer>
  );
}

const NewFolderContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0px;
  top: 0px;
  background-color: #000000cf;
  display: ${(props) => (props.stateFolder ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const InputContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  > p {
    color: red;
  }
`;
const Input = styled.input`
  width: 300px;
  height: 40px;
  font-size: 15px;
  padding-left: 15px;
  border-radius: 8px;
  margin-bottom: ${(props) => (props.error ? "10px" : "30px")};
  border: 1px solid black;
`;
const FolderTitle = styled.h3`
  font-weight: normal;
  text-transform: capitalize;
  margin-bottom: 20px;
`;
const Btns = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const FolderCreate = styled.button`
  cursor: pointer;
  border: none;
  font-size: 16px;
  background-color: transparent;
  text-transform: capitalize;
  color: black;
  margin-left: 20px;
  transition: 0.2s;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background-color: red;
  }
`;
const Cancel = styled.button`
  cursor: pointer;
  border: none;
  font-size: 15px;
  background-color: transparent;
  text-transform: capitalize;
  margin-left: 10px;
  padding: 10px;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    background-color: red;
  }
`;
