import React from 'react'
import { Icons } from 'react-toastify';
import FancyInput from '../FancyInput/FancyInput'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import {
  LoadingStyled,
  ModalButtonStyled,
  ModalControlsWrapperStyled,
  ModalInputWrapperStyled,
  ModalLinkStyled,
  ModalLinkWrapperStyled,
  ModalTitleStyled,
  ModalWrapperStyled,
  WrapperStyled,
} from './Modal.style';
import { asyncLoginAccount } from '../../redux/account';
import { useDispatch } from 'react-redux';
import { Basket } from '../../models/client/Basket';
import CartReplace from './CartReplace';

export default function LoginModal({ setModal }: { setModal: Function }) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [cartReplaceData, setCartReplaceData] = React.useState<{ accountId: string, accountBasket: Basket, cookieBasket: Basket } | null>();
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const bgRef = React.useRef(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const handleKeys = (e: any) => {
      if (e.key === 'Enter') login();
    }

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [username, password]);

  const login = async () => {
    if (username.length === 0 || password.length === 0) return;
    
    setLoading(true);
    await asyncLoginAccount(dispatch, { username, password })
      .then((data) => {
        if (data) {
          setCartReplaceData(data);
          setUsername('');
          setPassword('');
        } else {
          setModal('');
        }
      })
      .finally(() => setLoading(false));
  }

  if (cartReplaceData)
    return (
      <CartReplace
        setModal={setModal}
        setCartReplaceData={setCartReplaceData}
        accountId={cartReplaceData.accountId}
        accountBasket={cartReplaceData.accountBasket}
        cookieBasket={cartReplaceData.cookieBasket}
      />
    )

  return (
    <WrapperStyled ref={bgRef} onClick={({ target }) => target === bgRef.current && !loading && setModal('')}>
      <ModalWrapperStyled>
        {loading && (
          <LoadingStyled>
            {Icons.spinner()}
          </LoadingStyled>
        )}
        <ModalTitleStyled>přihlášení</ModalTitleStyled>
        <ModalInputWrapperStyled>
          <FancyInput value={username} setValue={setUsername} placeholder='jméno' size='large' />
          <FancyInput value={password} setValue={setPassword} placeholder='heslo' size='large' />
        </ModalInputWrapperStyled>
        <ModalControlsWrapperStyled>
          <ModalLinkWrapperStyled>
            <ModalLinkStyled onClick={() => setModal('register')}>nemáš účet ?</ModalLinkStyled>
            <ModalLinkStyled onClick={() => setModal('forgotten_password')}>zapomněl si heslo ?</ModalLinkStyled>
          </ModalLinkWrapperStyled>
          <ModalButtonStyled onClick={login}><DoneRoundedIcon /></ModalButtonStyled>
        </ModalControlsWrapperStyled>
      </ModalWrapperStyled>
    </WrapperStyled>
  )
}
