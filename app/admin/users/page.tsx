'use client';

import { FC, useEffect } from 'react';
import UsersHeader from './components/UsersHeader';
import UsersTable from './components/UsersTable';
import UsersPagination from './components/UsersPagination';
import { useUsersData } from './hooks/useUsersData';
import { useUsersPagination } from './hooks/useUsersPagination';
import LoadingState from '../orders/components/LoadingState';
import ErrorState from '../orders/components/ErrorState';

const AdminUsersPage: FC = () => {
  const { users, meta, loading, error, fetchUsers } = useUsersData();
  const { page, setPage } = useUsersPagination();

  useEffect(() => {
    fetchUsers(page);
  }, [page, fetchUsers]);

  const totalUsers = meta?.total ?? 0;
  const totalPages = meta?.last_page ?? 1;
  const lastUpdated = new Date().toLocaleString('zh-CN');

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <UsersHeader totalUsers={totalUsers} lastUpdated={lastUpdated} />

      <div className="px-6 py-6">
        <UsersTable users={users} />

        <UsersPagination
          currentPage={page}
          setCurrentPage={setPage}
          totalPages={totalPages}
          totalItems={totalUsers}
        />
      </div>
    </div>
  );
};

export default AdminUsersPage;
