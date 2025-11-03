import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function SolutionRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/about/solution');
  }, [router]);
  return null;
}
