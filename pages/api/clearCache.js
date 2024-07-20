// pages/api/clearCache.js
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // 기존 캐시와 동일한 객체를 공유해야 함

export default function handler(req, res) {
  cache.flushAll(); // 캐시 초기화
  res.status(200).json({ message: "Cache cleared" });
}
