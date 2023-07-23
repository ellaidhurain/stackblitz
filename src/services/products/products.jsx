import React from 'react';
import {
  useGetProductQuery,
  useGetProductByIdQuery,
} from '../configuration/productApi';

function Products() {
  const id = 1;
  const {
    data: getProductData,
    isLoading: isGetProductLoading,
    isError: isGetProductError,
  } = useGetProductQuery();
  const {
    data: getProductByIdData,
    isLoading: isGetProductByIdLoading,
    isError: isGetProductByIdError,
  } = useGetProductByIdQuery(id);

  if (isGetProductLoading || isGetProductByIdLoading) {
    return <div>Loading...</div>;
  }

  if (isGetProductError || isGetProductByIdError) {
    return <div>Error occurred while fetching data</div>;
  }

  // Make sure getUserById and getUserById.products exist before accessing them
  const products = getProductData?.products || [];

  return (
    <div>
      {/* Pass the products data as a prop to the child component */}
      {/* // Map over the products array and create a div for each product displaying name and title */}
      {products.map((product) => (
        <div key={product.id}>
          <ChildComponent
            products={product}
            productByIdData={getProductByIdData}
          />
        </div>
      ))}
    </div>
  );
}

function ChildComponent({ products, productByIdData }) {
  const { title } = products;

  return (
    <>
      <div>
        {/* Display the UI elements */}
        {/* {title} */}
      </div>
      {/* <div>{productByIdData.brand}</div> */}
    </>
  );
}

export default Products;
