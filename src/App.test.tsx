import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Kouponly investor overview', () => {
  it('renders the complete 16-section narrative with stable deep links', () => {
    const { container } = render(<App />)
    const sections = container.querySelectorAll('.investor-section')

    expect(sections).toHaveLength(16)
    sections.forEach((section, index) => {
      expect(section).toHaveAttribute('id', `slide-${index + 1}`)
    })
  })

  it('publishes the corrected and qualified investor content', () => {
    render(<App />)

    expect(screen.queryByText(/Tcke/i)).not.toBeInTheDocument()
    expect(screen.getAllByText(/management estimates/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/60% currently specified/i)).toBeInTheDocument()
    expect(screen.getByText(/relative growth indices/i)).toBeInTheDocument()
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
  })

  it('exposes one primary heading and a skip link', () => {
    render(<App />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(
      screen.getByRole('link', { name: 'Skip to investor overview' }),
    ).toHaveAttribute('href', '#main-content')
  })
})
