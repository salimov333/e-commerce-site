import { useState, useEffect } from "react";
import axios from "axios";
import useCartStore from "../store/cartStore";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCartStore();

  //statische Daten (zum Testen):
  // useEffect(() => {
  //   const fakeProducts = [
  //     { id: 1, name: "Produkt 1", price: 10 },
  //     { id: 2, name: "Produkt 2", price: 15 },
  //     { id: 3, name: "Produkt 3", price: 20 },
  //   ];

  //   setProducts(fakeProducts);
  // }, []);

  //JSON-Server verwenden, um Testdaten lokal bereitzustellen:
  // 1. npm install json-server
  // 2. Erstelle eine db.json und füge Produkte hinzu
  // 3. Skript hinzufügen: "json-server": "json-server --watch db.json --port 5000"
  // 3. Starte den Server: npm run json-server
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        // Überprüfen, ob die Antwort die erwartete Struktur hat
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error(
            "Erwartete Array-Antwort von der API, aber erhalten:",
            response.data
          );
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Produkte:", error);
        setProducts([]);
      });
  }, []);

  // API-Aufruf für Produktdaten (vorerst statisch)
  // useEffect(() => {
  //   axios
  //     .get("/api/products")
  //     .then((response) => setProducts(response.data))
  //     .catch((err) => {
  //       console.error(err);
  //       setProducts([]); // Fehlerfall abfangen und auf leeres Array setzen
  //     });
  // }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Produkte</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border border-black p-4 rounded-lg shadow-lg shadow-zinc-600"
            >
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.price} €</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                In den Warenkorb
              </button>
            </div>
          ))
        ) : (
          <p>Keine Produkte verfügbar</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
