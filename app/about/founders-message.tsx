import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function FoundersMessageRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/about/founders');
  }, [router]);
  return null;
}
