import {
  getCoinsMostValuable,
  getCoin,
  getOnchainCoinDetails,
  getProfileBalances
} from '@zoralabs/coins-sdk';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

const publicClient = createPublicClient({
  chain: base,
  transport: http(process.env.NEXT_PUBLIC_BASE_RPC)
});

export async function fetchTopCoins(limit=20) {
  const res = await getCoinsMostValuable({ count: limit});
  return res.data?.exploreList?.edges.map(e=>e.node)||[];
}

export async function fetchCoinDetails(address) {
  const res = await getCoin({ address, chain: base.id });
  return res.data?.zora20Token||null;
}

export async function fetchCoinHistory(address) {
  return getOnchainCoinDetails({ coin: address, user: undefined, publicClient });
}

export async function searchCreatorsByUsername(handle) {
  const g = await fetch('https://api.zora.co/graphql',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({
    query:`query SearchUsers($q:String!){searchUsers(query:$q,limit:20){items{address handle}}}`, variables:{q:handle}
  })});
  const { data } = await g.json();
  return data.searchUsers.items||[];
}

export async function fetchCoinsByCreator(address, limit=20) {
  const res = await getProfileBalances({ identifier: address, count: limit });
  return res.data?.profile?.coinBalances?.edges.map(e=>e.node.token)||[];
}
