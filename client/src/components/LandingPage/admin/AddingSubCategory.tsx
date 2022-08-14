import React from 'react';
import { Icons } from 'react-toastify';
import { asyncGetCategories } from '../../../redux/categories';

export default function AddingSubCategory({
  subCategoryName,
  subCategoryCategory,
  setSubCategoryName,
  setSubCategoryCategory,
}: any) {
  const [categories, setCategories] = React.useState<Array<string>>([]);
  const [loading, setLoading] = React.useState<Boolean>(true);

  React.useEffect(() => {
    const getCategories = async () => {
      setCategories(await asyncGetCategories());
      setLoading(false);
    };

    getCategories();
  }, []);

  if (loading) return <>{Icons.spinner()}</>;

  return (
    <>
      <input
        value={subCategoryName}
        onChange={({ target }) => setSubCategoryName(target.value)}
        placeholder='Subcategory name'
      />
      <input
        list='categories'
        value={subCategoryCategory}
        onChange={({ target }) => setSubCategoryCategory(target.value)}
        placeholder='Product category'
      />
      <datalist id='categories'>
        {categories.map((category, index) => (
          <option key={index} value={category} />
        ))}
      </datalist>
    </>
  );
}
