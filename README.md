# Blue E-commerce

A modern, responsive e-commerce web application built with React and Vite. This project leverages the [DummyJSON API](https://dummyjson.com/) to dynamically fetch out-of-the-box product catalogs, categories, and item details. It provides a polished online shopping prototype complete with interactive product sliders, dynamic routing, and persistent cart management.

## 🚀 Features

- **Dynamic Homepage**: Features an autoplaying Hero Slider and multiple horizontal product carousels organized by category (Smartphones, Laptops, Sunglasses, etc.).
- **Product Details Page**: Displays comprehensive information including an interactive image gallery, star ratings, pricing, brand details, stock availability, and related category products.
- **Shopping Cart**: A fully functional cart that allows users to adjust quantities, remove items, and view total order summaries.
- **State Persistence**: utilizes React Context API and `localStorage` to keep your cart items saved even after refreshing the page.
- **Responsive Layout**: Designed with custom CSS to look great on desktops, tablets, and mobile devices.

## 🛠️ Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Sliders/Carousels**: [Swiper](https://swiperjs.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## 📂 Project Structure

```text
src/
├── assets/         # Static assets (images, icons)
├── components/     # Reusable UI components
│   ├── context/    # Global state management (CartContext)
│   ├── Header/     # TopHeader and BottomHeader
│   └── slideProducts/ # Product card and Swiper integration
├── page/           # Main route views
│   ├── Home/       # Landing page with categorized product sliders
│   ├── cart/       # Checkout and order summary page
│   └── productDetails/ # Individual product deep-dive
├── App.jsx         # Root component and Route definitions
└── main.jsx        # React DOM entry point
```

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbdelrhamanWael/Blue_E-commerce-.git
   cd "Blue_E-commerce-/Ecommerce Website/app"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:5173` to explore the application.

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the project, please fork the repository and use a feature branch. Pull requests are warmly welcomed.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open-source and available under the MIT License.
