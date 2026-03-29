import { useState, useEffect, useCallback } from 'react';

const TOKEN_KEY = 'adriele_admin_token';

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(TOKEN_KEY);
    setToken(stored);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const res = await fetch(`https://${projectId}.supabase.co/functions/v1/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) return false;
      const { token: t } = await res.json();
      sessionStorage.setItem(TOKEN_KEY, t);
      setToken(t);
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  const adminFetch = useCallback(async (
    table: string,
    method: string = 'GET',
    id?: string,
    body?: Record<string, unknown>
  ) => {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    const params = new URLSearchParams({ table });
    if (id) params.set('id', id);

    const res = await fetch(`https://${projectId}.supabase.co/functions/v1/admin-api?${params}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': sessionStorage.getItem(TOKEN_KEY) || '',
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (res.status === 401) {
      sessionStorage.removeItem(TOKEN_KEY);
      setToken(null);
      throw new Error('Sessão expirada');
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erro');
    return data.data;
  }, []);

  return { token, isAuthenticated: !!token, isLoading, login, logout, adminFetch };
}
