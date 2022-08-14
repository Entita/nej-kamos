import React from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {
  AddButtonStyled,
  AddStyled,
  BackButtonStyled,
  ButtonWrapperStyled,
  ConfirmButtonStyled,
} from './AddingSchema.style';
import AddingCategory from './AddingCategory';
import AddingProduct from './AddingProduct';
import { Icons, toast } from 'react-toastify';
import { asyncAddProduct, asyncRefreshProducts } from '../../../redux/products';
import { useDispatch } from 'react-redux';
import AddingSubCategory from './AddingSubCategory';
import { asyncAddCategory } from '../../../redux/categories';
import { asyncAddSubcategories } from '../../../redux/subcategories';
import AddingCoupon from './AddingCoupon';
import agent from '../../../api/agent';

export default function AddingSchema() {
  const [openCoupon, setOpenCoupon] = React.useState<Boolean>(false);
  const [couponCode, setCouponCode] = React.useState<string>('');
  const [couponDiscountAmount, setCouponDiscountAmount] = React.useState<Number>(0); // prettier-ignore
  const [couponDiscountPercent, setCouponDiscountPercent] = React.useState<Number>(0); // prettier-ignore

  const [openCategory, setOpenCategory] = React.useState<Boolean>(false);
  const [categoryName, setCategoryName] = React.useState<string>('');

  const [openSubCategory, setOpenSubCategory] = React.useState<Boolean>(false);
  const [subCategoryName, setSubCategoryName] = React.useState<string>('');
  const [subCategoryCategory, setSubCategoryCategory] = React.useState<string>('');

  const [openProduct, setOpenProduct] = React.useState<Boolean>(false);
  const [productName, setProductName] = React.useState<string>('');
  const [productPrice, setProductPrice] = React.useState<Number>(0);
  const [productPictureUrl, setProductPictureUrl] = React.useState<string>('');
  const [productBrand, setProductBrand] = React.useState<string>('');
  const [productCategory, setProductCategory] = React.useState<string>('');
  const [productSubCategory, setProductSubCategory] = React.useState<string>('');
  const [productDescription, setProductDescription] = React.useState<string>('');
  const [productStock, setProductStock] = React.useState<Number>(0);
  const [productDiscountAmount, setProductDiscountAmount] = React.useState<Number>(0); // prettier-ignore
  const [productDiscountPercent, setProductDiscountPercent] = React.useState<Number>(0); // prettier-ignore
  const dispatch = useDispatch();

  const addCoupon = async () => {
    if (couponCode.length === 0 || (couponDiscountAmount === 0 && couponDiscountPercent === 0)) return;
    
    toast.info(`Creating coupon ...`, {
      position: 'top-right',
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
      icon: Icons.spinner,
      toastId: 'agentPromise',
    });
    await agent.Coupon.add({
      code: couponCode,
      discount: {
        amount: couponDiscountAmount,
        percent: couponDiscountPercent,
      },
    });
  }

  const addCategory = () => {
    if (categoryName.length === 0) return; // prettier-ignore

    toast.info(`Creating category ...`, {
      position: 'top-right',
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
      icon: Icons.spinner,
      toastId: 'agentPromise',
    });
    asyncAddCategory({ name: categoryName }).then((data) => {
      if (!data.failed) {
        setOpenCategory(false);
        setCategoryName('');
      }
    });
  };

  const addSubCategory = () => {
    if (subCategoryName.length === 0 || subCategoryCategory.length === 0) return; // prettier-ignore

    toast.info(`Creating subcategory ...`, {
      position: 'top-right',
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
      icon: Icons.spinner,
      toastId: 'agentPromise',
    });
    asyncAddSubcategories({
      name: subCategoryName,
      category: subCategoryCategory,
    }).then((data) => {
      if (!data.failed) {
        setOpenSubCategory(false);
        setSubCategoryName('');
        setSubCategoryCategory('');
      }
    });
  };

  const addProduct = () => {
    if (productName.length === 0 || !productPrice || !productDiscountAmount || !productDiscountPercent || productPictureUrl.length === 0 || productBrand.length === 0
      || productCategory.length === 0 || productSubCategory.length === 0 || !productStock || productDescription.length === 0) return; // prettier-ignore

    let data = new FormData();
    data.append('name', productName);
    data.append('price', String(productPrice));
    data.append('discount', JSON.stringify({ amount: productDiscountAmount, percent: productDiscountPercent})); // prettier-ignore
    data.append('picture', productPictureUrl);
    data.append('brand', productBrand);
    data.append('category', productCategory);
    data.append('subcategory', productSubCategory);
    data.append('stock', String(productStock));
    data.append('description', productDescription);
    toast.info(`Creating product ...`, {
      position: 'top-right',
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
      icon: Icons.spinner,
      toastId: 'agentPromise',
    });

    asyncAddProduct(data).then((data) => {
      if (!data.failed) {
        setOpenProduct(false);
        setProductName('');
        setProductPictureUrl('');
        setProductBrand('');
        setProductCategory('');
        setProductSubCategory('');
        setProductDescription('');
        setProductPrice(0);
        setProductStock(0);
        setProductDiscountAmount(0);
        setProductDiscountPercent(0);
        asyncRefreshProducts(dispatch);
      }
    });
  };

  return (
    <>
      <AddStyled>
        Add coupon
        {openCoupon && (
          <AddingCoupon
            couponCode={couponCode}
            couponDiscountAmount={couponDiscountAmount}
            couponDiscountPercent={couponDiscountPercent}
            setCouponCode={setCouponCode}
            setCouponDiscountAmount={setCouponDiscountAmount}
            setCouponDiscountPercent={setCouponDiscountPercent}
          />
        )}
        <ButtonWrapperStyled>
          <AddButtonStyled onClick={() => setOpenCoupon(true)}>
            {!openCoupon && <AddCircleOutlineOutlinedIcon />}
          </AddButtonStyled>
          {openCoupon && (
            <>
              <BackButtonStyled onClick={() => setOpenCoupon(false)}>
                Storno
              </BackButtonStyled>
              <ConfirmButtonStyled onClick={addCoupon}>
                Add
              </ConfirmButtonStyled>
            </>
          )}
        </ButtonWrapperStyled>
      </AddStyled>

      <AddStyled>
        Add category
        {openCategory && (
          <AddingCategory
            categoryName={categoryName}
            setCategoryName={setCategoryName}
          />
        )}
        <ButtonWrapperStyled>
          <AddButtonStyled onClick={() => setOpenCategory(true)}>
            {!openCategory && <AddCircleOutlineOutlinedIcon />}
          </AddButtonStyled>
          {openCategory && (
            <>
              <BackButtonStyled onClick={() => setOpenCategory(false)}>
                Storno
              </BackButtonStyled>
              <ConfirmButtonStyled onClick={addCategory}>
                Add
              </ConfirmButtonStyled>
            </>
          )}
        </ButtonWrapperStyled>
      </AddStyled>

      <AddStyled>
        Add subcategory
        {openSubCategory && (
          <AddingSubCategory
            subCategoryName={subCategoryName}
            subCategoryCategory={subCategoryCategory}
            setSubCategoryName={setSubCategoryName}
            setSubCategoryCategory={setSubCategoryCategory}
          />
        )}
        <ButtonWrapperStyled>
          <AddButtonStyled onClick={() => setOpenSubCategory(true)}>
            {!openSubCategory && <AddCircleOutlineOutlinedIcon />}
          </AddButtonStyled>
          {openSubCategory && (
            <>
              <BackButtonStyled onClick={() => setOpenSubCategory(false)}>
                Storno
              </BackButtonStyled>
              <ConfirmButtonStyled onClick={addSubCategory}>
                Add
              </ConfirmButtonStyled>
            </>
          )}
        </ButtonWrapperStyled>
      </AddStyled>

      <AddStyled>
        Add product
        {openProduct && (
          <AddingProduct
            productName={productName}
            productPrice={productPrice}
            productDiscountAmount={productDiscountAmount}
            productDiscountPercent={productDiscountPercent}
            productBrand={productBrand}
            productCategory={productCategory}
            productSubCategory={productSubCategory}
            productStock={productStock}
            productDescription={productDescription}
            setProductName={setProductName}
            setProductPrice={setProductPrice}
            setProductDiscountAmount={setProductDiscountAmount}
            setProductDiscountPercent={setProductDiscountPercent}
            setProductPictureUrl={setProductPictureUrl}
            setProductBrand={setProductBrand}
            setProductCategory={setProductCategory}
            setProductSubCategory={setProductSubCategory}
            setProductStock={setProductStock}
            setProductDescription={setProductDescription}
          />
        )}
        <ButtonWrapperStyled>
          <AddButtonStyled onClick={() => setOpenProduct(true)}>
            {!openProduct && <AddCircleOutlineOutlinedIcon />}
          </AddButtonStyled>
          {openProduct && (
            <>
              <BackButtonStyled onClick={() => setOpenProduct(false)}>
                Storno
              </BackButtonStyled>
              <ConfirmButtonStyled onClick={addProduct}>
                Add
              </ConfirmButtonStyled>
            </>
          )}
        </ButtonWrapperStyled>
      </AddStyled>
    </>
  );
}
