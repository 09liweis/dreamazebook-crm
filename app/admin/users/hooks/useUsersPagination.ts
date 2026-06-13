'use client';

import { useState } from 'react';

export const useUsersPagination = () => {
  const [page, setPage] = useState(1);

  return { page, setPage };
};
