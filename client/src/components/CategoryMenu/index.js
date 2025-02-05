import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategories, updateCurrentCategory } from '../../features/categorySlice';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const dispatch = useDispatch();
  
  // Ensure we get an empty array if categories is undefined
  const { categories = [] } = useSelector((state) => state.category);

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch(updateCategories(categoryData.categories));
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch(updateCategories(categories));
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch(updateCurrentCategory(id));
  };

  // Display categories when they are loaded, otherwise show loading message
  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.length > 0 ? (
        categories.map((item) => (
          <button
            key={item._id}
            onClick={() => handleClick(item._id)}
          >
            {item.name}
          </button>
        ))
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
}

export default CategoryMenu;