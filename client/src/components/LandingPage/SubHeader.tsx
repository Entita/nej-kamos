import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoryStyled, CategoryWrapperStyled, SubcategoryStyled, SubcategoryWrapperStyled, WrapperStyled } from './SubHeader.style';

export default function SubHeader() {
  const [hovered, setHovered] = React.useState<{ category: string, subcategory: string }>({ category: '', subcategory: '' });
  const categories = useSelector((state: any) => state.categories.categories);
  const subcategories = useSelector((state: any) => state.subcategories.subcategories);
  const query = new URLSearchParams(useLocation().search);
  const queryCategory = query.get('category');
  const querySubCategory = query.get('subcategory');
  const navigate = useNavigate();

  return (
    <WrapperStyled>
      {categories.map((category: string, index: number) => {
        interface subcategories {
          name: string,
          category: string,
        }
        const filteredSubcategories = subcategories.filter((subcategory: subcategories) => 
          subcategory.category === category).map((subcategory: subcategories) => subcategory.name);

        return <CategoryWrapperStyled key={index}>
          <CategoryStyled
            selected={hovered.category === category || category === queryCategory}
            onClick={() => navigate(`/?category=${category}`)}
          >{category}</CategoryStyled>
          <SubcategoryWrapperStyled>
            {filteredSubcategories.map((subcategory: string, index:number ) => 
              <SubcategoryStyled
              selected={(hovered.subcategory === subcategory && hovered.category === category) || (subcategory === querySubCategory && category === queryCategory)}
              onMouseEnter={() => setHovered({ category, subcategory })}
              onMouseLeave={() => setHovered({ category: '', subcategory: '' })}
              onClick={() => navigate(`/?category=${category}&subcategory=${subcategory}`)}
              key={index}
              >
                  {subcategory}
              </SubcategoryStyled>
            )}
          </SubcategoryWrapperStyled>
        </CategoryWrapperStyled>
        })}
    </WrapperStyled>
  );
}
