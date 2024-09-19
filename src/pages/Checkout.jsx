import useCartStore from "../store/cartStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
// console.log("PAYPAL_CLIENT_ID", PAYPAL_CLIENT_ID);


const Checkout = () => {
  const { cart, clearCart, decreaseQuantity, addToCart } = useCartStore();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  // Berechne die Gesamtsumme des Warenkorbs
  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotalPrice(total);
  }, [cart]);

  // Behandelt erfolgreiche Zahlungen
  const handleApprove = async (data, actions) => {
    try {
      // Nutze die orderID, um die Zahlung serverseitig zu überprüfen oder zu speichern
      // data könnte folgendes enthalten:
      // data.orderID       - Die PayPal-Bestell-ID
      // data.payerID       - Die PayPal-Käufer-ID
      // data.paymentID     - (Optional) Manchmal wird auch eine Payment ID bereitgestellt
      // data.facilitatorAccessToken - Ein Access Token für weitere PayPal Interaktionen

      const orderID = data.orderID;
      console.log("Bestellung erfolgreich, Order ID:", orderID);

      // Warte auf die Bestätigung der Bestellung und erhalte die Zahlungsdetails
      const details = await actions.order.capture();

      // Benachrichtige den Benutzer über den Erfolg der Zahlung
      alert("Zahlung erfolgreich, danke " + details.payer.name.given_name);

      // Hier könntest du die Bestellung in deinem Backend speichern
      // oder eine Bestellbestätigungsseite anzeigen
      // Zum Beispiel: await saveOrderToDatabase(orderID, details);

      // Warenkorb leeren
      await clearCart();

      // Weiterleitung nach erfolgreicher Zahlung
      navigate("/");
    } catch (error) {
      // Behandle Fehler (z. B. wenn die Zahlung fehlschlägt)
      console.error("Fehler bei der Zahlungsabwicklung:", error);
      alert("Es gab ein Problem bei der Zahlung. Bitte versuche es erneut.");
    }
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
                  {product.name} - {product.price} € x
                  <b className="text-amber-600 text-base">
                    {" "}
                    {product.quantity || 1}
                  </b>
                </span>
                <div className="">
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded mr-2 hover:bg-red-700"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700"
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
              Gesamtsumme:{" "}
              <strong className="text-2xl text-amber-600">
                {totalPrice.toFixed(2)}
              </strong>{" "}
              €
            </p>
          </div>

          {/* PayPal-Integration */}
          <div className="mt-8">
            <PayPalScriptProvider
              options={{
                "client-id": PAYPAL_CLIENT_ID ,
              }} // Ersetze mit deinem PayPal Client ID
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalPrice.toFixed(2), // Gesamtsumme in der richtigen Währung
                          currency_code: "USD", // Ändere die Währung bei Bedarf
                        },
                      },
                    ],
                  });
                }}
                onApprove={handleApprove} // Erfolgreiche Zahlung behandeln
                onError={(err) => {
                  console.error("PayPal Checkout Error: ", err);
                  alert("Es gab ein Problem mit der Zahlung.");
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      ) : (
        <p>Keine Produkte im Warenkorb.</p>
      )}
    </div>
  );
};

export default Checkout;
