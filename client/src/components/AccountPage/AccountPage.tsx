import React from 'react'
import { useSelector } from 'react-redux';
import NotAuthorized from '../NotAuthorizedPage/NotAuthorized';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import {
  AccountInputStyled,
  AccountLeftStyled,
  AccountOptionStyled,
  AccountRightStyled,
  AccountRoleStyled,
  AccountSelectStyled,
  AccountTableStyled,
  AccountTitleStyled,
  AccountTransactionStyled,
  AccountWrapperStyled,
  EditModeStyled,
  EditStyled,
  WrapperStyled,
} from './AccountPage.style';import AccountVerify from './AccountVerify';
import { asyncAccountUpdate } from '../../redux/account';
import { isPasswordValid, isUsernameInUse } from '../../utils/validators';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AccountPage() {
  const account = useSelector((state: any) => state.account.account);

  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [firstname, setFirstname] = React.useState<string>(account?.firstname);
  const [surname, setSurname] = React.useState<string>(account?.surname);
  const [username, setUsername] = React.useState<string>(account?.username);
  const [password, setPassword] = React.useState<string>(account?.password);
  const [phone, setPhone] = React.useState<Number>(account?.phone);
  const [notificationNews, setNotificationsNews] = React.useState<boolean>(account?.notifications.news);
  const [notificationMarketing, setNotificationsMarketing] = React.useState<boolean>(account?.notifications.marketing);
  const [addressCity, setAddressCity] = React.useState<string>(account?.address?.city);
  const [addressStreet, setAddressStreet] = React.useState<string>(account?.address?.street);
  const [addressStreetNumber, setAddressStreetNumber] = React.useState<Number>(account?.address?.streetNumber);
  const [addressZip, setAddressZip] = React.useState<Number>(account?.address?.zip);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setDefault = () => {
    setFirstname(account?.firstname);
    setSurname(account?.surname);
    setUsername(account?.username);
    setPassword(account?.password);
    setPhone(account?.phone);
    setNotificationsNews(account?.notifications.news);
    setNotificationsMarketing(account?.notifications.marketing);
    setAddressCity(account?.address?.city);
    setAddressStreet(account?.address?.street);
    setAddressStreetNumber(account?.address?.streetNumber);
    setAddressZip(account?.address?.zip);
    setEditMode(false);
  }

  const updateAccount = async () => {
    if ((username !== account.username && await isUsernameInUse(username)) || !isPasswordValid(password)) return;

    const updateAddress = addressCity && addressStreet && addressStreetNumber && addressZip;
    await asyncAccountUpdate(dispatch, {
      firstname,
      surname,
      username,
      password,
      phone: phone || null,
      notifications: {
        news: notificationNews,
        marketing: notificationMarketing,
      },
      address: updateAddress ? {
        city: addressCity,
        street: addressStreet,
        streetNumber: addressStreetNumber,
        zip: addressZip,
      } : null,
    }).then(() => setEditMode(false));
  };

  if (!account) return <NotAuthorized />

  return (
    <WrapperStyled>
      {!account.verified && <AccountVerify initEmailSentAt={account.emailSentAt} />}
      <AccountTitleStyled>Account details</AccountTitleStyled>
      <AccountWrapperStyled>
        <AccountTableStyled>
          <AccountLeftStyled>firstname:</AccountLeftStyled>
          <AccountRightStyled>
            <AccountInputStyled onChange={({ target }) => setFirstname(target.value)} value={String(editMode ? firstname || '' : firstname || 'neuloženo')} readonly={!editMode} />
          </AccountRightStyled>
          <AccountLeftStyled>surname:</AccountLeftStyled>
          <AccountRightStyled>
            <AccountInputStyled onChange={({ target }) => setSurname(target.value)} value={String(editMode ? surname || '' : surname || 'neuloženo')} readonly={!editMode} />
          </AccountRightStyled>
          <AccountLeftStyled>username:</AccountLeftStyled>
          <AccountRightStyled>
            <AccountInputStyled onChange={({ target }) => setUsername(target.value)} value={username} readonly={!editMode} />
          </AccountRightStyled>
          <AccountLeftStyled>password:</AccountLeftStyled>
          <AccountRightStyled>
            <AccountInputStyled onChange={({ target }) => setPassword(target.value)} value={password} readonly={!editMode} />
          </AccountRightStyled>
          <AccountLeftStyled>phone:</AccountLeftStyled>
          <AccountRightStyled>
            <AccountInputStyled onChange={({ target }) => setPhone(Number(target.value))} value={String(editMode ? phone || '' : phone || 'žádný')} readonly={!editMode} />
          </AccountRightStyled>
          <AccountLeftStyled>email:</AccountLeftStyled>
          <AccountRightStyled>{account.email}</AccountRightStyled>
          <AccountLeftStyled>verified:</AccountLeftStyled>
          <AccountRightStyled>{String(account.verified)}</AccountRightStyled>
          <AccountLeftStyled>roles:</AccountLeftStyled>
          <AccountRightStyled>
            {account.roles.map((role: string, index: number) => 
              <AccountRoleStyled key={index}>{role}</AccountRoleStyled>
            )}
          </AccountRightStyled>
          <AccountLeftStyled>transactionIds</AccountLeftStyled>
          <AccountRightStyled>
            {account.transactionIds.length === 0 && 'žádné'}
            {[...account.transactionIds].reverse().map((transaction: string, index: number) => 
              <AccountTransactionStyled key={index} onClick={() => navigate(`/order/${transaction}`)}>{transaction}</AccountTransactionStyled>
            )}
          </AccountRightStyled>
          <AccountLeftStyled>notifications</AccountLeftStyled>
          <AccountRightStyled>
            <AccountTableStyled>
              <AccountLeftStyled>news:</AccountLeftStyled>
              <AccountRightStyled>
                {editMode
                ?
                <AccountSelectStyled onChange={({ target }) => setNotificationsNews(target.value === 'true')} value={String(notificationNews)}>
                  <AccountOptionStyled value={String(notificationNews)}>{String(notificationNews)}</AccountOptionStyled>
                  <AccountOptionStyled value={String(!notificationNews)}>{String(!notificationNews)}</AccountOptionStyled>
                </AccountSelectStyled>
                :
                <AccountRightStyled>{String(notificationNews)}</AccountRightStyled>}
              </AccountRightStyled>
              <AccountLeftStyled>marketing:</AccountLeftStyled>
              <AccountLeftStyled>
                {editMode
                ?
                  <AccountSelectStyled onChange={({ target }) => setNotificationsMarketing(target.value === 'true')} value={String(notificationMarketing)}>
                    <AccountOptionStyled>{String(notificationMarketing)}</AccountOptionStyled>
                    <AccountOptionStyled>{String(!notificationMarketing)}</AccountOptionStyled>
                  </AccountSelectStyled>
                :
                <AccountRightStyled>{String(notificationMarketing)}</AccountRightStyled>}
              </AccountLeftStyled>
            </AccountTableStyled>
          </AccountRightStyled>
          <AccountLeftStyled>address</AccountLeftStyled>
          <AccountRightStyled>{account.address || editMode
            ?
              <AccountTableStyled>
                <AccountLeftStyled>city:</AccountLeftStyled>
                <AccountRightStyled>
                  <AccountInputStyled onChange={({ target }) => setAddressCity(target.value)} value={addressCity || ''} readonly={!editMode} />
                </AccountRightStyled>
                <AccountLeftStyled>street:</AccountLeftStyled>
                <AccountRightStyled>
                  <AccountInputStyled onChange={({ target }) => setAddressStreet(target.value)} value={addressStreet || ''} readonly={!editMode} />
                </AccountRightStyled>
                <AccountLeftStyled>streetNumber:</AccountLeftStyled>
                <AccountRightStyled>
                  <AccountInputStyled onChange={({ target }) => setAddressStreetNumber(Number(target.value))} value={String(addressStreetNumber || '')} readonly={!editMode} />
                </AccountRightStyled>
                <AccountLeftStyled>zip:</AccountLeftStyled>
                <AccountRightStyled>
                  <AccountInputStyled onChange={({ target }) => setAddressZip(Number(target.value))} value={String(addressZip || '')} readonly={!editMode} />
                </AccountRightStyled>
              </AccountTableStyled>
            :
              'neuložena'
          }</AccountRightStyled>
        </AccountTableStyled>
        {editMode
          ?
            <EditModeStyled>
              <EditStyled onClick={updateAccount}>
                <DoneIcon color='success' />
              </EditStyled>
              <EditStyled onClick={setDefault}>
                <CloseIcon color='error' />
              </EditStyled>
            </EditModeStyled>
          : <EditStyled onClick={() => setEditMode(true)} >
              <EditIcon />
            </EditStyled>}
      </AccountWrapperStyled>
    </WrapperStyled>
  )
}
