import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccount } from '../../redux/account';
import { DropdownAccountWrapper, FieldWrapper, FieldTitle, FieldContent, InputStyled, LabelWrapperStyled, LabelStyled } from './AccountInfo.style'

export default function AccountInfo() {
  const account = useSelector(selectAccount);
  
  return (
    <DropdownAccountWrapper>
          <FieldWrapper>
            <FieldTitle>Jméno</FieldTitle>
            <FieldContent>
              <InputStyled value={account.firstname || 'Nezadáno'} readOnly />
            </FieldContent>
          </FieldWrapper>
          <FieldWrapper>
            <FieldTitle>Příjmení</FieldTitle>
            <FieldContent>
              <InputStyled value={account.surname || 'Nezadáno'} readOnly />
            </FieldContent>
          </FieldWrapper>
          <FieldWrapper>
            <FieldTitle>Přezdívka</FieldTitle>
            <FieldContent>
              <InputStyled value={account.username} readOnly />
            </FieldContent>
          </FieldWrapper>
          <FieldWrapper>
            <FieldTitle>Heslo</FieldTitle>
            <FieldContent>
              <InputStyled value={'* '.repeat(account.password.length).slice(0, -1)} readOnly />
            </FieldContent>
          </FieldWrapper>
          <FieldWrapper>
            <FieldTitle>Email</FieldTitle>
            <FieldContent>
              <InputStyled value={account.email} readOnly />
            </FieldContent>
          </FieldWrapper>
          <FieldWrapper>
            <FieldTitle>Telefon</FieldTitle>
            <FieldContent>
              <InputStyled value={account.phone || 'Nezadáno'} readOnly />
            </FieldContent>
          </FieldWrapper>
          <FieldWrapper>
            <FieldTitle>Ověřený</FieldTitle>
            <FieldContent>
              <InputStyled value={account.verified ? 'Ano' : 'Ne'} readOnly />
            </FieldContent>
          </FieldWrapper>
          <FieldWrapper>
            <FieldTitle>Role</FieldTitle>
            <FieldContent>
              <InputStyled value={account.roles.join(', ')} readOnly />
            </FieldContent>
          </FieldWrapper>
          <FieldWrapper>
            <FieldTitle>Upozornění</FieldTitle>
            <FieldContent>
              <LabelWrapperStyled>
                <LabelStyled>novinky</LabelStyled>
                <InputStyled value={account.notifications.news ? 'Ano' : 'Ne'} readOnly />
              </LabelWrapperStyled>
              <LabelWrapperStyled>
                <LabelStyled>marketing</LabelStyled>
                <InputStyled value={account.notifications.marketing ? 'Ano' : 'Ne'} readOnly />
              </LabelWrapperStyled>
            </FieldContent>
          </FieldWrapper>
          <FieldWrapper>
            <FieldTitle>Adresa</FieldTitle>
            <FieldContent>
            {account.address ? (
                <>
                  <LabelWrapperStyled>
                    <LabelStyled>Město</LabelStyled>
                    <InputStyled value={account.address.city} readOnly />
                  </LabelWrapperStyled>
                  <LabelWrapperStyled>
                    <LabelStyled>Ulice</LabelStyled>
                    <InputStyled value={account.address.street} readOnly />
                  </LabelWrapperStyled>
                  <LabelWrapperStyled>
                    <LabelStyled>Číslo domu</LabelStyled>
                    <InputStyled value={account.address.streetNumber} readOnly />
                  </LabelWrapperStyled>
                  <LabelWrapperStyled>
                    <LabelStyled>PSČ</LabelStyled>
                    <InputStyled value={account.address.zip} readOnly />
                  </LabelWrapperStyled>
                </>
              ) : (
                <InputStyled value='Nezadáno' readOnly />
              )}
            </FieldContent>
          </FieldWrapper>
        </DropdownAccountWrapper>
  )
}
