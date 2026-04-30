import { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import PillButton from '@/components/PillButton'
import { contactInfo } from '@/data/contact'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <section id="contact" className="relative section-padding bg-black">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — Info */}
          <ScrollReveal direction="up" stagger={0.1}>
            <div className="space-y-8">
              <span className="inline-block px-4 py-1.5 bg-purple/20 text-purple-light text-xs font-bold uppercase tracking-wider rounded-full">
                Get In Touch
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[0.9] tracking-tight text-white">
                Let's
                <br />
                Connect
              </h2>
              <p className="text-lg text-white/40 leading-relaxed">
                Have questions about our products or want to learn more about our mission? We'd love to hear from you.
              </p>
              <div className="space-y-5 pt-4">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center">
                      <Icon size={20} className="text-purple" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-white/30">{label}</p>
                      <p className="font-semibold text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Form */}
          <ScrollReveal direction="up" delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-white mb-2">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 text-white focus:border-purple focus:outline-none transition-colors placeholder:text-white/20"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-white mb-2">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 text-white focus:border-purple focus:outline-none transition-colors placeholder:text-white/20"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-semibold text-white mb-2">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 text-white focus:border-purple focus:outline-none transition-colors placeholder:text-white/20"
                  placeholder="How can we help?"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-white mb-2">Message</label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 text-white focus:border-purple focus:outline-none transition-colors resize-none placeholder:text-white/20"
                  placeholder="Tell us more..."
                  required
                />
              </div>
              <div className="pt-4">
                {isSubmitted ? (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full text-sm font-semibold">
                    ✓ Message Sent Successfully!
                  </div>
                ) : (
                  <PillButton className="bg-purple text-white hover:bg-purple-dark hover:shadow-purple-md">
                    Send Message
                  </PillButton>
                )}
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
