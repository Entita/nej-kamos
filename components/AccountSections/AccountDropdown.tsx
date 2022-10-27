import React from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { DropdownStyled, DropdownTogglerStyled, ExpandButtonStyled, TitleInfoStyled, TitleStyled, WrapperStyled } from './AccountDropdown.style'

export default function AccountDropdown({ title, description, children }: { title: String, description: String, children: any}) {
  const [openDropdown, setOpenDropdown] = React.useState<Boolean>(false);
  const [expandAngle, setExpandAngle] = React.useState<number>(180);

  return (
    <WrapperStyled>
      <DropdownTogglerStyled>
        <TitleStyled>{title}</TitleStyled>
        <TitleInfoStyled>{description}</TitleInfoStyled>
        <ExpandButtonStyled
          open={openDropdown}
          angle={expandAngle}
          onClick={() => {
            setOpenDropdown((open) => !open);
            setExpandAngle(angle => angle - 180);
          }}
        >
          <ExpandLessIcon />
        </ExpandButtonStyled>
      </DropdownTogglerStyled>

      <DropdownStyled open={openDropdown}>
        {children}
      </DropdownStyled>
    </WrapperStyled>
  )
}
