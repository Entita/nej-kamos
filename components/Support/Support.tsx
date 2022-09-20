import React from 'react'
import SupportSvg from '../SVG/SupportSvg'
import SupportChat from './SupportChat'
import { NotificationNumberStyled, NotificationNumberWrapperStyled, SupportButtonStyled, WrapperStyled } from './Support.style'
import { useSelector, useDispatch } from 'react-redux';
import { changeShowChat, selectStates } from '../../redux/states';

export default function Support() {
  const states = useSelector(selectStates);
  const [show, setShow] = React.useState<boolean>(states.showChat);
  const dispatch = useDispatch();

  const toggleChat = (state: boolean) => {
    changeShowChat(dispatch, state);
    setShow(state);
  }

  return (
    <WrapperStyled>
      {show && <SupportChat setShow={toggleChat} />}
      <SupportButtonStyled onClick={() => toggleChat(!show)}>
        <NotificationNumberWrapperStyled>
          <NotificationNumberStyled>2</NotificationNumberStyled>
        </NotificationNumberWrapperStyled>
        <SupportSvg />
      </SupportButtonStyled>
    </WrapperStyled>
  )
}
