import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SendSvg from '../SVG/SendSvg';
import {
  SupportBodyStyled,
  SupportFooterInputButtonStyled,
  SupportFooterInputStyled,
  SupportFooterStyled,
  SupportFooterWrapperStyled,
  SupportHeaderCloseStyled,
  SupportHeaderStyled,
  SupportHeaderTitleBoldStyled,
  SupportHeaderTitleStyled,
  SupportMessageNameStyled,
  SupportMessageStyled,
  SupportMessageWrapperStyled,
  SupportOnlineButtonStyled,
  WrapperStyled,
} from './SupportChat.style';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { asyncAddSupportChat, selectSupportChat } from '../../redux/support_chat';

export default function SupportChat({ setShow }: { setShow: Function }) {
  const [message, setMessage] = React.useState<string>('');
  const supportChat = useSelector(selectSupportChat);
  const support = React.useMemo(() => ({
    name: 'Martin',
    chat: supportChat
  }), [supportChat]);
  const dispatch = useDispatch();

  const sendMessage = () => {
    asyncAddSupportChat(dispatch, {
      name: 'YOU',
      createdAt: '14:99',
      text: message,
    });
    setMessage('');
  };

  return (
    <WrapperStyled>
      <SupportHeaderStyled>
        <SupportHeaderTitleStyled>Obsluhuje Vás</SupportHeaderTitleStyled>
        <SupportHeaderTitleBoldStyled>
          {support.name}
        </SupportHeaderTitleBoldStyled>
        <SupportOnlineButtonStyled />
        <SupportHeaderCloseStyled onClick={() => setShow(false)}>
          <CloseRoundedIcon />
        </SupportHeaderCloseStyled>
      </SupportHeaderStyled>
      <SupportBodyStyled>
        {support.chat.map(
          (
            message: { name: string; createdAt: Date; text: string },
            index: number,
          ) => (
            <SupportMessageWrapperStyled
              support={message.name === 'SUPPORT'}
              key={index}
            >
              <SupportMessageNameStyled>{`${message.name} (${message.createdAt})`}</SupportMessageNameStyled>
              <SupportMessageStyled>{message.text}</SupportMessageStyled>
            </SupportMessageWrapperStyled>
          ),
        )}
      </SupportBodyStyled>
      <SupportFooterStyled>
        <SupportFooterWrapperStyled>
          <SupportFooterInputStyled
            placeholder='Napište nám ...'
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
          <SupportFooterInputButtonStyled onClick={sendMessage}>
            <SendSvg />
          </SupportFooterInputButtonStyled>
        </SupportFooterWrapperStyled>
      </SupportFooterStyled>
    </WrapperStyled>
  );
}
