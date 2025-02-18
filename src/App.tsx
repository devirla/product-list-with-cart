
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="app-container">
      <div className="product-list-box">
        <p className="dark-txt bold title-size">Desserts</p>
        <ProductList />
      </div>
      <Cart />
    </div>
  );
}

export default App;
