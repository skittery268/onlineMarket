import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import "./index.css";
import { ProductsProvider } from './context/ProductsContext.jsx'
import { CategoriesProvider } from './context/CategoriesContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WhishListProvider } from './context/WhishList.jsx'
import { AdminProvider } from './context/AdminContext.jsx';
import { IconsProvider } from './context/IconsContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CategoriesProvider>
        <ProductsProvider>
          <CartProvider>
            <WhishListProvider>
              <AdminProvider>
                <IconsProvider>
                  <App />
                </IconsProvider>
              </AdminProvider>
            </WhishListProvider>
          </CartProvider>
        </ProductsProvider>
      </CategoriesProvider>
    </AuthProvider>
  </BrowserRouter>
)
