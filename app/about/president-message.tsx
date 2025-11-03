import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function PresidentMessageRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/about/president');
  }, [router]);
  return null;
}
