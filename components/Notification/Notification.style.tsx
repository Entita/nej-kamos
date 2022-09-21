import styled from "styled-components";
import { Color } from "../../utils/colors";

export const WrapperStyled = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(1px) brightness(.6);
  z-index: 11;
`;

export const NotificationWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 500px;
  background-color: white;
  padding: 1.2rem 2rem;
  border-radius: 18px;
`;

export const NotificationTitleStyled = styled.span`
  font-family: 'Raleway';
  font-weight: 700;
  font-size: 36px;
`;

export const NotificationTextStyled = styled.span`
  font-family: 'Raleway';
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  max-width: 320px;
  text-align: center;
`;

export const NotificationFavoriteStyled = styled.span`
  color: ${Color.orange};
`;

export const NotificationButtonWrapperStyled = styled.div`
  display: flex;
  width: 320px;
  justify-content: space-between;
`;

export const NotificationLinkStyled = styled.span`
  color: ${Color.gray};
  font-family: 'Raleway';
  font-weight: 200;
  font-size: 15px;
  height: fit-content;
  cursor: pointer;
  
  &:hover {
    filter: opacity(.5);
  }
`;

export const NotificationButtonStyled = styled.button`
  border: unset;
  background-color: ${Color.mainYellow};
  color: white;
  border-radius: 24px;
  padding: 18px 36px;
  font-family: 'Raleway';
  font-weight: 400;
  font-size: 16px;

  &:hover {
    filter: opacity(.5);
  }
`;
