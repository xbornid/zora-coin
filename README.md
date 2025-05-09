# Zora Creator Mini App

This is a Next.js mini app that monitors Zora creators and notifies users via Farcaster (Warpcast) when they post new Zora tokens. It also allows users to view token details and perform basic buy/sell actions via Warplet wallet.

## Features

- List top Zora tokens by market cap.
- Search Zora creators by handle and list their tokens.
- Click token cards to view detailed information and on-chain history.
- Buy/Sell actions with Warplet wallet integration.
- Watch/Unwatch creators to receive notifications via Warpcast.
- Profile page with list of watched creators.

## Getting Started

1. Clone repository:
   ```bash
   git clone <your-repo-url>
   cd zora-creator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Variables:
   Create a `.env.local` file in the root with:
   ```
   NEXT_PUBLIC_BASE_RPC=https://mainnet.base.org
   UPSTASH_REDIS_REST_URL=your-upstash-url
   UPSTASH_REDIS_REST_TOKEN=your-upstash-token
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Deploy to Vercel:
   Push the repository to GitHub and import the project in Vercel. Set the environment variables in Vercel dashboard.
