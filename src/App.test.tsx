import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('Kouponly investor overview', () => {
  it('renders the complete 10-section narrative with stable deep links', () => {
    const { container } = render(<App />)
    const sections = container.querySelectorAll('.investor-section')

    expect(sections).toHaveLength(10)
    sections.forEach((section, index) => {
      expect(section).toHaveAttribute('id', `slide-${index + 1}`)
    })
  })

  it('publishes the corrected and qualified investor content', () => {
    render(<App />)

    expect(screen.queryByText(/Tcke/i)).not.toBeInTheDocument()
    expect(
      screen.queryByText(
        'Management estimates. Supporting sources are available during diligence.',
      ),
    ).not.toBeInTheDocument()
    expect(screen.queryByText(/allocated today/i)).not.toBeInTheDocument()
    expect(
      screen.getByText(
        'Revenue scales from early traction to ₹1,650 Cr by Year 5, driven by increasing market penetration and geographic expansion.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('1650')).toBeInTheDocument()
    expect(screen.getAllByText('Early launch / market entry')).toHaveLength(2)
    expect(screen.getAllByText('Large-scale market penetration')).toHaveLength(2)
    expect(
      screen.getByText(
        'Built a 350+ partner network across multiple industries in Qatar within the first year.',
      ),
    ).toBeInTheDocument()
  })

  it('keeps direct founder contact routes accessible', () => {
    render(<App />)

    expect(
      screen.getByRole('link', { name: 'neil.j.pillard@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:neil.j.pillard@gmail.com')
    expect(screen.getByRole('link', { name: 'aazamthakur@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:aazamthakur@gmail.com',
    )
    expect(screen.getAllByRole('link', { name: 'info@kouponly.in' })).not.toHaveLength(0)
    expect(
      screen.getByRole('link', { name: 'View Neil Jose Pillard on LinkedIn' }),
    ).toHaveAttribute('href', 'https://www.linkedin.com/in/neilpillard')
    expect(screen.getByRole('link', { name: 'Waitlist' })).toHaveAttribute(
      'href',
      '/waitlist',
    )
  })

  it('exposes one primary heading and a skip link', () => {
    render(<App />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(
      screen.getByRole('link', { name: 'Skip to investor overview' }),
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
    expect(screen.getByRole('link', { name: '@kouponly' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/kouponly/',
    )

    vi.unstubAllGlobals()
    window.history.replaceState(null, '', '/')
  })
})
