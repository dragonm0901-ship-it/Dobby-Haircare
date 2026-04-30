import { createContext, useContext, useState, useCallback } from 'react'

export interface CartItem {
  id: string
  name: string
  price: string
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  cartCount: number
  isCartOpen: boolean
  addToCart: (product: { id: string; name: string; price: string; image: string }) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
  cartTotal: string
}

const CartContext = createContext<CartContextType>({
  items: [],
  cartCount: 0,
  isCartOpen: false,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  toggleCart: () => {},
  closeCart: () => {},
  cartTotal: '$0.00',
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const cartTotal = '$' + items
    .reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''))
      return sum + price * item.quantity
    }, 0)
    .toFixed(2)

  const addToCart = useCallback((product: { id: string; name: string; price: string; image: string }) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      )
    }
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])

  return (
    <CartContext.Provider
      value={{
        items, cartCount, isCartOpen,
        addToCart, removeFromCart, updateQuantity,
        clearCart, toggleCart, closeCart, cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
