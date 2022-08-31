import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { SearchButtonStyled, SearchInputStyled, WrapperStyled } from './Search.style'

export default function Search() {
  const [searchInput, setSearchInput] = React.useState<string>('');

  return (
    <WrapperStyled>
      <SearchInputStyled placeholder='hledat' onChange={({ target }) => setSearchInput(target.value)} value={searchInput} />
      <SearchButtonStyled>
        <SearchIcon />
      </SearchButtonStyled>
    </WrapperStyled>
  )
}
