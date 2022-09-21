import React from 'react'
import { WrapperStyled, NotificationWrapperStyled, NotificationTitleStyled, NotificationTextStyled, NotificationButtonStyled, NotificationFavoriteStyled, NotificationLinkStyled, NotificationButtonWrapperStyled } from './Notification.style'

export default function Notification({ setShow, setModal }: { setShow: Function, setModal: Function }) {
  const bgRef = React.useRef(null);

  return (
    <WrapperStyled ref={bgRef} onClick={({ target }) => target === bgRef.current && setShow(false)}>
      <NotificationWrapperStyled>
        <NotificationTitleStyled>Oznámení</NotificationTitleStyled>
        <NotificationTextStyled>
          Zdravíme Vás, jestli si přejete přidat produkt do svých
          <NotificationFavoriteStyled> oblíbených</NotificationFavoriteStyled>,
          musíte se nejdřív přihlasit, či registrovat.
        </NotificationTextStyled>
        <NotificationButtonWrapperStyled>
          <NotificationLinkStyled onClick={() => {
              setModal('register');
              setShow(false);
            }}>
            Ještě nemáte účet?
          </NotificationLinkStyled>
          <NotificationButtonStyled
            onClick={() => {
              setModal('login');
              setShow(false);
            }}>
            přihlásit se
          </NotificationButtonStyled>
        </NotificationButtonWrapperStyled>
      </NotificationWrapperStyled>
    </WrapperStyled>
  )
}
