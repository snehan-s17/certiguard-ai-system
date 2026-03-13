import React, { useState, useEffect } from 'react'
import { Shield, Brain, Fingerprint, Eye, Search } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export function AnalysisLoading() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { icon: Eye, label: "Scanning document layout..." },
    { icon: Brain, label: "Analyzing text font consistency..." },
    { icon: Fingerprint, label: "Verifying digital signatures..." },
    { icon: Search, label: "Checking for forgery artifacts..." },
    { icon: Shield, label: "Calculating confidence score..." },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 1
      })
    }, 100)

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 2000)

    return () => {
      clearInterval(interval)
      clearInterval(stepInterval)
    }
  }, [steps.length])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md p-8 glass-card space-y-8 text-center relative overflow-hidden">
        <div className="scanner-line h-0.5" />
        
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="relative flex items-center justify-center w-full h-full border-2 border-primary/30 rounded-full">
            <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin" />
            <Shield className="w-16 h-16 text-primary animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-glow">
            CertiGuard AI Analysis
          </h2>
          <div className="flex items-center justify-center gap-2 text-primary font-medium transition-all duration-500">
            {React.createElement(steps[currentStep].icon, { className: "w-5 h-5 animate-bounce" })}
            <span>{steps[currentStep].label}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-widest">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/5" />
        </div>

        <div className="grid grid-cols-5 gap-2">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx <= currentStep ? "bg-primary shadow-glow" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
