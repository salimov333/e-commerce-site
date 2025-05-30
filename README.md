# E-Commerce Site

Eine moderne, kleine E-Commerce-Website, entwickelt mit React.js und Vite. Diese Anwendung bietet grundlegende E-Commerce-Funktionen wie Produktlisten, Warenkorb, Checkout und Zahlungsabwicklung.

## Features

- **Produktliste:**
  - Im **Entwicklungsmodus** werden Produkte über den lokalen `json-server` abgerufen.
  - Im **Produktionsmodus** werden statische Daten verwendet, damit die Seite nach dem Deployment (z.B. auf Vercel) funktioniert.
- **Warenkorb:** Ermöglicht das Hinzufügen, Entfernen und Aktualisieren der Produktmenge im Warenkorb.
- **Checkout-Seite:** Zeigt die Produkte im Warenkorb an, berechnet die Gesamtsumme und ermöglicht die Bezahlung.
- **Zahlung:** Simulation einer erfolgreichen Zahlung mit der Möglichkeit, den Warenkorb nach der Bezahlung zu leeren.
- **Responsive Design:** Die Anwendung ist für verschiedene Bildschirmgrößen optimiert.

## Technologien

- **React.js:** Bibliothek für den Aufbau von Benutzeroberflächen.
- **Vite:** Ein schneller Build-Tool für moderne Webprojekte.
- **Zustand:** Zustand-Management für React-Anwendungen.
- **Tailwind CSS:** Utility-first CSS-Framework für schnelles Styling.
- **Axios:** HTTP-Client-Bibliothek für das Abrufen von Daten.
- **JSON Server:** Einfacher Weg, eine REST API für Testdaten bereitzustellen (nur für die Entwicklung).

## Live-Demo

- [Vercel](https://e-commerce-site-ivory.vercel.app/)

## Installation

1. **Repository klonen:**

   ```bash
   git clone https://github.com/salimov333/e-commerce-site.git
   cd e-commerce-site
   ```

## Umgebungsvariablen

Um die Anwendung lokal auszuführen, erstelle eine `.env`-Datei im Root-Verzeichnis des Projekts. Verwende dazu die `sample.env`-Datei als Vorlage:

1. Erstelle eine Kopie von `sample.env` und benenne sie in `.env` um:

```bash
    cp sample.env .env
```

2. **Abhängigkeiten installieren:**

   ```bash
   npm install
   ```

3. **JSON Server starten (nur für die lokale Entwicklung):**

   In der Entwicklungsumgebung wird `json-server` verwendet, um die Produkte bereitzustellen:

   ```bash
   npm run json-server
   ```

   Dies startet den Server auf `http://localhost:5000/products`.

4. **Entwicklungsserver starten:**

   ```bash
   npm run dev
   ```

   Besuche `http://localhost:5173` in deinem Browser, um die Anwendung zu sehen.

## Produktion vs. Entwicklung

- **Entwicklungsumgebung:**

  - Verwende `json-server`, um lokale Produktdaten unter `http://localhost:5000/products` bereitzustellen.
  - Produkte werden dynamisch von `json-server` abgerufen.

- **Produktionsumgebung:**
  - Beim Deployment (z.B. auf Vercel) werden statische Produktdaten verwendet, damit die Anwendung auch ohne Backend funktioniert.
  - Die statischen Daten befinden sich direkt im Code und werden bei der Erstellung der Anwendung eingebunden.

## Verwendung

- **Produkte:** Gehe zur Startseite, um die verfügbaren Produkte zu sehen und sie dem Warenkorb hinzuzufügen.
- **Warenkorb:** Navigiere zur Warenkorb-Seite, um die hinzugefügten Produkte zu sehen oder sie zu entfernen.
- **Checkout:** Gehe zur Checkout-Seite, um die Gesamtsumme anzuzeigen, die Menge der Produkte zu ändern und die Bezahlung abzuschließen.

## Autoren

- **Salem Helwani** - [GitHub-Profil](https://github.com/salimov333)

## Danksagungen

- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [JSON Server](https://github.com/typicode/json-server)
