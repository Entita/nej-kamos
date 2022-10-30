import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccount } from '../../redux/account';
import { FieldContent, FieldTitle, FieldWrapper, InputStyled, LabelStyled, LabelWrapperStyled, NotificationOptionStyled, NotificationSelectStyled, WrapperStyled } from './AccountEdit.style'

export default function AccountEdit () {
  const account = useSelector(selectAccount);
  const [firstName, setFirstName] = React.useState<string>(account.firstname || '');
  const [surname, setSurname] = React.useState<string>(account.surname || '');
  const [phone, setPhone] = React.useState(account.phone || null);
  const [email, setEmail] = React.useState(account.email);
  const [notificationNews, setNotificationNews] = React.useState<boolean>(account.notifications.news);
  const [notificationMarketing, setNotificationMarketing] = React.useState<boolean>(account.notifications.marketing);
  const [addressCity, setAddressCity] = React.useState<string>(account.address?.city || '');
  const [addressStreet, setAddressStreet] = React.useState<string>(account.address?.street || '');
  const [addressStreetNumber, setAddressStreetNumber] = React.useState<number | null>(account.address?.streetNumber || null);
  const [addressZip, setAddressZip] = React.useState<number | null>(account.address?.zip || null);

  return (
    <WrapperStyled>
      <FieldWrapper>
        <FieldTitle>Jméno</FieldTitle>
        <FieldContent>
          <InputStyled placeholder={firstName || 'Nezadáno'} value={firstName} onChange={({ target }) => setFirstName(target.value)} />
        </FieldContent>
      </FieldWrapper>
      <FieldWrapper>
        <FieldTitle>Příjmení</FieldTitle>
        <FieldContent>
          <InputStyled placeholder={surname || 'Nezadáno'} value={surname} onChange={({ target }) => setSurname(target.value)} />
        </FieldContent>
      </FieldWrapper>
      <FieldWrapper>
        <FieldTitle>Telefon</FieldTitle>
        <FieldContent>
          <InputStyled placeholder={phone || 'Nezadáno'} value={phone} onChange={({ target }) => setPhone(target.value)} />
        </FieldContent>
      </FieldWrapper>
      <FieldWrapper>
        <FieldTitle>Email</FieldTitle>
        <FieldContent>
          <InputStyled placeholder={email} value={email} onChange={({ target }) => setEmail(target.value)} />
        </FieldContent>
      </FieldWrapper>
      <FieldWrapper>
        <FieldTitle>Adresa</FieldTitle>
        <FieldContent>
          <LabelWrapperStyled>
            <LabelStyled>Město</LabelStyled>
            <InputStyled placeholder={account.address?.city || 'Nezadáno'} value={addressCity} onChange={({ target }) => setAddressCity(target.value)} />
          </LabelWrapperStyled>
          <LabelWrapperStyled>
            <LabelStyled>Ulice</LabelStyled>
            <InputStyled placeholder={account.address?.street || 'Nezadáno'} value={addressStreet} onChange={({ target }) => setAddressStreet(target.value)} />
          </LabelWrapperStyled>
          <LabelWrapperStyled>
            <LabelStyled>Číslo domu</LabelStyled>
            <InputStyled placeholder={account.address?.streetNumber || 'Nezadáno'} value={addressStreetNumber || ''} onChange={({ target }) => Number(target.value) !== NaN && setAddressStreetNumber(Number(target.value))} />
          </LabelWrapperStyled>
          <LabelWrapperStyled>
            <LabelStyled>PSČ</LabelStyled>
            <InputStyled placeholder={account.address?.zip || 'Nezadáno'} value={addressZip || ''} onChange={({ target }) => Number(target.value) !== NaN && setAddressZip(Number(target.value))} />
          </LabelWrapperStyled>
        </FieldContent>
      </FieldWrapper>
      <FieldWrapper>
        <FieldTitle>Upozornění</FieldTitle>
        <FieldContent>
          <LabelWrapperStyled>
            <LabelStyled>novinky</LabelStyled>
            <NotificationSelectStyled onChange={({ target }) => setNotificationNews(target.value === 'true')}>
              <NotificationOptionStyled value='true' selected={notificationNews}>Ano</NotificationOptionStyled>
              <NotificationOptionStyled value='false' selected={!notificationNews}>Ne</NotificationOptionStyled>
            </NotificationSelectStyled>
          </LabelWrapperStyled>
          <LabelWrapperStyled>
            <LabelStyled>marketing</LabelStyled>
            <NotificationSelectStyled onChange={({ target }) => setNotificationMarketing(target.value === 'true')}>
              <NotificationOptionStyled value='true' selected={notificationMarketing}>Ano</NotificationOptionStyled>
              <NotificationOptionStyled value='false' selected={!notificationMarketing}>Ne</NotificationOptionStyled>
            </NotificationSelectStyled>
          </LabelWrapperStyled>
        </FieldContent>
      </FieldWrapper>
    </WrapperStyled>
  )
}
