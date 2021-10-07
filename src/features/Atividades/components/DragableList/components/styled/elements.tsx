import styled from "styled-components";

interface WrapperProps {
  width?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 0.5rem;
  box-shadow: 1px 2px 3px ${({ theme }) => theme.colors.secondary};
  margin: 1rem;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* min-width: 30rem; */
  min-width: ${({ width }) => (width ? width : "355px")};
`;

export const Title = styled.h3`
  font-size: 35px;
`;

interface TaskListProps {
  isDraggingOver?: boolean;
  isFlex?: boolean;
}
export const TaskList = styled.ul<TaskListProps>`
  min-height: 45vh;
`;
