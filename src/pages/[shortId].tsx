 import axios from 'axios';
 import { useRouter } from 'next/router';
 import { useEffect } from 'react';

 export default function ShortUrlRedirect() {
  const router = useRouter();
  const { shortId } = router.query;

  useEffect(() => {
    (async () => {
      if (typeof shortId === 'string') {
        const { data } = await axios.get(`/api/shorten?id=${shortId}`);

        const originalUrl = data?.url;

        if (originalUrl) {
          window.location.href = originalUrl;
        } else {
          // Redirect to a custom 404 page or handle the not-found scenario
          router.push('/not-found');
        }
      }
    })()
  }, [shortId, router]);

  return null; // No need to render anything in this component
}
