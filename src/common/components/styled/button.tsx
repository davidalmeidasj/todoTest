import styled from "styled-components";

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background: none;
  width: 30px;

  &:hover {
    cursor: pointer;
  }
`;

export const Button = styled.button`
  font-size: 15px;
  color: #fff;
  padding: 0.5rem 0.8rem;
  margin-top: 1rem;
  margin-right: 1rem;
  background: ${(props: {background?: string}) => {
    const {background = '#3bb75e'} = props;
    return background
  }};
  border: none;
  border-radius: 4px;
  text-transform: capitalize;
  cursor: pointer;
`;
