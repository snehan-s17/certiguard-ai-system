import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { VerifyPage } from './pages/VerifyPage'
import { ContactPage } from './pages/ContactPage'
import { HowToUsePage } from './pages/HowToUsePage'
import { RulesPage } from './pages/RulesPage'

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
    </div>
  ),
})

// Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

// Feature skeletons (placeholders for Phase 3)
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
    <h1 className="text-4xl font-bold mb-4">{title}</h1>
    <p className="text-muted-foreground max-w-md">
      This page is part of our upcoming Phase 3 feature set. Stay tuned!
    </p>
  </div>
)

const howToRoute = createRoute({ getParentRoute: () => rootRoute, path: '/how-to-use', component: HowToUsePage })
const rulesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/rules', component: RulesPage })
const contactRoute = createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: ContactPage })
const verifyRoute = createRoute({ getParentRoute: () => rootRoute, path: '/verify', component: VerifyPage })

// Route Tree
const routeTree = rootRoute.addChildren([
  indexRoute, 
  loginRoute, 
  howToRoute, 
  rulesRoute, 
  contactRoute, 
  verifyRoute
])

// Router
const router = createRouter({ routeTree })

// Types
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <RouterProvider router={router} />
}