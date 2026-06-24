/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Cloudflare Turnstile public site key (safe to expose in the client). */
  readonly VITE_TURNSTILE_SITE_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  turnstile?: {
    render: (
      el: HTMLElement,
      opts: {
        sitekey: string
        callback?: (token: string) => void
        'expired-callback'?: () => void
        'error-callback'?: () => void
        theme?: 'light' | 'dark' | 'auto'
        appearance?: 'always' | 'execute' | 'interaction-only'
      },
    ) => string
    reset: (id?: string) => void
    remove: (id?: string) => void
  }
}
