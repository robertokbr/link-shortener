// pages/api/shorten.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const db = new PrismaClient();

// Simple hash function to generate short URLs
function generateShortUrl(url: string): string {
  const hash = url
  .split('')
  .reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0)
  .toString(36);

  return hash;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (typeof url === 'string') {
      let shortUrl: string;

      const data = await db.urls.findUnique({
        where: {
          url,
        },
      });

      if (!data) {
        shortUrl = generateShortUrl(url);

        await db.urls.create({
          data: {
            url,
            id: shortUrl,
          }
        });
      } else {
        shortUrl = data.id;
      }

      res.status(200).json({ shortUrl });
    } else {
      res.status(400).json({ error: 'Invalid input' });
    }
  }  else if (req.method === "GET") {
    const { id } = req.query;

    if (typeof id === 'string') {
      const data = await db.urls.findUnique({
        where: {
          id,
        },
      });

      if (data) {
        res.status(200).json({ url: data.url });
      } else {
        res.status(404).json({ error: 'URL not found' });
      }
    } else {
      res.status(400).json({ error: 'Invalid input' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
