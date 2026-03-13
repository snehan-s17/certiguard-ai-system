import { useMutation, useQuery } from '@tanstack/react-query'
import { blink } from '../blink/client'
import { BlinkUser } from '@blinkdotnew/sdk'

// Type definitions for verification records
export interface VerificationMetadata {
  issuer?: string
  recipient?: string
  date?: string
}

export interface VerificationRecord {
  id: string
  userId: string
  fileUrl: string
  fileName: string | null
  certificateType: string | null
  status: 'pending' | 'Authentic' | 'Suspicious' | 'Fake'
  confidenceScore: string | null
  metadata: string | null
  createdAt: string
}

// AI Response type matching the schema
interface VerificationAIResponse {
  status: 'Authentic' | 'Suspicious' | 'Fake'
  confidenceScore: number
  certificateType: string
  findings: string[]
  metadata?: VerificationMetadata
}

// Query keys
export const verificationKeys = {
  all: ['verifications'] as const,
  list: () => [...verificationKeys.all, 'list'] as const,
  detail: (id: string) => [...verificationKeys.all, 'detail', id] as const,
}

/**
 * Hook for verifying certificates and managing verification history.
 * Provides:
 * - verifyCertificate: Upload & analyze a certificate using AI
 * - getVerifications: Fetch user's verification history
 * - getVerification: Fetch a single verification by ID
 */
export function useVerification(user: BlinkUser | null) {
  /**
   * Verify a certificate by uploading and analyzing it with AI.
   * 
   * Process:
   * 1. Upload the file to storage
   * 2. Analyze with AI vision to detect forgery
   * 3. Save the verification record to database
   */
  const verifyCertificate = useMutation({
    mutationFn: async (file: File): Promise<VerificationRecord> => {
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Step 1: Upload file to storage
      const extension = file.name.split('.').pop() || 'jpg'
      const fileName = file.name
      const uploadPath = `certificates/${user.id}/${Date.now()}.${extension}`

      const { publicUrl } = await blink.storage.upload(
        file,
        uploadPath,
        {
          onProgress: (percent) => {
            console.log(`Upload progress: ${percent}%`)
          }
        }
      )

      // Step 2: Analyze with AI using vision (generateText with messages for image analysis)
      const analysisPrompt = `You are the CertiGuard AI Analyst, a world-class forensic expert specializing in certificate authenticity.

Task: Analyze the uploaded certificate image for signs of forgery including:
- Inconsistent fonts
- Layout shifts
- Pixelation in text
- Mismatched logos
- Unusual spacing or alignment issues
- Digital manipulation artifacts
- Improper seals or stamps

Analyze the image and provide your findings in the following JSON format:
{
  "status": "Authentic" | "Suspicious" | "Fake",
  "confidenceScore": number (0-100),
  "certificateType": string (e.g., "Degree Certificate", "Professional License", "Business Certificate"),
  "findings": string[] (list of specific observations about the certificate),
  "metadata": {
    "issuer": string (name of issuing organization if visible),
    "recipient": string (name of certificate holder if visible),
    "date": string (issue date if visible)
  }
}`

      const { text: aiTextResponse } = await blink.ai.generateText({
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: analysisPrompt },
              { type: 'image', image: publicUrl }
            ]
          }
        ]
      })

      // Parse the JSON response from AI
      let aiResponse: VerificationAIResponse
      try {
        // Extract JSON from the response (handle potential markdown code blocks)
        const jsonMatch = aiTextResponse.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
          throw new Error('No JSON found in AI response')
        }
        aiResponse = JSON.parse(jsonMatch[0]) as VerificationAIResponse
      } catch (parseError) {
        console.error('Failed to parse AI response:', aiTextResponse)
        throw new Error('Failed to parse AI analysis results')
      }

      // Step 3: Save verification record to database
      const verification = await blink.db.table<VerificationRecord>('verifications').create({
        userId: user.id,
        fileUrl: publicUrl,
        fileName: fileName,
        certificateType: aiResponse.certificateType,
        status: aiResponse.status,
        confidenceScore: aiResponse.confidenceScore.toString(),
        metadata: aiResponse.metadata ? JSON.stringify(aiResponse.metadata) : null
      })

      return verification as VerificationRecord
    }
  })

  /**
   * Fetch user's verification history
   */
  const getVerifications = useQuery({
    queryKey: verificationKeys.list(),
    queryFn: async (): Promise<VerificationRecord[]> => {
      if (!user) {
        return []
      }

      const verifications = await blink.db.table<VerificationRecord>('verifications').list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        limit: 50
      })

      return verifications as VerificationRecord[]
    },
    enabled: !!user
  })

  /**
   * Fetch a single verification by ID
   */
  const getVerification = (id: string) => useQuery({
    queryKey: verificationKeys.detail(id),
    queryFn: async (): Promise<VerificationRecord | null> => {
      if (!user) {
        return null
      }

      const verification = await blink.db.table<VerificationRecord>('verifications').get(id)
      return verification as VerificationRecord | null
    },
    enabled: !!user && !!id
  })

  return {
    verifyCertificate,
    getVerifications,
    getVerification
  }
}
