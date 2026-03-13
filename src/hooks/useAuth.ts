import { useState, useEffect } from 'react'
import { blink } from '../blink/client'
import { BlinkUser } from '@blinkdotnew/sdk'

export function useAuth() {
  const [user, setUser] = useState<BlinkUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signInWithGoogle: () => blink.auth.signInWithGoogle(),
    signInWithGitHub: () => blink.auth.signInWithGitHub(),
    signOut: () => blink.auth.signOut(),
  }
}
