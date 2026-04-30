import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import ShopPage from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import CartDrawer from './components/CartDrawer'
import ErrorBoundary from './components/ErrorBoundary'
import { CartProvider } from './context/CartContext'

export default function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <CartDrawer />
      </CartProvider>
    </ErrorBoundary>
  )
}
