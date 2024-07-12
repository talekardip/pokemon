import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filters from './Filters';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import Slider from '../Slider/Slider';
import SearchBox from '../SearchBox/SearchBox';
import Hamburger from '../Hamburger/Hamburger';

// Mock the Dropdown component
jest.mock('../../atoms/Dropdown/Dropdown', () => jest.fn(() => <div data-testid="dropdown">Mocked Dropdown</div>));

// Mock the Slider component
jest.mock('../slider/Slider', () => jest.fn(() => <div data-testid="slider">Mocked Slider</div>));

// Mock the SearchBox component
jest.mock('../searchBox/SearchBox', () => jest.fn(() => <div data-testid="search-box">Mocked SearchBox</div>));

// Mock the Hamburger component
jest.mock('../Hamburger/Hamburger', () => jest.fn(() => <div data-testid="hamburger">Mocked Hamburger</div>));

describe('Filters', () => {
  beforeEach(() => {
    render(<Filters />);
  });

  it('renders the SearchBox component', () => {
    expect(screen.getByTestId('search-box')).toBeInTheDocument();
  });

  it('renders the Dropdown components in desktop view', () => {
    expect(screen.getAllByTestId('dropdown')).toHaveLength(2);
  });

  it('renders the Slider component in desktop view', () => {
    expect(screen.getByTestId('slider')).toBeInTheDocument();
  });

  it('renders the Hamburger component in mobile view', () => {
    expect(screen.getByTestId('hamburger')).toBeInTheDocument();
  });

});