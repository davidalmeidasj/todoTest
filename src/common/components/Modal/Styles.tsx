import styled from "styled-components";

export const Box = styled.div`
  display: grid;
  text-align: center;
  border-radius: 25px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 15em;
  padding: 2.5em;
  overflow-y: auto;
  color: #333;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  z-index: 101;
  width: 30vw;
  height: 60vh;
`;


export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.25);
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

