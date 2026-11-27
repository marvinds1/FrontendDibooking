import axios from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';
import api, { errorMessage } from './api';

const originalAdapter = api.defaults.adapter;

afterEach(() => {
  api.defaults.adapter = originalAdapter;
  vi.restoreAllMocks();
  localStorage.clear();
});

const reply = (config, status, data = {}) => {
  const response = { data, status, statusText: String(status), headers: {}, config };
  if (status >= 400) {
    const error = new axios.AxiosError('fail', 'ERR', config, null, response);
    return Promise.reject(error);
  }
  return Promise.resolve(response);
};

describe('api client', () => {
  it('attaches the stored access token', async () => {
    localStorage.setItem('token', 'abc');
    let seen;
    api.defaults.adapter = (config) => {
      seen = config.headers.Authorization;
      return reply(config, 200);
    };
    await api.get('/api/lapangan');
    expect(seen).toBe('Bearer abc');
  });

  it('refreshes the token only once for concurrent 401 responses', async () => {
    localStorage.setItem('token', 'expired');
    const refresh = vi.spyOn(axios, 'post').mockImplementation(
      () => new Promise((resolve) => { setTimeout(() => resolve({ data: { token: 'fresh' } }), 5); }),
    );
    api.defaults.adapter = (config) => (
      config.headers.Authorization === 'Bearer fresh' ? reply(config, 200, { ok: true }) : reply(config, 401)
    );

    const results = await Promise.all([api.get('/api/a'), api.get('/api/b'), api.get('/api/c')]);

    expect(refresh).toHaveBeenCalledTimes(1);
    expect(results.every((r) => r.data.ok)).toBe(true);
    expect(localStorage.getItem('token')).toBe('fresh');
  });

  it('clears the token when the refresh fails', async () => {
    localStorage.setItem('token', 'expired');
    vi.spyOn(axios, 'post').mockRejectedValue(new Error('refresh denied'));
    api.defaults.adapter = (config) => reply(config, 401);

    await expect(api.get('/api/history')).rejects.toBeTruthy();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('does not try to refresh on auth endpoints', async () => {
    const refresh = vi.spyOn(axios, 'post');
    api.defaults.adapter = (config) => reply(config, 401);
    await expect(api.post('/api/user/login', {})).rejects.toBeTruthy();
    expect(refresh).not.toHaveBeenCalled();
  });

  it('extracts the server message for the UI', () => {
    expect(errorMessage({ response: { data: { message: 'Slot sudah dipesan' } } }, 'x')).toBe('Slot sudah dipesan');
    expect(errorMessage(new Error('boom'), 'Terjadi kesalahan')).toBe('Terjadi kesalahan');
  });
});
