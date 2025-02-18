import { createContext, ReactElement, useReducer } from "react";

/*
  Component of creating and providing context 
  of products in cart with useReducer hook
*/

export type CartItemType = {
  name: string;
  image: string;
  price: number;
  qty: number;
};

type CartStateType = { cart: CartItemType[] };

const initCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
  INCREASE: "INCREASE",
  REMOVE: "REMOVE",
  DECREASE: "DECREASE",
  SUBMIT: "SUBMIT",
  NEW_ORDER: "NEW ORDER",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerType = {
  type: string;
  payload?: CartItemType;
};

/*
  Reducer
*/
const reducer = (state: CartStateType, action: ReducerType): CartStateType => {
  switch (action.type) {

    case REDUCER_ACTION_TYPE.INCREASE: {
      if (!action.payload) {
        throw new Error("There is no payload in action INCREASE");
      }
      const { name, price, image } = action.payload;

      const filteredCartItems: CartItemType[] = state.cart.filter(
        (item) => item.name !== name
      );
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.name === name
      );
      const qty: number = itemExists ? itemExists.qty + 1 : 1;

      return {
        ...state,
        cart: [...filteredCartItems, { name, price, qty, image }],
      };
    }

    case REDUCER_ACTION_TYPE.DECREASE: {
      if (!action.payload) {
        throw new Error("There is no payload in action DECREASE");
      }
      const { name, price, image } = action.payload;

      const filteredCartItems: CartItemType[] = state.cart.filter(
        (item) => item.name !== name
      );

      const decreasedItem = state.cart.find((item) => item.name === name);

      const qty: number = decreasedItem ? decreasedItem.qty - 1 : 0;

      return qty == 0
        ? { ...state, cart: [...filteredCartItems] }
        : {
            ...state,
            cart: [...filteredCartItems, { name, price, image, qty }],
          };
    }

    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("There is no payload in action REMOVE");
      }

      const { name } = action.payload;
      const filteredCartItems = state.cart.filter((item) => item.name !== name);

      return { ...state, cart: [...filteredCartItems] };
    }


    case REDUCER_ACTION_TYPE.NEW_ORDER: {
      return { ...state, cart: [] };
    }

    
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state };
    }
    default:
      throw new Error("Undefined reducer error type");
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTIONS = REDUCER_ACTION_TYPE;

  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.qty * cartItem.price;
    }, 0)
  );
  const cart = state.cart;

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

export type useCartContextType = ReturnType<typeof useCartContext>;

const initContextState: useCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

export const CartContext = createContext<useCartContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};
