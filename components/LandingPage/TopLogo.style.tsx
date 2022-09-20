import styled from 'styled-components';

export const WrapperStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const LogoWrapperStyled = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
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

export const LogoLineStyled = styled.div`
  position: relative;
  background-color: white;
  border-radius: 4px;
  height: 4px;
  width: 60px;

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    height: 5px;
    width: 60px;
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
  cursor: pointer;

  &:hover {
    ${LogoCircleStyled}::before {
      background-color: transparent;
    }

    ${LogoLineStyled}::before {
      background-color: transparent;
    }
  }
`;

export const LogoHorizontalWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const LogoTextWrapperStyled = styled.div`
  text-align: center;
`;

export const LogoTextStyled = styled.span`
  font-family: 'Raleway';
  font-size: 36px;
  color: white;

  font-weight: 200;
`;

export const LogoBoldTextStyled = styled.span`
  font-family: 'Raleway', sans-serif;
  font-size: 36px;
  color: white;

  font-weight: 700;
`;
