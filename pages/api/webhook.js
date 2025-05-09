import { sendNotification } from '../../lib/farcaster';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action, coin, fid, contractAddress, creator, coinName } = req.body;
    if (action === 'watch') {
      await redis.sadd(`watchers:${coin.address}`, fid);
      return res.status(200).json({ ok: true });
    }
    const watchers = await redis.smembers(`watchers:${contractAddress}`);
    await Promise.all(
      watchers.map(fid =>
        sendNotification(fid, `Kreator ${creator} memposting koin ${coinName}!`)
      )
    );
    return res.status(200).json({ ok: true, notified: watchers.length });
  }
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} not allowed`);
}
