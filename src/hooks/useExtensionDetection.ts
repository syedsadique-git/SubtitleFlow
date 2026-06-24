import { useState, useEffect, useCallback } from 'react'

interface ExtensionStatus {
  installed: boolean
  version: string | null
  checking: boolean
}

export function useExtensionDetection(): ExtensionStatus {
  const [status, setStatus] = useState<ExtensionStatus>({
    installed: false,
    version: null,
    checking: true,
  })

  const checkInstalled = useCallback(() => {
    const isInstalled = document.documentElement.dataset.subtitleflowInstalled === 'true'

    if (isInstalled) {
      setStatus({ installed: true, version: '1.0.0', checking: false })
      return
    }

    try {
      window.postMessage({ type: 'SUBTITLEFLOW_PING' }, '*')
    } catch {}

    const timeout = setTimeout(() => {
      setStatus(prev => prev.installed ? prev : { installed: false, version: null, checking: false })
    }, 500)

    function handlePong(event: MessageEvent) {
      if (event.data?.type === 'SUBTITLEFLOW_PONG' && event.data?.installed) {
        clearTimeout(timeout)
        window.removeEventListener('message', handlePong)
        setStatus({ installed: true, version: event.data.version || null, checking: false })
      }
    }

    window.addEventListener('message', handlePong)

    const pingInterval = setInterval(() => {
      try {
        window.postMessage({ type: 'SUBTITLEFLOW_PING' }, '*')
      } catch {}
    }, 200)

    setTimeout(() => {
      clearInterval(pingInterval)
      window.removeEventListener('message', handlePong)
    }, 600)

    return () => {
      clearTimeout(timeout)
      clearInterval(pingInterval)
      window.removeEventListener('message', handlePong)
    }
  }, [])

  useEffect(() => {
    const cleanup = checkInstalled()
    return () => { if (typeof cleanup === 'function') cleanup() }
  }, [checkInstalled])

  return status
}

export function detectBrowser(): string {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('edg/') || ua.includes('edge/')) return 'Edge'
  if (ua.includes('chrome') && !ua.includes('edg')) return 'Chrome'
  if (ua.includes('firefox')) return 'Firefox'
  if (ua.includes('brave')) return 'Brave'
  if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari'
  return 'Unknown'
}

export function detectOS(): string {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('win')) return 'Windows'
  if (ua.includes('mac')) return 'macOS'
  if (ua.includes('linux')) return 'Linux'
  if (ua.includes('android')) return 'Android'
  if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) return 'iOS'
  return 'Unknown'
}
