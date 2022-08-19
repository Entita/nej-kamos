import React from 'react';
import {
  LoginInputStyled,
  LoginInputWrapperStyled,
  LoginLabelStyled,
} from './FancyInput.style';

interface Props {
  placeholder: string;
  defaultValue?: string;
  size?: 'small' | 'medium' | 'large';
  validation?: Function;
}

export default function FancyInput({ placeholder, defaultValue, size = 'small', validation = () => true }: Props) {
  const [value, setValue] = React.useState<String | Number>(defaultValue || '');
  const [focused, setFocused] = React.useState<Boolean>(!!defaultValue);

  return (
    <LoginInputWrapperStyled focused={focused} size={size}>
      <LoginLabelStyled>{placeholder}</LoginLabelStyled>
      <LoginInputStyled
        onFocus={() => setFocused(true)}
        onBlur={(e: any) => {
          e.target.value.length === 0 && setFocused(false);
        }}
        value={value}
        type='text'
        onChange={({ target }: any) => validation(target.value) && setValue(target.value)}
      />
    </LoginInputWrapperStyled>
  );
}
