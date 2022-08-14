import React from 'react';
import { useSelector } from 'react-redux';
import {
  DatalistStyled,
  InputStyled,
  LabelStyled,
  OptionStyled,
  RowWrapperStyled,
  TextareaStyled,
  WrapperStyled,
} from './AddingProduct.style';

export default function AddingProduct({
  productName,
  productPrice,
  productDiscountAmount,
  productDiscountPercent,
  productBrand,
  productCategory,
  productSubCategory,
  productStock,
  productDescription,
  setProductName,
  setProductPrice,
  setProductDiscountAmount,
  setProductDiscountPercent,
  setProductPictureUrl,
  setProductBrand,
  setProductCategory,
  setProductSubCategory,
  setProductStock,
  setProductDescription,
}: any) {
  const [filteredSubcategories, setFilteredSubcategories] = React.useState([]);
  const categories = useSelector((state: any) => state.categories.categories);
  const subcategories = useSelector(
    (state: any) => state.subcategories.subcategories,
  );

  const getSubcategoriesOfCategory = (category: string) => {
    const filteredSubcategories = subcategories.filter(
      (subcategory: { name: string; category: string }) =>
        subcategory.category === category,
    );
    return filteredSubcategories.map(
      (filteredSubcategory: { name: string; category: string }) =>
        filteredSubcategory.name,
    );
  };

  const isValueInArray = (value: string, array: Array<string>) => {
    return array.includes(value);
  };

  return (
    <WrapperStyled>
      <InputStyled
        value={productName}
        onChange={({ target }) => setProductName(target.value)}
        placeholder='Product name'
      />
      <RowWrapperStyled>
        <InputStyled
          id='price'
          type='number'
          value={productPrice}
          onChange={({ target }) => {
            setProductPrice(target.value);
            if (productDiscountAmount > target.value) {
              setProductDiscountAmount(target.value);
            }
          }}
        />
        <LabelStyled htmlFor='price'>Product price</LabelStyled>
      </RowWrapperStyled>
      <RowWrapperStyled>
        <InputStyled
          id='discountAmount'
          type='range'
          min={0}
          max={productPrice}
          step={.1}
          value={productDiscountAmount}
          onChange={({ target }) => setProductDiscountAmount(target.value)}
        />
        <LabelStyled htmlFor='discountAmount'>{`${productDiscountAmount} Kč sleva`}</LabelStyled>
      </RowWrapperStyled>
      <RowWrapperStyled>
        <InputStyled
          id='discountPercent'
          type='range'
          min={0}
          max={100}
          step={1}
          value={productDiscountPercent}
          onChange={({ target }) => setProductDiscountPercent(target.value)}
        />
        <LabelStyled htmlFor='discountPercent'>{`${productDiscountPercent}% sleva`}</LabelStyled>
      </RowWrapperStyled>
      <RowWrapperStyled>
        <InputStyled
          id='stock'
          type='number'
          value={productStock}
          onChange={({ target }) => setProductStock(Number(target.value))}
        />
        <LabelStyled htmlFor='stock'>Product stock</LabelStyled>
      </RowWrapperStyled>
      <InputStyled
        value={productBrand}
        onChange={({ target }) => setProductBrand(target.value)}
        placeholder='Product brand'
      />
      <InputStyled
        list='categories'
        value={productCategory}
        onChange={({ target }) => {
          if (target.value === '') {
            setFilteredSubcategories([]);
            setProductCategory(target.value);
          } else if (isValueInArray(target.value, categories)) {
            setFilteredSubcategories(getSubcategoriesOfCategory(target.value));
            setProductCategory(target.value);
          }
        }}
        placeholder='Product category'
      />
      <DatalistStyled id='categories'>
        {categories.map((category: string, index: number) => (
          <OptionStyled key={index} value={category} />
        ))}
      </DatalistStyled>
      <InputStyled
        list='subcategories'
        value={productSubCategory}
        onChange={({ target }) => {
          if (target.value === '') {
            setProductSubCategory(target.value);
          } else if (isValueInArray(target.value, filteredSubcategories))
            setProductSubCategory(target.value);
        }}
        placeholder='Product subcategory'
      />
      <DatalistStyled id='subcategories'>
        {filteredSubcategories.map((subcategory: string, index: number) => (
          <OptionStyled key={index} value={subcategory} />
        ))}
      </DatalistStyled>
      <TextareaStyled
        value={productDescription}
        placeholder='Product Description'
        onChange={({ target }) => setProductDescription(target.value)}
      ></TextareaStyled>
      <InputStyled
        type='file'
        accept='image/png, image/gif, image/jpeg'
        onChange={({ target }) => {
          if (target.files) {
            setProductPictureUrl(target.files[0]);
          }
        }}
        placeholder='Product picture'
      />
    </WrapperStyled>
  );
}
