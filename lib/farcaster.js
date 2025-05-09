import { Warpcast } from '@farcaster/frame-sdk';

const warp = new Warpcast();

export function sendNotification(fid, message) {
  return warp.cast({ fid, text: message });
}
