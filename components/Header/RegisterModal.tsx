import React from 'react'
import FancyInput from '../FancyInput/FancyInput'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
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

export default function RegisterModal({ setModal }: { setModal: Function }) {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const bgRef = React.useRef(null);

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
          <ModalButtonStyled><DoneRoundedIcon /></ModalButtonStyled>
        </ModalControlsWrapperStyled>
      </ModalWrapperStyled>
    </WrapperStyled>
  )
}
