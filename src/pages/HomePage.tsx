import { motion } from 'framer-motion'
import { Shield, CheckCircle2, FileSearch, ShieldCheck, ArrowRight, Zap, Lock, Globe } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'

export function HomePage() {
  const { isAuthenticated } = useAuth()

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Real-time Detection",
      description: "Our AI engine analyzes certificates in seconds to identify sophisticated forgery patterns."
    },
    {
      icon: <Lock className="h-6 w-6 text-primary" />,
      title: "Secure Verification",
      description: "Document integrity is checked against millions of verified professional patterns."
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Universal Support",
      description: "Supports education, training, and experience certificates from across the globe."
    }
  ]

  const stats = [
    { label: "Verification Accuracy", value: "99.8%" },
    { label: "Analysis Time", value: "< 2s" },
    { label: "Active Verifiers", value: "50k+" }
  ]

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 bg-primary/20 blur-[120px] rounded-full opacity-30" />
        
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8">
              <ShieldCheck className="h-4 w-4" />
              <span>Next-Gen Forgery Detection</span>
            </div>
            
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl display-font">
              AI-Based Universal <br />
              <span className="text-primary text-glow">Forgery Detection</span>
            </h1>
            
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-xl">
              CertiGuard leverages advanced computer vision to detect fake or forged certificates with 
              unmatched precision. Secure your integrity in seconds.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to={isAuthenticated ? "/verify" : "/login"}
                className="group relative flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-bold text-white transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-elegant"
              >
                Start Verification
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/how-to-use"
                className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
              >
                Learn How it Works
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-20 flex justify-center"
          >
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:gap-24">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl p-8 hover:border-primary/30 transition-colors group"
            >
              <div className="mb-6 rounded-2xl bg-primary/10 p-4 w-fit group-hover:bg-primary/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-primary/10 blur-[100px] rounded-full opacity-50" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white sm:text-5xl mb-8 leading-tight">
                Designed for Institutions <br />
                & Professional Verification
              </h2>
              
              <div className="space-y-6">
                {[
                  { title: "AI-Powered Accuracy", text: "Beyond simple text scanning, our AI detects micro-inconsistencies in layout and typography." },
                  { title: "Multi-Format Support", text: "Upload PDF, JPG, or PNG files. Our system handles them all with the same precision." },
                  { title: "Privacy First", text: "Documents are processed securely and deleted after analysis unless history is requested." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="glass rounded-3xl p-4 overflow-hidden shadow-2xl animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
                  alt="AI Security Background" 
                  className="rounded-2xl opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-8">
                  <div className="flex items-center gap-3">
                    <FileSearch className="h-10 w-10 text-primary" />
                    <div className="text-white">
                      <p className="text-xs uppercase tracking-widest font-bold opacity-60">Status</p>
                      <p className="text-lg font-bold">Scanning Document...</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
