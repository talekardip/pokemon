/* eslint-disable react/display-name */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';
import { endpoints } from '@/app/utils/Endpoints';

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

describe('Card', () => {
  const mockPokemonData = {
    id: 1,
    name: 'Bulbasaur',
    image: 'https://example.com/bulbasaur.png',
    types: ['Grass', 'Poison'],
  };

  it('renders the card with correct data', () => {
    render(<Card pokemonData={mockPokemonData} isTitle={true} />);
    
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByAltText('image')).toHaveAttribute('src', 'https://example.com/bulbasaur.png');
  });

  it('does not render title when isTitle is false', () => {
    render(<Card pokemonData={mockPokemonData} isTitle={false} />);
    
    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  it('applies correct color classes based on Pokemon types', () => {
    render(<Card pokemonData={mockPokemonData} isTitle={true} />);
    
    const cardElement = screen.getByRole('link').firstChild;
    expect(cardElement).toHaveClass('from-GRASS', 'to-POISON');
  });

  it('uses the first type for both classes if only one type is provided', () => {
    const singleTypePokemon = { ...mockPokemonData, types: ['Water'] };
    render(<Card pokemonData={singleTypePokemon} isTitle={true} />);
    
    const cardElement = screen.getByRole('link').firstChild;
    expect(cardElement).toHaveClass('from-WATER', 'to-WATER');
  });

  it('links to the correct Pokemon page', () => {
    render(<Card pokemonData={mockPokemonData} isTitle={true} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `${endpoints.navigatePokemonPage}1`);
  });

  it('handles undefined pokemonData gracefully', () => {
    console.error = jest.fn(); // Mock console.error
    render(<Card pokemonData={undefined} isTitle={true} />);
    
    expect(console.error).toHaveBeenCalledWith('pokemonData is undefined');
    expect(screen.queryByRole('link')).toBeInTheDocument(); // The link should still be rendered
  });

  it('uses NORMAL color for unknown Pokemon types', () => {
    const unknownTypePokemon = { ...mockPokemonData, types: ['Unknown'] };
    render(<Card pokemonData={unknownTypePokemon} isTitle={true} />);
    
    const cardElement = screen.getByRole('link').firstChild;
    expect(cardElement).toHaveClass('from-NORMAL', 'to-NORMAL');
  });
});