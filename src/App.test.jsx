import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import api from './api';
import App from './App';

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe('App', () => {
  it('renders the homepage with fields from the API, best rated first', async () => {
    vi.spyOn(api, 'get').mockImplementation(async (url) => {
      if (url === '/api/lapangan') {
        return {
          data: [
            { idField: 'a', title: 'Lapangan Biasa', typeField: 'Futsal', price: 50000, location: 'Kota Semarang', rating: 3.1, rented: 1 },
            { idField: 'b', title: 'Lapangan Juara', typeField: 'Futsal', price: 90000, location: 'Kota Semarang', rating: 4.9, rented: 9 },
          ],
        };
      }
      return { data: {} };
    });

    render(<App />);

    expect((await screen.findAllByText('Rekomendasi Lapangan')).length).toBeGreaterThan(0);
    const titles = await screen.findAllByText(/Lapangan (Juara|Biasa) - \(Futsal\)/);
    expect(titles[0]).toHaveTextContent('Lapangan Juara');
  });
});
