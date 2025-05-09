import React from 'react';
import { WarpletWallet } from '@farcaster/frame-sdk';
import { ethers } from 'ethers';

export function useWarplet() {
  const [signer, setSigner] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      try {
        const warplet = new WarpletWallet();
        await warplet.connect();
        const provider = new ethers.providers.Web3Provider(warplet);
        setSigner(provider.getSigner());
      } catch (e) {
        console.error('Warplet connect error', e);
      }
    })();
  }, []);
  return { signer };
}
