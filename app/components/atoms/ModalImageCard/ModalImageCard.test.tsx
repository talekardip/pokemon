/* eslint-disable react/display-name */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalImageCard from './ModalImageCard';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('ModalImageCard', () => {
  const mockPokemonData = {
    id: 1,
    name: 'Bulbasaur',
    image: 'https://example.com/bulbasaur.png',
    types: ['Grass', 'Poison'],
  };

  it('renders the card with correct data', () => {
    render(<ModalImageCard pokemonData={mockPokemonData} />);
    
    expect(screen.getByAltText('image')).toHaveAttribute('src', 'https://example.com/bulbasaur.png');
  });

  it('applies correct color classes based on Pokemon types', () => {
    render(<ModalImageCard pokemonData={mockPokemonData} />);
    
    const cardElement = screen.getByRole('link').firstChild;
    expect(cardElement).toHaveClass('from-GRASS', 'to-POISON');
  });

  it('uses the first type for both classes if only one type is provided', () => {
    const singleTypePokemon = { ...mockPokemonData, types: ['Water'] };
    render(<ModalImageCard pokemonData={singleTypePokemon} />);
    
    const cardElement = screen.getByRole('link').firstChild;
    expect(cardElement).toHaveClass('from-WATER', 'to-WATER');
  });

  it('links to the correct Pokemon page', () => {
    render(<ModalImageCard pokemonData={mockPokemonData} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/pokemon/${mockPokemonData.id}`);
  });

  it('handles undefined pokemonData gracefully', () => {
    console.error = jest.fn(); // Mock console.error
    render(<ModalImageCard pokemonData={undefined} />);
    
    expect(console.error).toHaveBeenCalledWith('pokemonData is undefined');
    expect(screen.queryByRole('link')).toBeInTheDocument(); // The link should still be rendered
  });

  it('uses NORMAL color for unknown Pokemon types', () => {
    const unknownTypePokemon = { ...mockPokemonData, types: ['Unknown'] };
    render(<ModalImageCard pokemonData={unknownTypePokemon} />);
    
    const cardElement = screen.getByRole('link').firstChild;
    expect(cardElement).toHaveClass('from-NORMAL', 'to-NORMAL');
  });
});