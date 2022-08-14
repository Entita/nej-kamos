import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { VerifyButtonStyled, VerifyTitleStyled, WrapperStyled } from './AccountVerify.style'
import { Icons, toast } from 'react-toastify';
import { resendAccountVerification } from '../../redux/account';
import { useDispatch } from 'react-redux';

export default function AccountVerify({ initEmailSentAt } : { initEmailSentAt: Date }) {
  const [emailSentAt, setEmailSentAt] = React.useState<Date>(initEmailSentAt);
  const [reSendButtonText, setReSendButtonText] = React.useState<string>('Re-send email');
  const [isReSendButtonDisabled, setIsReSendButtonDisabled] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const timeleft = 300 // in seconds
  const startTimer = () => {
    const date1 = new Date(emailSentAt).getTime();
    const date2 = new Date().getTime();
    const diffTime = ~~(Math.abs(date1 - date2) / 1000);

    const distance = timeleft - diffTime;

    const minutes = Math.floor(distance / 60);
    const seconds = Math.floor(distance % 60);

    if (distance >= 0) {
      setIsReSendButtonDisabled(true);
      setReSendButtonText(`${minutes}m ${seconds > 9 ? seconds : '0' + seconds}s`);
    } else {
      setIsReSendButtonDisabled(false);
      setReSendButtonText('Přeposlat ověření');
    }
  }
  
  React.useEffect(() => {
    startTimer();

    let interval = setInterval(() => {
      startTimer();
    }, 1000)

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailSentAt]);

  const sendVerification = async () => {
    toast.info(`Sending verification email ...`, {
      position: 'top-right',
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
      icon: Icons.spinner,
      toastId: 'agentPromise',
    });
    await resendAccountVerification(dispatch)
      .then((data) => setEmailSentAt(data.emailSentAt));
  }

  return (
    <WrapperStyled>
      <VerifyTitleStyled>Váš účet není oveřený.</VerifyTitleStyled>
      <VerifyButtonStyled onClick={sendVerification} disabled={isReSendButtonDisabled}>
        {reSendButtonText}{!isReSendButtonDisabled && <SendIcon />}
      </VerifyButtonStyled>
    </WrapperStyled>
  )
}
