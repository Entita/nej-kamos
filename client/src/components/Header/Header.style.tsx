import styled from 'styled-components';

export const WrapperStyled = styled.div`
  height: 5rem;
  width: 100%;
  border-bottom: 1px solid gray;
  padding: 8px 3rem;
  background-color: lightgray;
  display: inline-grid;
  text-align: center;
  grid-template-columns: 40% 25% 35%;
  grid-template-rows: 100%;
`;

export const LogoStyled = styled.h1`
  font-family: 'Charmonman', cursive;
  font-size: 43px;
  font-weight: normal;
  cursor: pointer;
  width: fit-content;
  place-self: center;
`;

export const ActionBlockStyled = styled.div`
  display: flex;
  height: 4rem;
  justify-self: right;
  align-items: center;
  gap: 2rem;
`;

export const AccountBlockStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: filter .2s ease;
  cursor: pointer;
  
  &:hover {
    filter: opacity(.6)
  }
`;

export const AccountTitleStyled = styled.span`
  font-size: 17px;
  margin-top: -7px;
`;

export const CartBlockStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: white;
  border-radius: 6px;
  padding: 4px 12px;
  transition: filter .2s ease;
  z-index: 9;
  cursor: pointer;
  
  &:hover {
    filter: opacity(.6)
  }
`;

export const PriceStyled = styled.span`
  font-size: 22px;
  min-width: 80px;
`;

export const CartStyled = styled.div`
  position: relative;
`;

export const CartQuantityStyled = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: gray;
`;

export const CartQuantityTitleStyled = styled.span`
  display: block;
  font-size: 12px;
  line-height: 16px;
  color: white;
`;

export const LogoutButtonStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: filter .2s ease;
  cursor: pointer;

  &:hover {
    filter: opacity(.6)
  }
`;

export const LogoutTitleStyled = styled.span`
  font-size: 17px;
  margin-top: -7px;
`;
