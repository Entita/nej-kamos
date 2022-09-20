import React from 'react';
import { Product } from '../../models/client/Product';
import { formatTotalPrice, getServerUrl } from '../../utils/utils';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import {
  ProductAlternativeButtonStyled,
  ProductAlternativeButtonWrapperStyled,
  ProductAlternativeContainerStyled,
  ProductAlternativeTitleStyled,
  ProductAlternativeWrapperStyled,
  ProductBasketWrapperStyled,
  ProductDescriptionStyled,
  ProductDiscountStyled,
  ProductDiscountWrapperStyled,
  ProductFavoriteStyled,
  ProductFullPriceStyled,
  ProductImageStyled,
  ProductImageWrapperStyled,
  ProductInfoWrapperStyled,
  ProductNameStyled,
  ProductPriceStyled,
  ProductPriceTextStyled,
  ProductPriceWrapperStyled,
  ProductReviewStyled,
  ProductReviewTextStyled,
  ProductReviewWrapperStyled,
  ProductStockNumberStyled,
  ProductStockStyled,
  ProductStockWrapperStyled,
  ProductSupportDescriptionStyled,
  ProductSupportInfoWrapperStyled,
  ProductSupportPhoneStyled,
  ProductSupportTimeStyled,
  ProductSupportTitleStyled,
  ProductSupportWrapperStyled,
  ProductWrapperStyled,
  SectionTitleStyled,
  SectionTitleWrapperStyled,
  SectionWrapperStyled,
  WrapperStyled,
} from './ProductItem.style';
import ProductQuantity from '../ProductQuantity/ProductQuantity';

const sections = [
  {
    name: 'Popis',
    component: <>Popisek</>,
  },
  {
    name: 'Další fotografie',
    component: <>fotky</>,
  },
  {
    name: 'Hodnocení',
    component: <>review</>,
  },
];

export default function ProductItem({ product }: { product: Product }) {
  const [selectedSection, setSelectedSection] = React.useState<{ name: string, component: any }>(sections[0]);

  return (
    <WrapperStyled>
      <ProductWrapperStyled>
        <ProductImageWrapperStyled>
          <ProductImageStyled imageUrl={getServerUrl() + product.imageUrl} />
          <ProductFavoriteStyled>
            {product.favorite ? (
              <FavoriteIcon color='error' />
            ) : (
              <FavoriteBorderIcon color='error' />
            )}
          </ProductFavoriteStyled>
        </ProductImageWrapperStyled>
        <ProductInfoWrapperStyled>
          <ProductNameStyled>{product.name}</ProductNameStyled>
          <ProductDescriptionStyled>
            {product.description}
          </ProductDescriptionStyled>
          <ProductAlternativeContainerStyled>
            <ProductAlternativeTitleStyled>Alternativní produkty</ProductAlternativeTitleStyled>
            <ProductAlternativeWrapperStyled>
              <ProductAlternativeButtonWrapperStyled>
                <ProductAlternativeButtonStyled>1kg</ProductAlternativeButtonStyled>
                <ProductAlternativeButtonStyled>5kg</ProductAlternativeButtonStyled>
              </ProductAlternativeButtonWrapperStyled>
              <ProductStockWrapperStyled>
                <ProductStockStyled stock={product.stock}>{product.stock <= 0 ? 'není skladem' : 'skladem'}</ProductStockStyled>
                <ProductStockNumberStyled>{`(${product.stock})`}</ProductStockNumberStyled>
              </ProductStockWrapperStyled>
            </ProductAlternativeWrapperStyled>
          </ProductAlternativeContainerStyled>
          {(product.discount.percent !== 0 || product.discount.amount !== 0) && (
            <ProductDiscountWrapperStyled>
              {product.discount.percent > 0 && (
                <ProductDiscountStyled>
                  {`-${product.discount.percent}%`}
                </ProductDiscountStyled>
              )}
              {product.discount.amount > 0 && (
                <ProductDiscountStyled>
                  {`-${product.discount.amount} Kč`}
                </ProductDiscountStyled>
              )}
              <ProductFullPriceStyled>
                {`${product.price.toFixed(2)} Kč`}
              </ProductFullPriceStyled>
            </ProductDiscountWrapperStyled>
          )}
          <ProductPriceWrapperStyled>
            <ProductPriceStyled>
              {`${formatTotalPrice(product.price, product.discount)} Kč`}
            </ProductPriceStyled>
            <ProductPriceTextStyled>včetně DPH</ProductPriceTextStyled>
          </ProductPriceWrapperStyled>
          <ProductBasketWrapperStyled>
            <ProductQuantity product={product} type='product_page' />
            <ProductReviewWrapperStyled>
              <ProductReviewStyled>
                <StarRoundedIcon />
                <StarRoundedIcon />
                <StarRoundedIcon />
                <StarRoundedIcon />
                <StarRoundedIcon />
              </ProductReviewStyled>
              <ProductReviewTextStyled>260 hodnocení</ProductReviewTextStyled>
            </ProductReviewWrapperStyled>
          </ProductBasketWrapperStyled>
          <ProductSupportWrapperStyled>
            <PhoneRoundedIcon />
            <ProductSupportInfoWrapperStyled>
              <ProductSupportTitleStyled>Zákaznická linka</ProductSupportTitleStyled>
              <ProductSupportDescriptionStyled>a pomoc s nákupem</ProductSupportDescriptionStyled>
              <ProductSupportPhoneStyled>730 660 291</ProductSupportPhoneStyled>
            </ProductSupportInfoWrapperStyled>
            <ProductSupportTimeStyled>(Po - Pa 7:00 - 16:00)</ProductSupportTimeStyled>
          </ProductSupportWrapperStyled>
        </ProductInfoWrapperStyled>
      </ProductWrapperStyled>
      <SectionTitleWrapperStyled>
        {sections.map((section, index) => (
          <SectionTitleStyled
            key={index}
            selected={selectedSection.name === section.name}
            onClick={() => setSelectedSection(section)}
          >
            {section.name}
          </SectionTitleStyled>
        ))}
      </SectionTitleWrapperStyled>
      <SectionWrapperStyled>
        {selectedSection.component}
      </SectionWrapperStyled>
    </WrapperStyled>
  );
}
