import React from 'react'
import SupportSvg from '../SVG/SupportSvg'
import { NotificationNumberStyled, NotificationNumberWrapperStyled, WrapperStyled } from './Support.style'

export default function Support() {
  return (
    <WrapperStyled>
      <NotificationNumberWrapperStyled>
        <NotificationNumberStyled>2</NotificationNumberStyled>
      </NotificationNumberWrapperStyled>
      <SupportSvg />
    </WrapperStyled>
  )
}
