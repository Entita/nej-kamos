import React from 'react'
import FancyInput from '../FancyInput/FancyInput'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import {
  isEmailInUse,
  isEmailValid,
  isPasswordValid,
  isUsernameInUse,
  isUsernameValid,
} from '../../utils/validators';
import {
  ModalButtonStyled,
  ModalControlsWrapperStyled,
  ModalInputWrapperStyled,
  ModalLinkStyled,
  ModalLinkWrapperStyled,
  ModalTitleStyled,
  ModalWrapperStyled,
  WrapperStyled,
} from './Modal.style';
import { useDispatch } from 'react-redux';
import { asyncCreateAccount } from '../../redux/account';

export default function RegisterModal({ setModal }: { setModal: Function }) {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const bgRef = React.useRef(null);
  const dispatch = useDispatch();

  const register = async () => {
    // if (isUsernameValid(username) && isEmailValid(email) && isPasswordValid(password) &&
    //   await isUsernameInUse(username) && await isEmailInUse(email)) return;
    if (isUsernameValid(username) && isEmailValid(email) && isPasswordValid(password)) return;

    await asyncCreateAccount(dispatch, {
      username,
      password,
      email,
      notifications: {
        news: true,
        marketing: true,
      }
    })
      .then((data) => !data.failed && setModal(''))
  }

  return (
    <WrapperStyled ref={bgRef} onClick={({ target }) => target === bgRef.current && setModal('')}>
      <ModalWrapperStyled>
        <ModalTitleStyled>registrace</ModalTitleStyled>
        <ModalInputWrapperStyled>
          <FancyInput value={username} setValue={setUsername} placeholder='jméno' size='large' />
          <FancyInput value={password} setValue={setPassword} placeholder='heslo' size='large' />
          <FancyInput value={email} setValue={setEmail} placeholder='email' size='large' />
        </ModalInputWrapperStyled>
        <ModalControlsWrapperStyled>
          <ModalLinkWrapperStyled>
            <ModalLinkStyled onClick={() => setModal('login')}>již máš účet ?</ModalLinkStyled>
          </ModalLinkWrapperStyled>
          <ModalButtonStyled onClick={register}>
            <DoneRoundedIcon />
          </ModalButtonStyled>
        </ModalControlsWrapperStyled>
      </ModalWrapperStyled>
    </WrapperStyled>
  )
}
