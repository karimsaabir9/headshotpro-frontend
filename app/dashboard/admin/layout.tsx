import { UserRole } from '@/lib/types';
import { getCurrentUserServer } from '@/lib/util/auth-server';
import { redirect } from 'next/navigation';
import React from 'react'

// Reads the authenticated user per request — render as a blocking dynamic route.
export const instant = false;

const AdminLayout = async({children} : {children: React.ReactNode}) => {
    const user = await getCurrentUserServer();

    if(!user || user.role !== UserRole.ADMIN) {
        redirect('/dashboard/user');
    }
  return children
}

export default AdminLayout