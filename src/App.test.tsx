import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('Kouponly student ecosystem home', () => {
  it('renders the complete student ecosystem narrative with stable deep links', () => {
    const { container } = render(<App />)
    const sections = container.querySelectorAll('.investor-section')

    expect(sections).toHaveLength(6)
    sections.forEach((section, index) => {
      expect(section).toHaveAttribute('id', `slide-${index + 1}`)
    })
  })

  it('publishes the student-first product narrative', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /Everything you need to move forward/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'One place for the parts of life that matter.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'More than a discount app.' })).toBeInTheDocument()
    expect(screen.getByText('Turn your skills and creativity into paid gigs, freelance work, and campaigns.')).toBeInTheDocument()
    expect(screen.getByText('Manage offers, view performance, and participate in campaigns built for real student demand.')).toBeInTheDocument()
  })

  it('keeps the student conversion routes accessible', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      'mailto:info@kouponly.in',
    )
    expect(screen.getAllByRole('link', { name: /Join the waitlist/ })).not.toHaveLength(0)
    expect(screen.getAllByRole('link', { name: 'Join the waitlist' })).toHaveLength(2)
    expect(screen.getAllByRole('link', { name: 'Join the waitlist' })[0]).toHaveAttribute(
      'href',
      '/waitlist',
    )
  })

  it('exposes one primary heading and a skip link', () => {
    render(<App />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(
      screen.getByRole('link', { name: 'Skip to Kouponly' }),
    ).toHaveAttribute('href', '#main-content')
  })

  it('renders the waitlist route with the exact live count', async () => {
    window.history.replaceState(null, '', '/waitlist')
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ count: 1234 }),
      }),
    )

    render(<App />)

    expect(await screen.findByText('1,234')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Save your spot.' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Your next student essential.' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Your name' })).toBeRequired()
    expect(screen.getByRole('textbox', { name: /Mobile number/i })).toBeRequired()
    expect(screen.getByRole('textbox', { name: /Instagram handle/i })).toBeRequired()
    expect(screen.getByRole('combobox', { name: 'Country code' })).toHaveValue('IN')
    expect(
      screen.getByRole('button', { name: 'Waiting for verification…' }),
    ).toBeDisabled()
    expect(screen.getByText('Checking verification…')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '@kouponly' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/kouponly/',
    )

    vi.unstubAllGlobals()
    window.history.replaceState(null, '', '/')
  })

  it('enables waitlist signup only after verification succeeds', async () => {
    window.history.replaceState(null, '', '/waitlist')
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ count: 1234 }),
      }),
    )

    let verificationCallback: ((token: string) => void) | undefined
    let verificationErrorCallback: (() => void) | undefined
    const resetTurnstile = vi.fn()
    window.turnstile = {
      render: (_container, options) => {
        verificationCallback = options.callback
        verificationErrorCallback = options['error-callback']
        return 'widget-1'
      },
      remove: vi.fn(),
      reset: resetTurnstile,
    }

    render(<App />)

    expect(
      screen.getByRole('button', { name: 'Waiting for verification…' }),
    ).toBeDisabled()

    await act(async () => verificationErrorCallback?.())

    expect(
      screen.getByText(
        'Verification could not load. Check your connection or privacy blocker.',
      ),
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Retry verification' }))
    expect(resetTurnstile).toHaveBeenCalledWith('widget-1')

    await act(async () => verificationCallback?.('verified-token'))

    expect(screen.getByText('Verification complete.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Join the waitlist' })).toBeEnabled()

    delete window.turnstile
    vi.unstubAllGlobals()
    window.history.replaceState(null, '', '/')
  })

  it('replaces the form with a social confirmation after signup', async () => {
    window.history.replaceState(null, '', '/waitlist')
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) =>
        Promise.resolve({
          ok: true,
          json: async () =>
            url === '/api/waitlist/count' ? { count: 1234 } : { count: 1235 },
        }),
      ),
    )

    let verificationCallback: ((token: string) => void) | undefined
    window.turnstile = {
      render: (_container, options) => {
        verificationCallback = options.callback
        return 'widget-1'
      },
      remove: vi.fn(),
      reset: vi.fn(),
    }

    const { container } = render(<App />)
    await act(async () => verificationCallback?.('verified-token'))

    fireEvent.change(screen.getByRole('textbox', { name: 'Your name' }), {
      target: { value: 'Aarav Sharma' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), {
      target: { value: 'aarav@example.com' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /Mobile number/i }), {
      target: { value: '9876543210' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /Instagram handle/i }), {
      target: { value: 'aarav' },
    })
    fireEvent.submit(container.querySelector('#waitlist-form')!)

    expect(
      await screen.findByRole('heading', { name: 'You’re on the list.' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Instagram · @kouponly' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/kouponly/',
    )
    expect(screen.getByRole('link', { name: 'LinkedIn · Kouponly' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/kouponly/',
    )

    delete window.turnstile
    vi.unstubAllGlobals()
    window.history.replaceState(null, '', '/')
  })

  it('renders a privacy policy at its stable route', () => {
    window.history.replaceState(null, '', '/privacy')

    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Your information, plainly explained.' }),
    ).toBeInTheDocument()
    expect(screen.getByText('What we collect')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Join the waitlist' })).toHaveAttribute(
      'href',
      '/waitlist',
    )

    window.history.replaceState(null, '', '/')
  })
})
