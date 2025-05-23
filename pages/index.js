import { useState } from 'react';
import Layout from '../components/Layout';
import CoinList from '../components/CoinList';

export default function Home() {
  const [search, setSearch] = useState('');
  return (
    <Layout>
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari kreator Zora (handle)..."
          className="w-full p-2 border rounded"
        />
      </div>
      <CoinList search={search} />
    </Layout>
  );
}
