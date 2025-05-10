import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import Layout from '../../components/Layout';
import { fetchCoinDetails, fetchCoinHistory } from '../../lib/zora';
import { AuthContext } from '../../context/AuthContext';
import { parseEther } from 'ethers';

export default function CoinDetail() {
  const { signer } = useContext(AuthContext);
  const { query } = useRouter();
  const [coin, setCoin] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!query.address) return;
    fetchCoinDetails(query.address).then(setCoin);
    fetchCoinHistory(query.address).then(data => setHistory(data.events || []));
  }, [query.address]);

  if (!coin) return <Layout><p>Memuat detail...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold">{coin.name} ({coin.symbol})</h1>
      <p>Kreator: {coin.creatorHandle || coin.owner}</p>
      <p>Market Cap: ${coin.marketCap?.toLocaleString() || 'N/A'}</p>

      <div className="mt-4 flex space-x-3">
        <button onClick={() => alert('Buy placeholder')} className="px-4 py-2 bg-green-500 text-white rounded">Buy</button>
        <button onClick={() => alert('Sell placeholder')} className="px-4 py-2 bg-red-500 text-white rounded">Sell</button>
      </div>

      <section className="mt-6">
        <h2 className="font-semibold">Riwayat Transaksi</h2>
        {history.length
          ? history.map((h, i) => (
              <div key={i}>[{h.type}] {h.amount} – {h.txHash.slice(0,10)}…</div>
            ))
          : <p>Tidak ada riwayat.</p>}
      </section>
    </Layout>
  );
}
