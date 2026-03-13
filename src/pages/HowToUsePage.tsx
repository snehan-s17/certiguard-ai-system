import { LogIn, LayoutDashboard, FileUp, Cpu, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

const steps = [
  {
    title: 'Login to Your Account',
    description: 'Create a secure account to maintain a history of your verified documents and access premium forensic features.',
    icon: LogIn,
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    title: 'Navigate to Dashboard',
    description: 'Access the "Verify" dashboard where all your forensic tools are located in a clean, intuitive interface.',
    icon: LayoutDashboard,
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
  {
    title: 'Upload Your Document',
    description: 'Simply drag and drop or select your files. We support PDF, JPG, and PNG formats up to 10MB in size.',
    icon: FileUp,
    color: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
  },
  {
    title: 'AI Forensic Analysis',
    description: 'Our advanced neural networks scan for pixel inconsistencies, metadata manipulation, and digital tampering.',
    icon: Cpu,
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
  },
  {
    title: 'Interpret Results',
    description: 'Receive a detailed authenticity score. Review detected anomalies and keep a permanent record of the report.',
    icon: CheckCircle2,
    color: 'from-rose-500/20 to-red-500/20',
    iconColor: 'text-rose-400',
  },
]

export const HowToUsePage = () => {
  return (
    <div className="min-h-screen bg-grid py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-glow mb-6">How to Use CertiGuard AI</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Securing your document authenticity has never been easier. Follow these five simple steps to leverage our forensic AI.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative space-y-12 mb-20">
          {/* Vertical line for desktop */}
          <div className="absolute left-[2.25rem] top-10 bottom-10 w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50 hidden md:block" />

          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col md:flex-row gap-8 items-start group">
              {/* Step Number/Icon */}
              <div className="relative z-10 shrink-0">
                <div className={`w-12 md:w-18 h-12 md:h-18 rounded-2xl bg-gradient-to-br ${step.color} border border-white/10 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-500`}>
                  <step.icon className={`w-6 md:w-8 h-6 md:h-8 ${step.iconColor}`} />
                </div>
                {/* Mobile line */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-primary/20 md:hidden last:hidden" />
              </div>

              {/* Content Card */}
              <div className="glass-card flex-1 p-8 rounded-2xl relative overflow-hidden group-hover:border-primary/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="text-8xl font-black italic select-none">0{index + 1}</span>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary/80 px-2 py-1 rounded bg-primary/10">Step 0{index + 1}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass-card p-12 rounded-3xl border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Ready to verify your first document?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="h-14 px-8 text-lg font-medium group">
                  <Link to="/verify">
                    Start Verification
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-medium border-white/10 bg-white/5 hover:bg-white/10">
                  <Link to="/contact">
                    Talk to an Expert
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
