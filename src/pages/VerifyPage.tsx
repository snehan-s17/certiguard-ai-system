import React, { useState, useEffect } from 'react'
import { ShieldCheck, History, Search, Info, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useVerification, VerificationRecord } from '@/hooks/useVerification'
import { UploadZone } from '@/components/verification/UploadZone'
import { AnalysisLoading } from '@/components/verification/AnalysisLoading'
import { ResultsCard } from '@/components/verification/ResultsCard'
import { HistoryList } from '@/components/verification/HistoryList'
import { toast } from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { verificationKeys } from '@/hooks/useVerification'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function VerifyPage() {
  const { user, isAuthenticated } = useAuth()
  const { verifyCertificate, getVerifications } = useVerification(user)
  const queryClient = useQueryClient()
  
  const [activeView, setActiveView] = useState<'upload' | 'results' | 'history'>('upload')
  const [selectedResult, setSelectedResult] = useState<VerificationRecord | null>(null)

  const handleFileSelect = async (file: File) => {
    try {
      const result = await verifyCertificate.mutateAsync(file)
      setSelectedResult(result)
      setActiveView('results')
      
      // Invalidate history to refresh
      queryClient.invalidateQueries({ queryKey: verificationKeys.list() })
      
      toast.success('Certificate analysis complete!')
    } catch (error: any) {
      console.error('Verification error:', error)
      toast.error(error.message || 'Failed to verify certificate. Please try again.')
    }
  }

  const handleViewHistoryItem = (item: VerificationRecord) => {
    setSelectedResult(item)
    setActiveView('results')
  }

  const handleReset = () => {
    setSelectedResult(null)
    setActiveView('upload')
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-float">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-2 max-w-md">
          <h1 className="text-3xl font-bold tracking-tight text-glow">Secure Verification</h1>
          <p className="text-muted-foreground">
            Please sign in to access the CertiGuard AI verification engine and track your history.
          </p>
        </div>
        <Button size="lg" className="shadow-glow" asChild>
          <a href="/login">Sign In to Continue</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-grid bg-background pt-24 pb-20 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative">
        {/* Loading Overlay */}
        {verifyCertificate.isPending && <AnalysisLoading />}

        <div className="max-w-5xl mx-auto space-y-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-primary">
                <ShieldCheck className="w-6 h-6 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.3em]">CertiGuard AI v2.4</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-glow">
                Verify Authenticity
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Advanced AI analysis to detect forgeries, text shifts, and digital manipulation in certificates.
              </p>
            </div>

            <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)} className="w-full md:w-auto">
              <TabsList className="bg-white/5 border border-white/10 p-1">
                <TabsTrigger value="upload" className="flex gap-2">
                  <Search className="w-4 h-4" /> Upload
                </TabsTrigger>
                <TabsTrigger value="history" className="flex gap-2">
                  <History className="w-4 h-4" /> History
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Main Content Area */}
          <div className="relative">
            {activeView === 'upload' && (
              <div className="animate-fade-in space-y-8">
                <UploadZone 
                  onFileSelect={handleFileSelect} 
                  isPending={verifyCertificate.isPending} 
                />
                
                <Alert className="max-w-2xl mx-auto glass-card border-primary/20 bg-primary/5">
                  <Info className="h-4 w-4 text-primary" />
                  <AlertTitle className="text-primary font-bold">Privacy Note</AlertTitle>
                  <AlertDescription className="text-xs text-primary/80">
                    Uploaded documents are processed by our secure AI engine. Personal data is never stored permanently unless you choose to save the verification to your history.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {activeView === 'results' && selectedResult && (
              <div className="animate-fade-in">
                <ResultsCard 
                  result={selectedResult} 
                  onClose={handleReset} 
                />
              </div>
            )}

            {activeView === 'history' && (
              <div className="animate-fade-in">
                <HistoryList 
                  verifications={getVerifications.data || []} 
                  isLoading={getVerifications.isLoading}
                  onViewDetails={handleViewHistoryItem}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
