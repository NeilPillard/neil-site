import { describe, expect, it } from 'vitest'
import {
  normalizeEmail,
  normalizeInstagramHandle,
  normalizePhone,
  validateWaitlistInput,
} from './waitlist'

describe('waitlist validation', () => {
  it('normalizes reusable identity fields before they reach the database', () => {
    expect(normalizeEmail('  Student@Example.COM ')).toBe('student@example.com')
    expect(normalizePhone('+974 (5555) 1234')).toBe('+97455551234')
    expect(normalizeInstagramHandle(' @Kouponly.In ')).toBe('kouponly.in')
  })

  it('requires a name, valid email, and international mobile number', () => {
    expect(
      validateWaitlistInput({
        name: 'A',
        email: 'student@example.com',
        phone: '+97455551234',
        instagramHandle: 'student.one',
      }),
    ).toMatchObject({ ok: false })
    expect(
      validateWaitlistInput({
        name: 'Student One',
        email: 'not-an-email',
        phone: '+97455551234',
        instagramHandle: 'student.one',
      }),
    ).toMatchObject({ ok: false })
    expect(
      validateWaitlistInput({
        name: 'Student One',
        email: 'student@example.com',
        phone: '55551234',
        instagramHandle: 'student.one',
      }),
    ).toMatchObject({ ok: false })
  })
})
