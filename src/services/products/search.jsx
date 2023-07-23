import React, { useState } from 'react';
import { useGetProductByIdQuery } from '../configuration/productApi';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isError } = useGetProductByIdQuery(searchTerm);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  // Make sure data.products exist before accessing them
  const products = data || [];
  // console.log(products);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        style={{ padding: '10px', width: '300px', margin: '20px' }}
      />
      <div> {'All Products:'}</div>
      {products.length > 0 // Check if products is an array.
        ? products?.map((product) => (
            <div key={product.id} style={{ padding: '10px', margin: '20px' }}>
              <div>Title: {product.brand}</div>
              <div>Description: {product.description}</div>
              <hr />
            </div>
          ))
        : typeof products === 'object' ||
          products !==
            null(
              // if not array or it is an object render this
              <div>
                {' '}
                {/* Render single product */}
                <div>Title: {products.brand}</div>
                <div>Description: {products.description}</div>
              </div>
            )}
    </div>
  );
}

export default Search;
