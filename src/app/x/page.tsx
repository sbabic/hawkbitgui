import { AppRoutes } from '@/utils/routes';
import { redirect } from 'next/navigation';

export default function DashboardLandingPage() {
  redirect(AppRoutes.deployment);
}
