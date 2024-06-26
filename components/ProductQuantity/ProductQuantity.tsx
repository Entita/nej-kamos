import React from 'react';
import { useDispatch } from 'react-redux';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  ProductQuantityStyled,
  ProductButtonStyled,
  ProductQuantityWrapper,
  ProductError,
  ProductErrorText,
  ProductErrorCancel,
  ProductQuantityMinus,
  ProductQuantityPlus,
  ProductQuantityWrapperStyled,
  ProductQuantityTextStyled,
} from './ProductQuantityLandingPage.style';
import { RemoveButtonStyled } from './ProductQuantityBasket.style';
import { Product } from '../../models/client/Product';
import {
  asyncBasketDeleteItem,
  asyncBasketSetItem,
  asyncBasketAddItem,
} from '../../redux/basket';
import BasketSvg from '../SVG/BasketSvg';
import { ProductBasketStyled, ProductPageQuantityWrapper } from './ProductQuantityProductPage.style';

function ProductQuantityLandingPage({
  product,
  quantity,
  loading,
  error,
  setError,
  addProductInBasket,
  validateQuantity,
  addingDelay,
}: any) {
  return (
    <>
      {product.quantity === 0 && (
        <ProductButtonStyled
          disabled={loading}
          onClick={() => addProductInBasket(1)}
        >
          <BasketSvg color='white' size='small' />
          Do košíku
        </ProductButtonStyled>
      )}
      {product.quantity > 0 && (
        <ProductQuantityWrapper disabled={loading}>
          {error && (
            <ProductError>
              <ProductErrorText>{error}</ProductErrorText>
              <ProductErrorCancel onClick={() => setError(null)} />
            </ProductError>
          )}
          <ProductQuantityMinus
            onClick={() => {
              const isValid = validateQuantity(quantity - 1);
              if (!isValid.error) addingDelay(-1);
            }}
          >
            <RemoveCircleRoundedIcon />
          </ProductQuantityMinus>
          <ProductQuantityWrapperStyled>
            <ProductQuantityStyled
              value={quantity}
              onChange={({ target }) => {
                const isValid = validateQuantity(target.value);
                if (isValid.error && isValid.quantity === 0) return;
                addingDelay(isValid.quantity, true);
              }}
            />
            <ProductQuantityTextStyled>ks</ProductQuantityTextStyled>
          </ProductQuantityWrapperStyled>
          <ProductQuantityPlus
            onClick={() => {
              const isValid = validateQuantity(quantity + 1);
              if (!isValid.error) addingDelay(1);
            }}
          >
            <AddCircleRoundedIcon />
          </ProductQuantityPlus>
        </ProductQuantityWrapper>
      )}
    </>
  );
}

function ProductQuantityBasket({
  product,
  quantity,
  loading,
  error,
  setError,
  setProductInBasket,
  validateQuantity,
  addingDelay,
}: any) {
  return (
    <>
      <RemoveButtonStyled
        disabled={loading}
        onClick={() => setProductInBasket(-product.quantity)}
      >
        <CloseRoundedIcon color='error' />
      </RemoveButtonStyled>

      <ProductQuantityWrapper disabled={loading}>
        {error && (
          <ProductError>
            <ProductErrorText>{error}</ProductErrorText>
            <ProductErrorCancel onClick={() => setError(null)} />
          </ProductError>
        )}
        <ProductQuantityMinus
          onClick={() => {
            const isValid = validateQuantity(quantity - 1);
            if (!isValid.error) addingDelay(-1);
          }}
        >
          <RemoveCircleRoundedIcon />
        </ProductQuantityMinus>
        <ProductQuantityStyled
          value={quantity}
          onChange={({ target }) => {
            const isValid = validateQuantity(target.value);
            if (isValid.error && isValid.quantity === 0) return;
            addingDelay(isValid.quantity, true);
          }}
        />
        <ProductQuantityPlus
          onClick={() => {
            const isValid = validateQuantity(quantity + 1);
            if (!isValid.error) addingDelay(1);
          }}
        >
          <AddCircleRoundedIcon />
        </ProductQuantityPlus>
      </ProductQuantityWrapper>
    </>
  );
}

function ProductQuantityProductPage({
  product,
  quantity,
  loading,
  error,
  setError,
  addProductInBasket,
  validateQuantity,
  addingDelay,
}: any) {
  return (
    <>
      {product.quantity === 0 && (
        <ProductBasketStyled
          disabled={loading}
          onClick={() => addProductInBasket(1)}
        >
          <BasketSvg color='white' size='small' />
          Do košíku
        </ProductBasketStyled>
      )}
      {product.quantity > 0 && (
        <ProductPageQuantityWrapper disabled={loading}>
          {error && (
            <ProductError>
              <ProductErrorText>{error}</ProductErrorText>
              <ProductErrorCancel onClick={() => setError(null)} />
            </ProductError>
          )}
          <ProductQuantityMinus
            onClick={() => {
              const isValid = validateQuantity(quantity - 1);
              if (!isValid.error) addingDelay(-1);
            }}
          >
            <IndeterminateCheckBoxIcon />
          </ProductQuantityMinus>
          <ProductQuantityStyled
            value={quantity}
            onChange={({ target }) => {
              const isValid = validateQuantity(target.value);
              if (isValid.error && isValid.quantity === 0) return;
              addingDelay(isValid.quantity, true);
            }}
          />
          <ProductQuantityPlus
            onClick={() => {
              const isValid = validateQuantity(quantity + 1);
              if (!isValid.error) addingDelay(1);
            }}
          >
            <AddBoxIcon />
          </ProductQuantityPlus>
        </ProductPageQuantityWrapper>
      )}
    </>
  );
}

interface Props {
  product: Product;
  type: 'basket' | 'landing_page' | 'product_page';
}

export default function ProductQuantity({ product, type }: Props) {
  const [quantity, setQuantity] = React.useState<number>(product.quantity);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const dispatch = useDispatch();
  const maximumProductQuantity = 50;
  const [timer, setTimer] = React.useState<any>();

  React.useEffect(() => {
    if (!loading) setQuantity(product.quantity);
  }, [product, loading]);

  const validateQuantity = (input: any) => {
    if (loading) return { quantity: 0, error: true };
    if (input >= 0) {
      if (input > product.stock && product.stock < maximumProductQuantity) {
        if (error) return { quantity: 0, error: true };
        setError(`Bohužel máme skladem ${product.stock} kusů`);
        return { quantity: product.stock, error: true };
      } else if (input > maximumProductQuantity) {
        if (error) return { quantity: 0, error: true };
        setError(`Do košíku můžete přidat maximálně ${maximumProductQuantity} kusů tohoto produktu`); // prettier-ignore
        return { quantity: maximumProductQuantity, error: true };
      } else {
        setError(null);
        return { quantity: Number(input), error: false };
      }
    }

    return { quantity: 0, error: true };
  };

  const addingDelay = (productQuantity: number, isSet: boolean = false) => {
    if (isSet) setQuantity(productQuantity);
    else setQuantity(quantity + productQuantity);
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        const calc_quantity = isSet
          ? productQuantity
          : quantity + productQuantity;
        setProductInBasket(calc_quantity);
      }, 500),
    );
  };

  const setProductInBasket = async (productQuantity: number) => {
    if (loading) return;

    setLoading(true);
    if (productQuantity <= 0) {
      await asyncBasketDeleteItem(dispatch, product._id, -product.quantity);
    } else {
      await asyncBasketSetItem(dispatch, product._id, productQuantity);
    }
    setLoading(false);
  };

  const addProductInBasket = async (productQuantity: number) => {
    if (loading) return;

    setLoading(true);
    await asyncBasketAddItem(dispatch, product._id, productQuantity);
    setQuantity(quantity + productQuantity);
    setLoading(false);
  };

  if (type === 'basket')
    return (
      <ProductQuantityBasket
        product={product}
        quantity={quantity}
        loading={loading}
        error={error}
        setProductInBasket={setProductInBasket}
        setError={setError}
        validateQuantity={validateQuantity}
        addingDelay={addingDelay}
      />
    );

  if (type === 'landing_page')
    return (
      <ProductQuantityLandingPage
        product={product}
        quantity={quantity}
        loading={loading}
        error={error}
        setProductInBasket={setProductInBasket}
        addProductInBasket={addProductInBasket}
        setError={setError}
        validateQuantity={validateQuantity}
        addingDelay={addingDelay}
      />
    );

  if (type === 'product_page')
    return (
      <ProductQuantityProductPage
        product={product}
        quantity={quantity}
        loading={loading}
        error={error}
        setProductInBasket={setProductInBasket}
        addProductInBasket={addProductInBasket}
        setError={setError}
        validateQuantity={validateQuantity}
        addingDelay={addingDelay}
      />
    );

  return <></>;
}
