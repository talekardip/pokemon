/* eslint-disable react/display-name */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import EvolutionChain from './EvolutionChain';
import ModalImageCard from '../../atoms/ModalImageCard/ModalImageCard';

jest.mock('axios');
jest.mock('../../atoms/ModalImageCard/ModalImageCard', () => jest.fn(() => <div data-testid="modal-image-card">Mocked ModalImageCard</div>));

const mockChainUrl = 'https://pokeapi.co/api/v2/evolution-chain/1/';
const mockEvolutionChainData = {
  chain: {
    species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
    evolves_to: [
      {
        species: { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
        evolves_to: [
          {
            species: { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon-species/3/' },
          },
        ],
      },
    ],
  },
};

const mockPokemonData = {
  id: 1,
  name: 'bulbasaur',
  sprites: { other: { dream_world: { front_default: 'https://example.com/bulbasaur.png' } } },
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  stats: [],
};

describe('EvolutionChain', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component without crashing', () => {
    render(<EvolutionChain id={1} chainUrl={mockChainUrl} />);
    expect(screen.getByText('Evolution')).toBeInTheDocument();
  });

//   it('fetches and displays the evolution chain data', async () => {
//     axios.get.mockResolvedValueOnce({ data: mockEvolutionChainData });
//     axios.get.mockResolvedValueOnce({ data: mockPokemonData });

//     render(<EvolutionChain id={1} chainUrl={mockChainUrl} />);

//     await waitFor(() => {
//       expect(axios.get).toHaveBeenCalledWith(mockChainUrl);
//       expect(screen.getAllByTestId('modal-image-card')).toHaveLength(3);
//     });
//   });

//   it('displays the correct number of evolution stages', async () => {
//     axios.get.mockResolvedValueOnce({ data: mockEvolutionChainData });
//     axios.get.mockResolvedValueOnce({ data: mockPokemonData });

//     render(<EvolutionChain id={1} chainUrl={mockChainUrl} />);

//     await waitFor(() => {
//       expect(screen.getAllByTestId('modal-image-card')).toHaveLength(3);
//     });
//   });

//   it('displays arrows between evolution stages', async () => {
//     axios.get.mockResolvedValueOnce({ data: mockEvolutionChainData });
//     axios.get.mockResolvedValueOnce({ data: mockPokemonData });

//     render(<EvolutionChain id={1} chainUrl={mockChainUrl} />);

//     await waitFor(() => {
//       expect(screen.getAllByRole('img', { name: 'arrow' })).toHaveLength(2);
//     });
//   });

  it('handles fetch errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<EvolutionChain id={1} chainUrl={mockChainUrl} />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(mockChainUrl);
    });

    expect(screen.queryByTestId('modal-image-card')).not.toBeInTheDocument();
  });

  it('handles an empty evolution chain gracefully', async () => {
    axios.get.mockResolvedValueOnce({ data: { chain: {} } });

    render(<EvolutionChain id={1} chainUrl={mockChainUrl} />);

    await waitFor(() => {
      expect(screen.queryByTestId('modal-image-card')).not.toBeInTheDocument();
    });
  });

  it('renders the correct CSS classes for layout', () => {
    render(<EvolutionChain id={1} chainUrl={mockChainUrl} />);
    expect(screen.getByText('Evolution')).toHaveClass('text-lg', 'font-bold', 'mb-2');
  });
});