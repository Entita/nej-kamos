import styled from 'styled-components';

export const WrapperStyled = styled.div`
  position: absolute;
  left: -20rem;
  top: -5rem;
  display: flex;
  justify-content: center;
`;

export const LogoWrapperStyled = styled.div`
  position: absolute;
  top: 8rem;
  left: calc(50% + 4rem);
  transform: translateX(-50%);
  z-index: 1;
`;

export const LogoCircleStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 192px;
  height: 192px;
  border-radius: 50%;
  padding-top: 7.5%;
  cursor: pointer;

  &:hover {
    &::before {
      background-color: transparent;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 192px;
    height: 192px;
    border-radius: 50%;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.3);
    transition: background-color .3s ease;
    filter: blur(2px);
  }
`;

export const LogoVerticalWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LogoHorizontalWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
