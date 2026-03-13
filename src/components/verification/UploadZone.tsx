import React, { useState, useCallback } from 'react'
import { Upload, File, X, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UploadZoneProps {
  onFileSelect: (file: File) => void
  isPending: boolean
}

export function UploadZone({ onFileSelect, isPending }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
    }
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
    }
  }, [])

  const clearFile = () => setSelectedFile(null)

  const handleAnalyze = () => {
    if (selectedFile) {
      onFileSelect(selectedFile)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div
        className={cn(
          "relative group min-h-[300px] flex flex-col items-center justify-center p-8 rounded-2xl transition-all duration-300",
          "glass-card border-2 border-dashed",
          dragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-white/10 hover:border-white/20",
          selectedFile ? "border-solid border-primary/50" : ""
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleChange}
          disabled={isPending}
        />

        {!selectedFile ? (
          <div className="text-center space-y-4 pointer-events-none">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-10 h-10 text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Drop your certificate here
              </h3>
              <p className="text-muted-foreground">
                Support PDF, PNG, JPG (Max 10MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-6 text-center animate-slide-up">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl animate-pulse" />
              <div className="relative flex items-center justify-center w-full h-full bg-primary/10 border border-primary/30 rounded-xl">
                <File className="w-12 h-12 text-primary" />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  clearFile()
                }}
                className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:scale-110 transition-transform z-20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-1">
              <p className="font-medium text-foreground truncate max-w-xs mx-auto">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-primary text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Ready for AI analysis
            </div>
          </div>
        )}

        {/* Scanner line effect when drag active */}
        {dragActive && <div className="scanner-line" />}
      </div>

      <Button
        className="w-full py-6 text-lg font-bold shadow-glow hover:shadow-primary/40 transition-all duration-500 disabled:opacity-50"
        size="lg"
        disabled={!selectedFile || isPending}
        onClick={handleAnalyze}
      >
        {isPending ? "Analysis in Progress..." : "Analyze Certificate"}
      </Button>
    </div>
  )
}
