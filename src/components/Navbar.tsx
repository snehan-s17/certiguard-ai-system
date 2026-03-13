import React from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Shield, Menu, X, LogIn, LogOut, User } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { user, isAuthenticated, signOut } = useAuth()
  const [isOpen, setIsOpen] = React.useState(false)
  const navigate = useNavigate()

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'How to Use', to: '/how-to-use' },
    { name: 'Rules', to: '/rules' },
    { name: 'Contact', to: '/contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight text-white display-font">CertiGuard AI</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary active:text-primary"
                  activeProps={{ className: 'text-primary' }}
                >
                  {link.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="flex items-center gap-4 border-l border-white/10 pl-8">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-white hidden lg:inline-block">
                      {user?.displayName || user?.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="rounded-full bg-white/5 p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-elegant"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-white/5 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-background p-4 animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-primary"
                activeProps={{ className: 'text-primary' }}
              >
                {link.name}
              </Link>
            ))}
            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-base font-semibold text-white"
              >
                <LogIn className="h-5 w-5" />
                Sign In
              </Link>
            ) : (
              <button
                onClick={() => {
                  signOut()
                  setIsOpen(false)
                }}
                className="flex items-center justify-center gap-2 rounded-lg bg-white/5 py-3 text-base font-semibold text-red-400"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
