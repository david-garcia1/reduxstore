import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { updateProducts } from '../../features/productsSlice'; // Import action from productSlice
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const dispatch = useDispatch();
  const { products, currentCategory } = useSelector((state) => state.products); // Access Redux state
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch(updateProducts(data.products)); // Dispatch the action to update products
      data.products.forEach((product) => {
        idbPromise('products', 'put', product); // Cache products in IndexedDB
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((cachedProducts) => {
        dispatch(updateProducts(cachedProducts)); // Load cached products into Redux
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }
    return products.filter((product) => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
