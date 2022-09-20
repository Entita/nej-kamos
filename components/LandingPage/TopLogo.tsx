import Router from 'next/router';
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
} from './TopLogo.style';

export default function TopLogo() {
  return (
    <WrapperStyled>
      <MainPolySvg color={Color.mainYellow} />
      <LogoWrapperStyled>
        <LogoVerticalWrapperStyled onClick={() => Router.push('/')}>
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
