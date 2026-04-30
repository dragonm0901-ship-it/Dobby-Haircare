import { useEffect } from 'react'

interface PageMeta {
  title: string
  description: string
}

/**
 * Sets the document title and meta description for the current page.
 * Falls back to the default index.html values when the component unmounts.
 */
export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    let metaDesc = document.querySelector('meta[name="description"]')
    const prevDescription = metaDesc?.getAttribute('content') ?? ''

    if (metaDesc) {
      metaDesc.setAttribute('content', description)
    } else {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      metaDesc.setAttribute('content', description)
      document.head.appendChild(metaDesc)
    }

    return () => {
      document.title = prevTitle
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', prevDescription)
    }
  }, [title, description])
}
