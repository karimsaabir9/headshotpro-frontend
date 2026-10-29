import { getDashboardPath } from '@/lib/util';
import { getCurrentUserServer } from '@/lib/util/auth-server';
import { redirect } from 'next/navigation';


const DashboardPage = async () => {

    const user = await getCurrentUserServer();

    const dashboardPath = getDashboardPath(user?.role);
    redirect(dashboardPath);
}

export default DashboardPage