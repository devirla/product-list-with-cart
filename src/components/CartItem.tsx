import { ReactElement } from "react";
import { CartItemType, ReducerType } from "../context/CartProvider";
import { ReducerActionType } from "../context/CartProvider";

/*
Single cart item which show quantity of ordered item. Price of single 
product and also partial price (amount * price). It also has button which 
Consumer can remove product from cart.
*/

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerType>;
  REDUCER_ACTIONS: ReducerActionType;
};

const CartItem = ({
  item,
  dispatch,
  REDUCER_ACTIONS,
}: PropsType): ReactElement => {
  const RemoveItem = () => {
    document
      .getElementById(item.name)!
      .querySelector<HTMLElement>(".product-image")!.style.border = "none";

    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: { ...item },
    });
  };

  return (
    <article className="cart-item">
      <div>
        <p className="dark-txt semi-bold small-size">{item.name}</p>
        <section className="cart-item-price-container">
          <p className="highlight-txt semi-bold small-size">{item.qty}x</p>
          <p className="light-txt semi-bold small-size">
            @ ${item.price.toFixed(2)}
          </p>
          <p className="medium-dark-txt semi-bold small-size">
            ${(item.price * item.qty).toFixed(2)}
          </p>
        </section>
      </div>
      <div>
        <button className="round-button" onClick={RemoveItem}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="none"
            viewBox="0 0 10 12"
          >
            <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
          </svg>
        </button>
      </div>
    </article>
  );
};
export default CartItem;
