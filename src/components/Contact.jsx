import React, { useState } from 'react'
import { Reveal } from '../hooks/useReveal.jsx'
import { IconChat, IconMail, IconFacebook, IconArrowRight } from './Icons.jsx'
import { CONTACT } from '../config.js'

const initial = { name: '', org: '', email: '', phone: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`MathLab Inquiry — ${form.name}${form.org ? ` (${form.org})` : ''}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nSchool / Organization: ${form.org}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}\n`
    )
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section className="contact section" id="contact">
      <div className="container contact-inner">
        <div className="contact-copy">
          <Reveal><span className="eyebrow">Get in Touch</span></Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">
              Ready to transform math education <span className="text-accent">in your school?</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="section-lede">
              Book a workshop, explore a CSR partnership, or simply learn more about
              bringing MathLab to your students. We reply to every inquiry.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <ul className="contact-list">
              <li>
                <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer" className="contact-row">
                  <span className="contact-icon contact-icon--green"><IconChat width={20} height={20} /></span>
                  <span>
                    <strong>WhatsApp</strong>
                    <em>{CONTACT.whatsapp}</em>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="contact-row">
                  <span className="contact-icon contact-icon--amber"><IconMail width={20} height={20} /></span>
                  <span>
                    <strong>Email</strong>
                    <em>{CONTACT.email}</em>
                  </span>
                </a>
              </li>
              <li>
                <a href={CONTACT.facebookLink} target="_blank" rel="noreferrer" className="contact-row">
                  <span className="contact-icon contact-icon--navy"><IconFacebook width={20} height={20} /></span>
                  <span>
                    <strong>Facebook</strong>
                    <em>{CONTACT.facebook}</em>
                  </span>
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={280}>
            <p className="contact-person">
              <strong>{CONTACT.person}</strong>
              <span>{CONTACT.role}</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={140} className="contact-form-wrap">
          <form className="contact-form" onSubmit={onSubmit}>
            <h3>Send an Inquiry</h3>
            <p className="contact-form-hint">
              Fields marked <span aria-hidden="true">*</span> are required. Submitting
              opens your email app with the message pre-filled.
            </p>

            <div className="form-grid">
              <label className="form-field">
                <span>Full Name <i>*</i></span>
                <input
                  type="text" required value={form.name} onChange={set('name')}
                  name="name" autoComplete="name" placeholder="e.g. Priya Perera"
                />
              </label>

              <label className="form-field">
                <span>School / Organization</span>
                <input
                  type="text" value={form.org} onChange={set('org')}
                  name="organization" autoComplete="organization"
                  placeholder="e.g. St. Anthony's College"
                />
              </label>

              <label className="form-field">
                <span>Email Address <i>*</i></span>
                <input
                  type="email" required value={form.email} onChange={set('email')}
                  name="email" autoComplete="email" placeholder="you@school.lk"
                />
              </label>

              <label className="form-field">
                <span>Phone / WhatsApp <i>*</i></span>
                <input
                  type="tel" required value={form.phone} onChange={set('phone')}
                  name="phone" autoComplete="tel" placeholder="+94 7X XXX XXXX"
                />
              </label>

              <label className="form-field form-field--full">
                <span>Your Inquiry <i>*</i></span>
                <textarea
                  required rows={5} value={form.message} onChange={set('message')}
                  name="message"
                  placeholder="Tell us about your school, students, or the partnership you have in mind…"
                />
              </label>
            </div>

            <button type="submit" className="btn btn--primary btn--full">
              Send Inquiry
              <IconArrowRight width={18} height={18} />
            </button>

            <p className={`form-status ${sent ? 'is-visible' : ''}`} role="status">
              Your email app should now open with the inquiry pre-filled — just press send.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
