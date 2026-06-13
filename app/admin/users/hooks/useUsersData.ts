'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/utils/api';
import { API_ADMIN_USERS } from '@/constants/api';
import { AdminUser, UsersListMeta } from '@/types/api';

export interface UsersDataResult {
  users: AdminUser[];
  meta: UsersListMeta | null;
  loading: boolean;
  error: string | null;
  fetchUsers: (page: number) => void;
}

export const useUsersData = (): UsersDataResult => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [meta, setMeta] = useState<UsersListMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`${API_ADMIN_USERS}?page=${page}`);
      if (response.success && response.data) {
        setUsers(response.data.data);
        const { data, ...rest } = response.data;
        setMeta(rest as UsersListMeta);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  return { users, meta, loading, error, fetchUsers };
};
