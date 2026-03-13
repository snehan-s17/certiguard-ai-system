import { Link } from '@tanstack/react-router'
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-background/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight text-white display-font">CertiGuard AI</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Securing professional integrity with advanced AI-powered certificate forgery detection. 
              Verified once, trusted forever.
            </p>
            <div className="mt-6 flex gap-4">
              <button className="text-muted-foreground hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="text-muted-foreground hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </button>
              <button className="text-muted-foreground hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </button>
              <button className="text-muted-foreground hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/how-to-use" className="text-sm text-muted-foreground hover:text-primary transition-colors">How it works</Link></li>
              <li><Link to="/rules" className="text-sm text-muted-foreground hover:text-primary transition-colors">Rules</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {currentYear} CertiGuard AI System. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/50 italic">
            AI-generated results for guidance. Not legal proof.
          </div>
        </div>
      </div>
    </footer>
  )
}
