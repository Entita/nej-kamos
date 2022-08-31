import React from 'react';
import { Color } from '../../utils/colors';
import MainLogoSvg from '../SVG/MainLogoSvg';
import MainPolySvg from '../SVG/MainPolySvg';
import {
  LogoBoldTextStyled,
  LogoCircleStyled,
  LogoHorizontalWrapperStyled,
  LogoLineStyled,
  LogoTextStyled,
  LogoTextWrapperStyled,
  LogoVerticalWrapperStyled,
  LogoWrapperStyled,
  WrapperStyled,
} from './TopSection.style';

export default function TopSection() {
  return (
    <WrapperStyled>
      <MainPolySvg color={Color.mainYellow} />
      <LogoWrapperStyled>
        <LogoVerticalWrapperStyled>
          <LogoHorizontalWrapperStyled>
            <LogoLineStyled />
            <LogoCircleStyled>
              <MainLogoSvg color={Color.mainYellow} />
            </LogoCircleStyled>
            <LogoLineStyled />
          </LogoHorizontalWrapperStyled>
          <LogoTextWrapperStyled>
            <LogoBoldTextStyled>Nej</LogoBoldTextStyled>
            <LogoTextStyled>Kámoš</LogoTextStyled>
          </LogoTextWrapperStyled>
        </LogoVerticalWrapperStyled>
      </LogoWrapperStyled>
    </WrapperStyled>
  );
}
