import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useCartStore from "../store/cartStore";

const Navbar = () => {
  const { cart } = useCartStore(); // Zugriff auf den Warenkorb aus dem Store
  const [itemCount, setItemCount] = useState(0);

  // Berechne die Gesamtanzahl der Produkte im Warenkorb
  useEffect(() => {
    // console.log("Aktueller Warenkorb:", cart); // Debug: Zeige den aktuellen Warenkorb
    const totalItems = cart.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );
    // console.log("Berechnete Gesamtanzahl der Produkte:", totalItems); // Debug: Zeige die berechnete Anzahl
    setItemCount(totalItems);
  }, [cart]);

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-end text-white">
        <li className="px-3 py-2 hover:bg-gray-700 rounded">
          <Link to="/">Produkte</Link>
        </li>
        <li className="relative px-3 py-2 hover:bg-gray-700 rounded">
          <Link to="/cart">Warenkorb</Link>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold flex items-center justify-center w-6 h-6 rounded-full">
              {itemCount}
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
