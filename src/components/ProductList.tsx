import ProductContext from "../context/ProductProvider";
import { useContext } from "react";
import Product from "./Product";
import { UseProductContextType } from "../context/ProductProvider";

const ProductList = () => {
  const { products } = useContext<UseProductContextType>(ProductContext);

  return (
    <div className="product-list-container">
      {products.map((product) => {
        return <Product key={product.name} product={product} />;
      })}
      ;
    </div>
  );
};
export default ProductList;
