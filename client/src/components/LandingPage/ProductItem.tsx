import { useNavigate } from 'react-router-dom';
import { Product } from '../../models/Product';
import {
  ProductBorderStyled,
  ProductBottomStyled,
  ProductDiscountStyled,
  ProductImageStyled,
  ProductNameStyled,
  ProductPriceBlockStyled,
  ProductPriceStyled,
  ProductStyled,
} from './ProductItem.style';
import { getServerUrl, formatTotalPrice } from '../../utils/utils';
import ProductQuantity from '../Features/ProductQuantity/ProductQuantity';

export default function ProductItem({ product }: { product: Product }) {
  const navigate = useNavigate();

  return (
    <ProductStyled>
      <ProductBorderStyled>
        <ProductImageStyled alt={product.name} imageUrl={getServerUrl() + product.imageUrl} />
        <ProductPriceBlockStyled>
          <ProductPriceStyled discount={(product.discount.amount > 0 || product.discount.percent > 0)}>{(product.price).toFixed(2)}</ProductPriceStyled>
          {(product.discount.amount > 0 || product.discount.percent > 0) &&
            <ProductDiscountStyled>{`${formatTotalPrice(product.price, product.discount)} Kč`}</ProductDiscountStyled>}
        </ProductPriceBlockStyled>
        <ProductBottomStyled>
          <ProductNameStyled onClick={() => navigate(`/product/${product._id}`)}>
            {product.name}
          </ProductNameStyled>
          <ProductQuantity product={product} type='landing_page' />
        </ProductBottomStyled>
      </ProductBorderStyled>
    </ProductStyled>
  );
}
