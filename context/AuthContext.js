import React, { createContext, useState, useEffect } from 'react';
import { WarpletWallet } from '@farcaster/frame-sdk';
import { ethers } from 'ethers';

export const AuthContext = createContext({ account: null, signer: null });

export default function AuthProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const warplet = new WarpletWallet();
        await warplet.connect();
        const provider = new ethers.providers.Web3Provider(warplet);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setSigner(signer);
      } catch (e) {
        console.error('Gagal koneksi warplet', e);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ account, signer }}>
      {children}
    </AuthContext.Provider>
  );
}
