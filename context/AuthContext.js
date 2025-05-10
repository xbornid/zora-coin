import React, { createContext, useState, useEffect } from 'react';
import { sdk } from '@farcaster/frame-sdk';
import { BrowserProvider } from 'ethers';

export const AuthContext = createContext({ account:null, signer:null });

export default function AuthProvider({ children }) {
  const [account,setAccount]=useState(null);
  const [signer,setSigner]=useState(null);
  useEffect(()=>{
    (async()=>{
      try {
        await sdk.actions.signin();
        const ep = sdk.wallet.ethProvider;
        const prov = new BrowserProvider(ep);
        const sig = await prov.getSigner();
        setAccount(await sig.getAddress());
        setSigner(sig);
        sdk.actions.ready();
      } catch(e){ console.error(e) }
    })();
  },[]);
  return <AuthContext.Provider value={{account,signer}}>{children}</AuthContext.Provider>;
}
