import { ReactElement, useContext } from "react";
import { CartContext, useCartContextType } from "../context/CartProvider";
import { ProductType } from "../context/ProductProvider";

type PropsType = {
  product: ProductType;
  onClick?: React.ChangeEvent<HTMLInputElement>;
};

const Product = ({ product }: PropsType): ReactElement => {
  const { dispatch, REDUCER_ACTIONS, cart } =
    useContext<useCartContextType>(CartContext);

  /* 
  Variable informing about amount of product which Consumer want to order. 
  This information will be passed to the cart.
  */
  let qty: number = 0;

  /* 
  Function which highlight product border when product is selected for 
  the first time. Always increases the quantity of the product by one and 
  setting inCart variable as true. 
*/
  const increaseProduct = () => {
    dispatch({
      type: REDUCER_ACTIONS.INCREASE,
      payload: { ...product, image: product.image.thumbnail, qty: 1 },
    });
  };

  /* 
  Function which unhighlight product border when product is decreased 
  to 0 and setting inCart variable as false. 
  Always decreases the quantity of the product by one.
*/
  const decreaseProduct = () => {
    dispatch({
      type: REDUCER_ACTIONS.DECREASE,
      payload: { ...product, image: product.image.thumbnail, qty: 1 },
    });
  };

  {
    cart.find((item) => item.name === product.name)?.qty == undefined
      ? (qty = 0)
      : (qty = cart.find((item) => item.name === product.name)!.qty);
  }

  return (
    <article className="product-item" id={product.name}>
      <section>
        <div className="product-image-container">
          <img
            className={
              "product-image" + (qty > 0 ? " product-image-active" : "")
            }
            src={product.image.mobile}
          />
        </div>

        {qty !== 0 ? (
          <div className="highlight-button amount-button">
            <button className="round-button" onClick={decreaseProduct}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="20"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </button>

            <span>{qty}</span>

            <button className="round-button" onClick={increaseProduct}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="button-container">
            <button
              className="light-button normal small-size"
              onClick={increaseProduct}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                fill="none"
                viewBox="0 0 21 20"
              >
                <g fill="#C73B0F" clip-path="url(#a)">
                  <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
                  <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M.333 0h20v20h-20z" />
                  </clipPath>
                </defs>
              </svg>
              Add to Cart
            </button>
          </div>
        )}
      </section>
      <section className="product-info">
        <h2 className="light-txt normal small-size">{product.category}</h2>
        <h1 className="dark-txt semi-bold normal-size">{product.name}</h1>
        <h3 className="highlight-txt semi-bold normal-size">
          ${product.price.toFixed(2)}
        </h3>
      </section>
    </article>
  );
};

export default Product;
