import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterModal from './FilterModal';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import Slider from '../Slider/Slider';

// Mock the Dropdown component
jest.mock('../../atoms/Dropdown/Dropdown', () => jest.fn(() => <div data-testid="dropdown">Mocked Dropdown</div>));

// Mock the Slider component
jest.mock('../slider/Slider', () => jest.fn(() => <div data-testid="slider">Mocked Slider</div>));

describe('FilterModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(<FilterModal onClose={mockOnClose} />);
  });

  it('renders the modal with correct title', () => {
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('renders the close button and calls onClose when clicked', () => {
    const closeButton = screen.getByText('×');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders the Dropdown components', () => {
    expect(screen.getAllByTestId('dropdown')).toHaveLength(2);
  });

  it('renders the Slider component', () => {
    expect(screen.getByTestId('slider')).toBeInTheDocument();
  });

  it('renders the reset and apply buttons', () => {
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Apply')).toBeInTheDocument();
  });

  it('applies the correct CSS classes for layout and styling', () => {
    
    const title = screen.getByText('Filters').closest('div');
    expect(title).toHaveClass('flex', 'justify-between', 'items-center', 'mb-4');

    const resetButton = screen.getByText('Reset');
    const applyButton = screen.getByText('Apply');
    expect(resetButton).toHaveClass('px-4', 'py-2', 'border', 'border-gray-300', 'rounded');
    expect(applyButton).toHaveClass('px-4', 'py-2', 'bg-blue-600', 'text-white', 'rounded');
  });

  it('handles reset and apply button clicks', () => {
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    

    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);
    
  });
});