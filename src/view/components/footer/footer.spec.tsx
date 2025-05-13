import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'

import Footer from './index'

describe('Footer', () => {
  it('should render footer with default text', () => {
    render(<Footer />)
    screen.getByText(/Feito de ❤️ por Matheus Farias/i)
  })
})
