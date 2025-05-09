import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import {
  fetchTopCoins,
  searchCreatorsByUsername,
  fetchCoinsByCreator
} from '../lib/zora';
import TokenCard from './TokenCard';
import { AuthContext } from '../context/AuthContext';

export default function CoinList({ search }) {
  const { account } = useContext(AuthContext);
  const [coins, setCoins] = useState(null);
  const [watched, setWatched] = useState({});

  useEffect(() => {
    (async () => {
      setCoins(null);
      const list = [];
      try {
        if (search && search.trim()) {
          const creators = await searchCreatorsByUsername(search.trim());
          for (const c of creators) {
            const tokens = await fetchCoinsByCreator(c.address);
            tokens.forEach(t => list.push({ ...t, creatorHandle: c.handle }));
          }
        } else {
          const tops = await fetchTopCoins();
          tops.forEach(t => list.push({ ...t, creatorHandle: null }));
        }
      } catch (err) {
        console.error('[CoinList] error:', err);
      }
      setCoins(list);
    })();
  }, [search]);

  if (coins === null) return <p className="text-center text-gray-500">Memuat koin…</p>;
  if (!coins.length) return <p className="text-center text-gray-500">Tidak ada koin.</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {coins.map(c => (
        <Link key={c.address} href={`/coin/${c.address}`} passHref>
          <a className="block">
            <TokenCard
              coin={c}
              onBuy={() => alert('Buka detail untuk Buy')}
              onSell={() => alert('Buka detail untuk Sell')}
              onWatch={async () => {
                await fetch('/api/webhook', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ action: 'watch', coin: c, fid: account }),
                });
                setWatched(w => ({ ...w, [c.address]: !w[c.address] }));
              }}
              watched={!!watched[c.address]}
            />
          </a>
        </Link>
      ))}
    </div>
  );
}
