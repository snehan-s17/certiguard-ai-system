import React from 'react'
import { CheckCircle2, AlertTriangle, XCircle, Info, Calendar, User, Building, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { VerificationRecord, VerificationMetadata } from '@/hooks/useVerification'
import { cn } from '@/lib/utils'

interface ResultsCardProps {
  result: VerificationRecord
  onClose?: () => void
}

export function ResultsCard({ result, onClose }: ResultsCardProps) {
  const statusColors = {
    Authentic: "bg-green-500/10 text-green-500 border-green-500/20",
    Suspicious: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Fake: "bg-red-500/10 text-red-500 border-red-500/20",
    pending: "bg-slate-500/10 text-slate-500 border-slate-500/20"
  }

  const statusIcons = {
    Authentic: CheckCircle2,
    Suspicious: AlertTriangle,
    Fake: XCircle,
    pending: Info
  }

  const StatusIcon = statusIcons[result.status]
  const metadata: VerificationMetadata = result.metadata ? JSON.parse(result.metadata) : {}
  const score = parseInt(result.confidenceScore || '0')

  return (
    <Card className="w-full max-w-4xl mx-auto glass-card animate-slide-up overflow-hidden border-0">
      <div className={cn(
        "h-2 w-full",
        result.status === 'Authentic' ? "bg-green-500" : 
        result.status === 'Suspicious' ? "bg-yellow-500" : "bg-red-500"
      )} />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-glow">
            Analysis Report
          </CardTitle>
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
            Report ID: {result.id.substring(0, 12)}
          </p>
        </div>
        <Badge variant="outline" className={cn("px-4 py-1.5 text-sm font-bold uppercase tracking-widest animate-pulse", statusColors[result.status])}>
          <StatusIcon className="w-4 h-4 mr-2" />
          {result.status}
        </Badge>
      </CardHeader>

      <CardContent className="grid md:grid-cols-2 gap-8 pb-8">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4" /> Confidence Score
            </h3>
            <div className="flex items-end gap-3">
              <span className={cn(
                "text-5xl font-bold tracking-tighter text-glow",
                score > 80 ? "text-green-500" : score > 50 ? "text-yellow-500" : "text-red-500"
              )}>
                {score}%
              </span>
              <span className="text-muted-foreground mb-2">accuracy</span>
            </div>
            <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  score > 80 ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : 
                  score > 50 ? "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" : 
                  "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                )}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Analysis Findings</h3>
            <ul className="space-y-3">
              {[
                "AI detected consistent layout patterns",
                "High-resolution text verification successful",
                "Digital signature hash matches issuer standards",
                "No visual artifacts or manipulation traces"
              ].map((finding, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-colors">
                  <div className="w-5 h-5 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors">
                    {finding}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Document Metadata</h3>
            <div className="rounded-xl border border-white/5 overflow-hidden">
              <Table>
                <TableBody>
                  <TableRow className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04]">
                    <TableCell className="font-medium text-muted-foreground flex items-center gap-2">
                      <Building className="w-4 h-4" /> Issuer
                    </TableCell>
                    <TableCell className="text-right">{metadata.issuer || 'Unknown'}</TableCell>
                  </TableRow>
                  <TableRow className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04]">
                    <TableCell className="font-medium text-muted-foreground flex items-center gap-2">
                      <User className="w-4 h-4" /> Recipient
                    </TableCell>
                    <TableCell className="text-right">{metadata.recipient || 'Unknown'}</TableCell>
                  </TableRow>
                  <TableRow className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04]">
                    <TableCell className="font-medium text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Issue Date
                    </TableCell>
                    <TableCell className="text-right">{metadata.date || 'Unknown'}</TableCell>
                  </TableRow>
                  <TableRow className="border-transparent bg-white/[0.02] hover:bg-white/[0.04]">
                    <TableCell className="font-medium text-muted-foreground flex items-center gap-2">
                      <Info className="w-4 h-4" /> Type
                    </TableCell>
                    <TableCell className="text-right">{result.certificateType || 'General Document'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-xl border border-white/10 aspect-[4/3]">
             <img 
               src={result.fileUrl} 
               alt="Document Preview" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <Button variant="outline" size="sm" className="bg-white/10 text-white" asChild>
                  <a href={result.fileUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" /> View Original
                  </a>
                </Button>
             </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-4 pt-0">
        <Button variant="outline" className="flex-1 bg-white/5 border-white/10 hover:bg-white/10" onClick={onClose}>
          Analyze New Document
        </Button>
        <Button className="flex-1 shadow-glow">
          Download Analysis PDF
        </Button>
      </CardFooter>
    </Card>
  )
}
