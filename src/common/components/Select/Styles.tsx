import styled, {css} from 'styled-components'

export const Wrapper = styled.div`
  margin-top: 10px;
  position: relative;
  border-radius: 4px;
  width: 100%;
  user-select: none;
  cursor: pointer;
`

export const ArrowIcon = styled.div`
  transition: transform 0.15s ease-out;
  transform: ${(props: {isOpen: boolean}) => (props.isOpen ? css`scale(-1)` : css`rotate(1)`)};
`

export const SelectedOption = styled.div`
  white-space: nowrap;
  ${(props: {isOption: boolean}) =>
      props.isOption &&
      css`
      color: black;
    `}
  overflow: hidden;
`

export const OptionsWrapper = styled.div`
  position: absolute;
  background-color: white;
  top: 110%;
  left: 0;
  width: 100%;
  opacity: 0;
  max-height: 0;
  ${(props: {isOpen: boolean, optionsHeight: number}) =>
          props.isOpen &&
    css`
      max-height: ${props.optionsHeight}px;
      opacity: 1;
    `}
  box-shadow: 0 14px 28px rgba(0,0,0,0.15), 0 5px 5px rgba(0,0,0,0.12);
  border-radius: 4px;
  transition: max-height 0.15s ease-out, opacity 0.15s ease-out;
`

export const PreviewBox = styled.div`
  display: flex;
  flex-flow: row-reverse nowrap;
  justify-content: space-between;
  color: #d9d9d9;
  border: 1px solid #d9d9d9;
  padding: 10px;
  transition: transform 0.05s ease-in-out;
  :active {
    transform: scale(0.98);
  }
`

export const Option = styled.div`
  position: relative;
  padding: 5px;
  transition: background-color 0.15s ease-out;
  text-align: left;
  cursor: pointer;
  :hover::before {
    transform: scaleY(1);
  }
  :hover {
    background-color: #48befc80;
  }
`
