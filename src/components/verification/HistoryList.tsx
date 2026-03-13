import React from 'react'
import { Clock, CheckCircle2, AlertTriangle, XCircle, Search, Trash2, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VerificationRecord } from '@/hooks/useVerification'
import { cn } from '@/lib/utils'

interface HistoryListProps {
  verifications: VerificationRecord[]
  onViewDetails: (verification: VerificationRecord) => void
  isLoading?: boolean
}

export function HistoryList({ verifications, onViewDetails, isLoading }: HistoryListProps) {
  const statusColors = {
    Authentic: "text-green-500 bg-green-500/10 border-green-500/20",
    Suspicious: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    Fake: "text-red-500 bg-red-500/10 border-red-500/20",
    pending: "text-slate-500 bg-slate-500/10 border-slate-500/20"
  }

  const statusIcons = {
    Authentic: CheckCircle2,
    Suspicious: AlertTriangle,
    Fake: XCircle,
    pending: Clock
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 w-full glass-card rounded-xl" />
        ))}
      </div>
    )
  }

  if (verifications.length === 0) {
    return (
      <div className="text-center py-12 glass-card rounded-2xl space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center">
          <Clock className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-foreground">No history yet</p>
          <p className="text-sm text-muted-foreground px-4">
            Uploaded certificates will appear here for quick access.
          </p>
        </div>
      </div>
    )
  }

  return (
    <Card className="glass-card border-0 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" /> Recent Verifications
        </CardTitle>
        <Badge variant="outline" className="text-xs bg-white/5 border-white/10">
          {verifications.length} total
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-white/[0.05]">
          {verifications.map((item) => {
            const StatusIcon = statusIcons[item.status as keyof typeof statusIcons] || Clock
            const date = new Date(item.createdAt).toLocaleDateString()
            
            return (
              <div 
                key={item.id}
                className="group relative flex items-center justify-between p-4 hover:bg-white/[0.04] cursor-pointer transition-smooth"
                onClick={() => onViewDetails(item)}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110",
                    "bg-white/5 border border-white/10 group-hover:border-primary/30"
                  )}>
                    <StatusIcon className={cn(
                      "w-6 h-6",
                      item.status === 'Authentic' ? "text-green-500" : 
                      item.status === 'Suspicious' ? "text-yellow-500" : 
                      item.status === 'Fake' ? "text-red-500" : "text-slate-500"
                    )} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                      {item.fileName || "Unnamed Document"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {date}
                      </p>
                      <span className="text-[10px] text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">
                        {item.certificateType || "General"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={cn("text-[10px] py-0 px-2 uppercase font-bold", statusColors[item.status as keyof typeof statusColors])}>
                    {item.status}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
