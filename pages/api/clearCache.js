// pages/api/clearCache.js
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 }); // 5분 TTL

export default function handler(req, res) {
  cache.flushAll(); // 캐시 초기화
  res.status(200).json({ message: "Cache cleared" });
}
