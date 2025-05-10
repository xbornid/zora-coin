import { Redis } from '@upstash/redis';
import { sendNotification } from '../../lib/wallet';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action, coin, fid } = req.body;
    const key = `watchers:${fid}`;
    if (action === 'watch') {
      await redis.sadd(key, coin.address);
      return res.status(200).json({ ok: true });
    }
    // else handle notify mode as needed…
  }
  res.setHeader('Allow',['POST']);
  res.status(405).end();
}
