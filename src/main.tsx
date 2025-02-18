/* 
  Project of product list which includes a functional cart.
  The main goal of this project is to practice issues releated to React. 
  Design from frontendmentor.io
*/

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import { ProductProvider } from "./context/ProductProvider.tsx";
import { CartProvider } from "./context/CartProvider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
  </StrictMode>
);
