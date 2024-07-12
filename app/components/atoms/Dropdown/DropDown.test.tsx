import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from './Dropdown';

// Mock the useRouter hook
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Dropdown', () => {
  const mockItems = ['Item 1', 'Item 2', 'Item 3'];
  const mockLabel = 'Test Label';

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the dropdown with the correct label', () => {
    render(<Dropdown items={mockItems} label={mockLabel} />);
    expect(screen.getByText(mockLabel)).toBeInTheDocument();
  });

  it('toggles the dropdown when clicked', () => {
    render(<Dropdown items={mockItems} label={mockLabel} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(screen.getByRole('list')).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('displays all items when dropdown is open', () => {
    render(<Dropdown items={mockItems} label={mockLabel} />);
    fireEvent.click(screen.getByRole('button'));
    
    mockItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('displays "Label + X More" when multiple items are selected', async () => {
    render(<Dropdown items={mockItems} label={mockLabel} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Item 1'));
    fireEvent.click(screen.getByText('Item 2'));

    expect(screen.getByText('Item 1 + 1 More')).toBeInTheDocument();

  });

  it('rotates the arrow icon when dropdown is opened', () => {
    render(<Dropdown items={mockItems} label={mockLabel} />);
    const button = screen.getByRole('button');
    const icon = button.querySelector('svg');

    expect(icon).toHaveClass('rotate-0');
    fireEvent.click(button);
    expect(icon).toHaveClass('rotate-180');
  });
});