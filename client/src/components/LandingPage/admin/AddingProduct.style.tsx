import styled from 'styled-components';

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InputStyled = styled.input``;
export const LabelStyled = styled.label`
  font-size: 14px;
`;
export const DatalistStyled = styled.datalist``;
export const OptionStyled = styled.option``;
export const TextareaStyled = styled.textarea`
  resize: unset;
`;

export const RowWrapperStyled = styled.div`
  display: flex;
  gap: 4px;

  & > input {
    width: 60%;
  }

  & > label {
    width: 40%;
    text-align: left;
  }
`;
