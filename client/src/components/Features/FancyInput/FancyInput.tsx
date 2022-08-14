import React from 'react';
import {
  LoginInputStyled,
  LoginInputWrapperStyled,
  LoginLabelStyled,
} from './FancyInput.style';

interface Props {
  placeholder: string;
}

export default function FancyInput({ placeholder }: Props) {
  const [value, setValue] = React.useState<String>('');
  const [focused, setFocused] = React.useState<Boolean>(false);

  return (
    <LoginInputWrapperStyled focused={focused}>
      <LoginLabelStyled>{placeholder}</LoginLabelStyled>
      <LoginInputStyled
        onFocus={() => setFocused(true)}
        onBlur={(e: any) => {
          e.target.value.length === 0 && setFocused(false);
        }}
        value={value}
        type='text'
        onChange={({ target }: any) => setValue(target.value)}
      />
    </LoginInputWrapperStyled>
  );
}
