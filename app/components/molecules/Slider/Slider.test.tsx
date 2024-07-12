/* eslint-disable react/display-name */
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slider from './Slider';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the MultiSlider component
jest.mock('../../atoms/Multislider/MultiSlider', () => {
  return function DummyMultiSlider(props) {
    return (
      <div data-testid={`multi-slider-${props.min}-${props.max}`}>
        <input
          type="range"
          min={props.min}
          max={props.max}
          value={props.value[0]}
          onChange={(e) => props.onChange([parseInt(e.target.value), props.value[1]])}
        />
        <input
          type="range"
          min={props.min}
          max={props.max}
          value={props.value[1]}
          onChange={(e) => props.onChange([props.value[0], parseInt(e.target.value)])}
        />
      </div>
    );
  };
});

describe('Slider Component', () => {
  test('renders dropdown button', () => {
    render(<Slider />);
    const dropdownButton = screen.getByText('Dropdown');
    expect(dropdownButton).toBeInTheDocument();
  });

//   test('toggles dropdown on button click', () => {
//     render(<Slider />);
//     const dropdownButton = screen.getByText('Dropdown');
    
//     fireEvent.click(dropdownButton);
//     expect(screen.getByText('Hp')).toBeInTheDocument();
    
//     fireEvent.click(dropdownButton);
//     expect(screen.queryByText('Hp')).not.toBeInTheDocument();
//   });

//   test('renders all stat sliders', async () => {
//     render(<Slider />);
//     fireEvent.click(screen.getByText('Dropdown'));
    
//     // Wait for the dropdown to open
//     await screen.findByText(/hp/i);
  
//     expect(screen.getByText(/hp/i)).toBeInTheDocument();
//     expect(screen.getByText(/attack/i)).toBeInTheDocument();
//     expect(screen.getByText(/defense/i)).toBeInTheDocument();
//     expect(screen.getByText(/speed/i)).toBeInTheDocument();
//     expect(screen.getByText(/spattack/i)).toBeInTheDocument();
//     expect(screen.getByText(/spdef/i)).toBeInTheDocument();
//   });

//   test('updates stats on slider change', async () => {
//     render(<Slider />);
//     fireEvent.click(screen.getByText('Dropdown'));
    
//     const hpSlider = screen.getByTestId('multi-slider-0-200').querySelector('input');
//     fireEvent.change(hpSlider, { target: { value: 100 } });

//     await waitFor(() => {
//       expect(screen.getByTestId('multi-slider-0-200').querySelector('input').value).toBe('100');
//     });
//   });


//   test('calls applyStats when Apply button is clicked', () => {
//     const consoleSpy = jest.spyOn(console, 'log');
//     render(<Slider />);
//     fireEvent.click(screen.getByText('Dropdown'));
    
//     const applyButton = screen.getByText('Apply');
//     fireEvent.click(applyButton);

//     expect(consoleSpy).toHaveBeenCalledWith('Applied Stats:', expect.any(Object));
//     consoleSpy.mockRestore();
//   });
});