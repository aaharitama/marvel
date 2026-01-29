'use client'

import { ReactNode } from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ContentProvider } from '@/contexts/ContentContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ContentProvider>
        {children}
      </ContentProvider>
    </LanguageProvider>
  )
}
