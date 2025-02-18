import { createContext, ReactElement, useEffect, useState } from "react";

/*
  Component of creating and providing context of products
*/

export type ProductType = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
};

const initState: ProductType[] = [];

export type UseProductContextType = { products: ProductType[] };
const initContextState: UseProductContextType = { products: [] };

/*
  Creating context
*/
let ProductContext = createContext<UseProductContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

/*
  Providing context
*/
export const ProductProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);

  /* 
  Async data fetching from file
  */
  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("data/data.json")
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err.message);
        });

      return data;
    };

    fetchProducts().then((products) => setProducts(products));
  }, []);

  return (
    <>
      <ProductContext.Provider value={{ products }}>
        {children}
      </ProductContext.Provider>
    </>
  );
};

export default ProductContext;
