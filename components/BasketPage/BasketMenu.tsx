import React from 'react';
import {
  MenuComponentWrapperStyled,
  MenuItemDotStyled,
  MenuItemTitleStyled,
  MenuItemWrapperStyled,
  MenuWrapperStyled,
  WrapperStyled,
} from './BasketMenu.style';
import BasketSection from './BasketSection';

const menu = [
  {
    title: 'Košík',
    component: <BasketSection />,
  },
  {
    title: 'Doprava',
    component: <>b</>,
  },
  {
    title: 'Platba',
    component: <>c</>,
  },
];

export default function BasketMenu() {
  const [selectedMenu, setSelectedMenu] = React.useState<{
    title: string;
    component: any;
  }>(menu[0]);

  return (
    <WrapperStyled>
      <MenuWrapperStyled>
        {menu.map(
          (menuItem: { title: string; component: any }, index: number) => (
            <MenuItemWrapperStyled key={index}>
              <MenuItemDotStyled
                selected={selectedMenu.title === menuItem.title}
                onClick={() => setSelectedMenu(menuItem)}
              />
              <MenuItemTitleStyled onClick={() => setSelectedMenu(menuItem)}>
                {menuItem.title}
              </MenuItemTitleStyled>
            </MenuItemWrapperStyled>
          ),
        )}
      </MenuWrapperStyled>
      <MenuComponentWrapperStyled>
        {selectedMenu.component}
      </MenuComponentWrapperStyled>
    </WrapperStyled>
  );
}
