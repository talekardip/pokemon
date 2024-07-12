/* eslint-disable react/display-name */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalControlButtons from './ModalControlButtons';
import { endpoints } from '@/app/utils/Endpoints';

// Mock the Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock the BackButton component
jest.mock('../../atoms/BackButton/BackButton', () => {
  return jest.fn(() => <button aria-label="Close">Back</button>);
});

describe('ModalControlButtons', () => {
  it('renders previous, next, and back buttons', () => {
    render(<ModalControlButtons id={5} />);
    
    expect(screen.getByLabelText('Previous')).toBeInTheDocument();
    expect(screen.getByLabelText('Next')).toBeInTheDocument();
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('sets correct href for previous button', () => {
    render(<ModalControlButtons id={5} />);
    
    const prevButton = screen.getByLabelText('Previous').closest('a');
    expect(prevButton).toHaveAttribute('href', `${endpoints.navigatePokemonPage}4`);
  });

  it('sets correct href for next button', () => {
    render(<ModalControlButtons id={5} />);
    
    const nextButton = screen.getByLabelText('Next').closest('a');
    expect(nextButton).toHaveAttribute('href', `${endpoints.navigatePokemonPage}6`);
  });

  it('sets previous button href to 1 when current id is 1', () => {
    render(<ModalControlButtons id={1} />);
    
    const prevButton = screen.getByLabelText('Previous').closest('a');
    expect(prevButton).toHaveAttribute('href', `${endpoints.navigatePokemonPage}1`);
  });

  it('updates button hrefs when id prop changes', () => {
    const { rerender } = render(<ModalControlButtons id={5} />);
    
    rerender(<ModalControlButtons id={10} />);
    
    const prevButton = screen.getByLabelText('Previous').closest('a');
    const nextButton = screen.getByLabelText('Next').closest('a');
    
    expect(prevButton).toHaveAttribute('href', `${endpoints.navigatePokemonPage}9`);
    expect(nextButton).toHaveAttribute('href', `${endpoints.navigatePokemonPage}11`);
  });

  it('renders BackButton component', () => {
    render(<ModalControlButtons id={5} />);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });


  it('renders SVG icons correctly', () => {
    render(<ModalControlButtons id={5} />);
    
    const prevSvg = screen.getByLabelText('Previous').querySelector('svg');
    const nextSvg = screen.getByLabelText('Next').querySelector('svg');
    
    expect(prevSvg).toBeInTheDocument();
    expect(nextSvg).toBeInTheDocument();
  });

  it('has correct CSS classes for buttons', () => {
    render(<ModalControlButtons id={5} />);
    
    const prevButton = screen.getByLabelText('Previous');
    const nextButton = screen.getByLabelText('Next');
    
    expect(prevButton).toHaveClass('text-gray-500', 'hover:text-gray-700', 'focus:outline-none', 'mr-2');
    expect(nextButton).toHaveClass('text-gray-500', 'hover:text-gray-700', 'focus:outline-none');
  });
});