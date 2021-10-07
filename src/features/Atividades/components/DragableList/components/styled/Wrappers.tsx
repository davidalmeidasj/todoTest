import styled from "styled-components";

export const AppWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const Grid = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
export const Label = styled.span`
    font-size: 35px;
    padding: 25px;
  `;

export const Container = styled.div`
  border-radius: 0.5rem;
  box-shadow: 1px 2px 3px ${({ theme }) => theme.colors.secondary};
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* min-width: 30rem; */
`;