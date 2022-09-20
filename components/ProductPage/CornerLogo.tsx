import Router from 'next/router';
import React from 'react';
import { Color } from '../../utils/colors';
import MainLogoSvg from '../SVG/MainLogoSvg';
import MainPolySvg from '../SVG/MainPolySvg';
import {
  LogoCircleStyled,
  LogoHorizontalWrapperStyled,
  LogoVerticalWrapperStyled,
  LogoWrapperStyled,
  WrapperStyled,
} from './CornerLogo.style';

export default function CornerLogo() {
  return (
    <WrapperStyled>
      <MainPolySvg color={Color.mainYellow} />
      <LogoWrapperStyled>
        <LogoVerticalWrapperStyled>
          <LogoHorizontalWrapperStyled>
            <LogoCircleStyled onClick={() => Router.push('/')}>
              <MainLogoSvg color={Color.mainYellow} />
            </LogoCircleStyled>
          </LogoHorizontalWrapperStyled>
        </LogoVerticalWrapperStyled>
      </LogoWrapperStyled>
    </WrapperStyled>
  );
}
