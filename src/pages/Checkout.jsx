import useCartStore from "../store/cartStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart, decreaseQuantity, addToCart } = useCartStore();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  // Berechne die Gesamtsumme des Warenkorbs
  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1), // Sicherstellen, dass `quantity` vorhanden ist
      0
    );
    setTotalPrice(total);
  }, [cart]);

  const handlePayment = async () => {
    // Hier würden API-Aufrufe an einen Zahlungsdienst wie Stripe erfolgen.

    // Simuliere erfolgreiche Zahlung
    alert("Zahlung erfolgreich! Vielen Dank für deinen Einkauf.");

    // Warenkorb leeren
    await clearCart();

    navigate("/");

    //Zu Umsetzen
    // Weiterleitung zu einer Bestellbestätigungsseite
    // navigate("/order-confirmation"); // Entferne Kommentarzeichen, wenn Route definiert ist
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      {cart.length > 0 ? (
        <div>
          <ul className="space-y-4">
            {cart.map((product, index) => (
              <li
                key={index}
                className="flex justify-between flex-wrap p-4 border border-black rounded-lg shadow-lg shadow-slate-600"
              >
                <span>
                  {product.name} - {product.price} € x {product.quantity || 1}
                </span>
                <div className="">
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="bg-red-500 text-white px-2 py-0 rounded mr-2 hover:bg-red-700"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-500 text-white px-2 py-0 rounded hover:bg-green-700"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* Anzeige der Gesamtsumme */}
          <div className="mt-8">
            <p className="text-xl font-semibold">
              Gesamtsumme: {totalPrice.toFixed(2)} €
            </p>
          </div>
          <button
            onClick={handlePayment}
            className="bg-green-500 text-white px-4 py-2 mt-8 rounded hover:bg-green-700"
          >
            Bezahlen
          </button>
        </div>
      ) : (
        <p>Keine Produkte im Warenkorb.</p>
      )}
    </div>
  );
};

export default Checkout;
