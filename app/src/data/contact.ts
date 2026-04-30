import { Mail, MapPin, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ContactInfo {
  icon: LucideIcon
  label: string
  value: string
}

export const contactInfo: ContactInfo[] = [
  { icon: Mail, label: 'Email', value: 'hello@dobby.com' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
  { icon: MapPin, label: 'Location', value: 'New York, NY' },
]
