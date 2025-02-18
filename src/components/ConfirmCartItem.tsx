import { ReactElement } from "react";
import { CartItemType } from "../context/CartProvider";

type PropsType = {
  item: CartItemType;
};

/*Single Cart Item which is displayed after confirming order (summary component)*/

const ConfirmCartItem = ({ item }: PropsType): ReactElement => {
  /* Trimming product name when it is longer than 17 characters */
  const trimName = () => {
    let name = item.name;
    if (window.outerWidth < 900) {
      if (name.length > 17) {
        return name.substring(0, 17) + "...";
      } else return name;
    }
    return name;
  };

  return (
    <div className="cart-item confirmed-cart-item round-border">
      <div className="confirm-cart-item-info">
        <div className="confirmed-cart-item-img round-border">
          <img src={item.image} />
        </div>
        <div>
          <p className="dark-txt semi-bold small-size">{trimName()}</p>
          <div className="confirm-cart-item-info">
            <p className="highlight-txt semi-bold small-size">{item.qty}x</p>
            <p className="light-txt normal small-size">
              @ ${item.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="dark-txt bold small-size">
          ${(item.price * item.qty).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
export default ConfirmCartItem;
