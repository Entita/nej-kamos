import React from 'react'
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
import agent from '../../utils/agent';
import { Icons } from 'react-toastify';

export default function ForgottenPasswordModal({ setModal }: { setModal: Function }) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const bgRef = React.useRef(null);

  React.useEffect(() => {
    const handleKeys = (e: any) => {
      if (e.key === 'Enter') resetPassword();
    }

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [email]);

  const resetPassword = async () => {
    if (email.length === 0) return;
    
    setLoading(true);
    await agent.Account.resetPassword(email)
      .then((data) => {
        if (!data.failed) console.log('Y');
      })
      .finally(() => setLoading(false));
  }

  return (
    <WrapperStyled ref={bgRef} onClick={({ target }) => target === bgRef.current && !loading && setModal('')}>
      <ModalWrapperStyled>
        {loading && (
          <LoadingStyled>
            {Icons.spinner()}
          </LoadingStyled>
        )}
        <ModalTitleStyled>zapomenuté heslo</ModalTitleStyled>
        <ModalInputWrapperStyled>
          <FancyInput value={email} setValue={setEmail} placeholder='email' size='large' />
        </ModalInputWrapperStyled>
        <ModalControlsWrapperStyled>
          <ModalLinkWrapperStyled>
            <ModalLinkStyled onClick={() => setModal('login')}>již máš účet?</ModalLinkStyled>
            <ModalLinkStyled onClick={() => setModal('register')}>nemáš účet ?</ModalLinkStyled>
          </ModalLinkWrapperStyled>
          <ModalButtonStyled onClick={resetPassword}><DoneRoundedIcon /></ModalButtonStyled>
        </ModalControlsWrapperStyled>
      </ModalWrapperStyled>
    </WrapperStyled>
  )
}
