import React from 'react';
import { render, screen, within} from '@testing-library/react';
import App from '../App';
import cities from '../data/cities-fr.json';


test('renders search dropdown', () => {

  render(<App />);
  const searchEl = screen.getByLabelText(/Sélectionner votre ville/i);
  expect(searchEl).toBeInTheDocument();
});

test('renders list of cities in search dropdown', () => {
    render(<App />);
    const searchEl = screen.getByLabelText(/Sélectionner votre ville/i);
    const options = within(searchEl).getAllByRole('option');
    expect (options.length).toBe(cities.length);
})

test('should display current weather for the first city', () => {
  render(<App />);

  expect(screen.getByText('Abbeville')).toBeInTheDocument();

})


