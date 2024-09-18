//Zustand des Warenkorbs in localStorage speichern
import { create } from 'zustand';

// Lade den initialen Zustand aus dem localStorage
const getLocalStorageCart = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
};

const useCartStore = create((set) => ({
    // Lade den initialen Zustand aus dem localStorage
    cart: getLocalStorageCart(),

    // Produkte zum Warenkorb hinzufügen
    addToCart: (product) => set((state) => {
        // Nutze eine Flag, um zu bestimmen, ob das Item bereits existiert
        let itemAdded = false;
        // Aktualisiere die Menge des Produkts, wenn es im Warenkorb vorhanden ist.
        const updatedCart = state.cart.map(item => {
            if (item.id === product.id) {
                itemAdded = true; // Markiere, dass das Item bereits existiert
                return { ...item, quantity: item.quantity + 1 }; // Menge erhöhen, wenn das Produkt vorhanden ist
            }
            return item;

        }).concat(
            !itemAdded ?
                [{ ...product, quantity: 1 }] // Füge das Produkt mit Menge 1 hinzu, wenn es nicht vorhanden ist

                : [] // Keine Änderung, wenn das Produkt bereits vorhanden ist 
        );

        // Den Warenkorb im localStorage speichern
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        return { cart: updatedCart };
    }),

    // Menge eines Produkts im Warenkorb verringern
    decreaseQuantity: (productId) => set((state) => {
        // Aktualisiere die Menge des Produkts im Warenkorb
        const updatedCart = state.cart.map(item =>
            item.id === productId
                ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 } : item
        );

        // Entferne das Produkt, wenn die Menge 0 erreicht (wir entfernen nur Produkte mit Menge > 0)
        const finalCart = updatedCart.filter(item => item.quantity > 0);

        // Aktualisiere den localStorage
        localStorage.setItem('cart', JSON.stringify(finalCart));

        return { cart: finalCart };
    }),

    // Produkte aus dem Warenkorb entfernen
    removeFromCart: (productId) => set((state) => {
        const updatedCart = state.cart.filter((item) => item.id !== productId);

        // Aktualisiere den localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        return { cart: updatedCart };
    }),

    // Den Warenkorb leeren
    clearCart: async () => {
        // Asynchrone Verzögerung für die Synchronisierung
        return new Promise((resolve) => {
            localStorage.setItem('cart', JSON.stringify([]));
            resolve(set({ cart: [] }));
        });
    },
}));

export default useCartStore;

