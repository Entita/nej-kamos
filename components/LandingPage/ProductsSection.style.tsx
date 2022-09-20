import styled from "styled-components";
import { Color } from "../../utils/colors";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 4px;
  border-bottom: 1px solid black;
`;

export const SectionTitleStyled = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-size: 24px;
`;

export const SectionOrderWrapperStyled = styled.div`
  display: flex;
  gap: 6px;
`;

export const SectionOrderTitleStyled = styled.h1`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
`;

export const SectionOrderSelectStyled = styled.select`
  border-radius: 6px;
  padding: 6px 48px 6px 8px;
  border: unset;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.14);
  outline: unset;
  appearance: unset;
`;

export const SectionOrderOptionStyled = styled.option`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
`;

export const ProductsWrapperStyled = styled.div`
  display: flex;
  padding: 8px 0;
  gap: 1rem;
`;
