import { ShieldAlert, FileText, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const RulesPage = () => {
  return (
    <div className="min-h-screen bg-grid py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-glow mb-6">Rules & Guidelines</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Understanding our verification standards and the ethical framework behind CertiGuard AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Sections */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Upload Rules */}
            <section className="glass-card p-8 md:p-10 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                <FileText className="w-24 h-24" />
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Upload Rules</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Supported Formats</p>
                      <p className="text-sm text-muted-foreground">PDF, JPG, PNG (All standard formats)</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Max File Size</p>
                      <p className="text-sm text-muted-foreground">10MB per document upload</p>
                    </div>
                  </div>
                </div>

                <ul className="space-y-4 text-muted-foreground leading-relaxed">
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                    Documents must be clear, well-lit, and readable for accurate AI forensic scanning.
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                    Manipulated metadata may impact the authenticity score.
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                    Uploading illegal or harmful content is strictly prohibited and will result in an immediate account ban.
                  </li>
                </ul>
              </div>
            </section>

            {/* Privacy Policy Summary */}
            <section className="glass-card p-8 md:p-10 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Info className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-3xl font-bold">Privacy Policy Summary</h2>
              </div>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  At CertiGuard AI, we prioritize your data security. Your documents are processed using secure neural networks.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-colors group/item">
                    <h4 className="text-foreground font-bold mb-2 group-hover/item:text-accent transition-colors">Data Processing</h4>
                    <p className="text-sm">We process documents solely for forensic analysis. No personal data is extracted without consent.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-colors group/item">
                    <h4 className="text-foreground font-bold mb-2 group-hover/item:text-accent transition-colors">Data Retention</h4>
                    <p className="text-sm">Documents are stored securely and can be deleted at any time upon user request from the history.</p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar / Legal Disclaimer */}
          <aside className="space-y-8">
            <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-rose-500/5 to-transparent border-rose-500/20">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Legal Disclaimer</h3>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  The results provided by CertiGuard AI are generated by artificial intelligence and should be used as assistive information.
                </p>
                <p className="font-bold text-rose-500/80">
                  CertiGuard AI results do not constitute legal proof or binding certification of authenticity.
                </p>
                <p>
                  Users should consult with legal professionals or relevant authorities for official document verification in legal proceedings.
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                If you have questions about these rules or need more details about our forensic process.
              </p>
              <Link to="/contact" className="inline-flex w-full h-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-medium">
                Contact Support
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
