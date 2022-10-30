import styled from "styled-components";
import { Color } from "../../utils/colors";

export const WrapperStyled = styled.div`
  
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FieldTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const FieldContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InputStyled = styled.input`
  border: unset;
  padding: 4px 8px;
  border-radius: 6px;
  background-color: ${Color.lightGray};
  width: 100%;
  letter-spacing: 1px;
  color: ${Color.darkGray};
`;

export const LabelStyled = styled.label`
  position: absolute;
  left: 0;
  top: -11px;
  font-size: 12px;
  font-weight: bold;
`;

export const LabelWrapperStyled = styled.div`
  position: relative;
  margin-top: 6px;
  margin-left: 16px;
`;

export const NotificationSelectStyled = styled.select`
  
`;

export const NotificationOptionStyled = styled.option`
  
`;
