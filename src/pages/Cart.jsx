import useCartStore from "../store/cartStore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  return (
    <div className="p-8 m-2">
      <h1 className="text-3xl font-bold mb-8">Warenkorb</h1>
      {cart.length > 0 ? (
        <div className="">
          <ul className="space-y-4">
            {cart.map((product, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 border border-black rounded-lg shadow-lg shadow-zinc-400"
              >
                <span>
                  {product.name} - {product.price} €
                </span>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Entfernen
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={clearCart}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Warenkorb leeren
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => navigate("/checkout")}
            >
              Zur Kasse
            </button>
          </div>
        </div>
      ) : (
        <p>Dein Warenkorb ist leer</p>
      )}
    </div>
  );
};

export default Cart;
