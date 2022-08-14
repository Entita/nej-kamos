import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  SearchedCategoriesStyled,
  SearchedCategoriesTitleStyled,
  SearchedCategoryOfSubcategory,
  SearchedCategoryStyled,
  SearchedProductImageStyled,
  SearchedProductNameStyled,
  SearchedProductPriceStyled,
  SearchedProductsStyled,
  SearchedProductsTitleStyled,
  SearchedProductStyled,
  SearchedProductsWrapperStyled,
  SearchedSubcategoriesStyled,
  SearchedSubcategoriesTitleStyled,
  SearchedSubcategoryStyled,
  SearchIconStyled,
  SearchStyled,
  WrapperStyled,
} from './Search.style';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Product } from '../../models/Product';
import { formatTotalPrice, getServerUrl } from '../../utils/utils';

const filterContainProducts = (products: Array<Product>, property: string, filter: string) => {
  if (filter.length === 0) return [];
  const caseInsensitiveFilter = filter.toLowerCase();
  return products.filter((product: any) =>
    product[property].toLowerCase().includes(caseInsensitiveFilter),
  );
};

const filterContainCategories = (categories: Array<string>, filter: string) => {
  if (filter.length === 0) return [];
  const caseInsensitiveFilter = filter.toLowerCase();
  return categories.filter((category: string) => category.toLowerCase().includes(caseInsensitiveFilter));
}

export default function Search() {
  const products = useSelector((state: any) => state.products.products);
  const categories = useSelector((state: any) => state.categories.categories);
  const subcategories = useSelector((state: any) => state.subcategories.subcategories);
  const [searchInput, setSearchInput] = React.useState('');
  const [focused, setFocused] = React.useState<Boolean>(false);
  const ref = React.useRef<any>(null);
  const navigate = useNavigate();
  const searchedProducts: Array<Product> = filterContainProducts(products, 'name', searchInput); // prettier-ignore
  const searchedCategories: Array<string> = filterContainCategories(categories, searchInput); // prettier-ignore
  const searchedSubcategories: Array<{ category: string, name: string }> = filterContainProducts(subcategories, 'name', searchInput); // prettier-ignore
  const firstFiveFilteredProducts = searchedProducts.slice(0,5);
  const firstThreeFilteredCategories = searchedCategories.slice(0,3);
  const firstThreeFilteredSubcategories = searchedSubcategories.slice(0,3);

  const Search = (value: string) => {
    navigate('/search/' + value);
  };

  React.useEffect(() => {
    const handleKeypressesOnFocus = (e: any) => {
      if (e.code === 'Enter') {
        const input = ref.current.querySelector('input');
        Search(input.value);
      }
    };

    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        ref.current.querySelector('input').blur();
        setFocused(false);
      }
    };

    if (focused) document.addEventListener('keypress', handleKeypressesOnFocus, true); // prettier-ignore
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      if (focused) document.removeEventListener('keypress', handleKeypressesOnFocus, true); // prettier-ignore
      document.removeEventListener('click', handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

  return (
    <WrapperStyled ref={ref}>
      <SearchStyled
        focused={focused}
        onFocus={() => setFocused(true)}
        placeholder='Search placeholder here'
        value={searchInput}
        onChange={({ target }: any) => setSearchInput(target.value)}
      />
      <SearchIconStyled onClick={() => Search(searchInput)}>
        <SearchIcon fontSize='medium' color={focused ? 'action' : 'disabled'} />
      </SearchIconStyled>
      <SearchedProductsWrapperStyled open={focused}>
        {searchInput.length > 0 &&
        firstFiveFilteredProducts.length === 0 &&
        firstThreeFilteredCategories.length === 0 &&
        firstThreeFilteredSubcategories.length === 0 &&
          <>Žádné položky nebyly nalezeny</>}
        {firstFiveFilteredProducts.length > 0 && <SearchedProductsStyled>
          <SearchedProductsTitleStyled>Produkty:</SearchedProductsTitleStyled>
          {firstFiveFilteredProducts.map((product, index) => (
            <SearchedProductStyled
              key={index}
              onClick={() => {
                navigate(`/product/${product._id}`);
                setSearchInput(product.name);
                setFocused(false);
              }}
            >
              <SearchedProductImageStyled imageUrl={getServerUrl() + product.imageUrl} />
              <SearchedProductNameStyled>
                {product.name}
              </SearchedProductNameStyled>
              <SearchedProductPriceStyled>{`${formatTotalPrice(product.price, product.discount)} Kč`}</SearchedProductPriceStyled>
            </SearchedProductStyled>
          ))}
        </SearchedProductsStyled>}
        {firstThreeFilteredCategories.length > 0 && <SearchedCategoriesStyled>
          <SearchedCategoriesTitleStyled>Kategorie:</SearchedCategoriesTitleStyled>
          {firstThreeFilteredCategories.map((category, index) => (
            <SearchedCategoryStyled
              key={index}
              onClick={() => {
                navigate(`/?category=${category}`);
                setSearchInput(category);
                setFocused(false);
              }}
            >
              {category}
            </SearchedCategoryStyled>
          ))}
        </SearchedCategoriesStyled>}
        {firstThreeFilteredSubcategories.length > 0 && <SearchedSubcategoriesStyled>
          <SearchedSubcategoriesTitleStyled>Podkategorie:</SearchedSubcategoriesTitleStyled>
          {firstThreeFilteredSubcategories.map((subcategory, index) => (
            <SearchedSubcategoryStyled
              key={index}
              onClick={() => {
                navigate(`/?category=${subcategory.category}&subcategory=${subcategory.name}`, { replace: true });
                setSearchInput(subcategory.name);
                setFocused(false);
              }}
            >
              {subcategory.name}
              <SearchedCategoryOfSubcategory>
                {`← ${subcategory.category}`}
              </SearchedCategoryOfSubcategory>
            </SearchedSubcategoryStyled>
          ))}
        </SearchedSubcategoriesStyled>}
      </SearchedProductsWrapperStyled>
    </WrapperStyled>
  );
}
