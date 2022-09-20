import styled from 'styled-components';
import { Color } from '../../utils/colors';

export const WrapperStyled = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: 3rem calc(100% - 8rem) 5rem;
  right: 0;
  bottom: 4rem;
  width: 18rem;
  height: 26rem;
  border-radius: 32px;
  background-color: white;
  box-shadow: 1px 2px 7px -2px black;
  padding: 1rem 2rem;
  z-index: 11;
`;

export const SupportHeaderStyled = styled.div`
  position: relative;
  border-radius: 32px 32px 0 0;
  display: flex;
  gap: 6px;
`;

export const SupportHeaderTitleStyled = styled.span``;

export const SupportHeaderTitleBoldStyled = styled(SupportHeaderTitleStyled)`
  font-weight: bold;
`;

export const SupportHeaderCloseStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  cursor: pointer;
`;

export const SupportBodyStyled = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-right: -1rem;
  padding-right: 8px;
  overflow-y: scroll;
  gap: 8px;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    width: 8px;
    background-color: ${Color.gray};
    border-radius: 6px;
  }
`;

export const SupportFooterStyled = styled.div`
  border-radius: 0 0 32px 32px;
`;

export const SupportFooterWrapperStyled = styled.div`
  background-color: ${Color.lightGray};
  margin-top: 2rem;
  width: 100%;
  height: calc(100% - 2rem);
  display: flex;
  border-radius: 12px;
`;

export const SupportFooterInputStyled = styled.input`
  background-color: transparent;
  border-radius: 12px 0 0 12px;
  padding: 8px 12px;
  width: calc(100% - 4rem);
  height: 100%;
  border: unset;
`;

export const SupportFooterInputButtonStyled = styled.button`
  background-color: transparent;
  border-radius: 0 12px 12px 0;
  width: 4rem;
  height: 100%;
  border: unset;

  &:hover {
    background-color: ${Color.gray};
    filter: brightness(0.5);
  }
`;

export const SupportOnlineButtonStyled = styled.div`
  position: relative;
  top: 4px;
  left: 2px;
  width: 10px;
  height: 10px;
  background-color: ${Color.lightGreen};
  border-radius: 50%;
`;

export const SupportMessageNameStyled = styled.span`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  user-select: text;
`;

export const SupportMessageStyled = styled.span`
  font-family: 'Raleway';
  font-style: normal;
  font-size: 14px;
  user-select: text;
`;

export const SupportMessageWrapperStyled = styled.div<{ support: Boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: ${({ support }) => (support ? 'left' : 'right')};

  ${SupportMessageNameStyled} {
    color: ${({ support }) => (support ? Color.mainYellow : Color.gray)};
  }
`;
