import { createClient } from "redis";

const cache = createClient({
  url: "redis://localhost:6380",
});

async function initialCache() {
  // [1] define ttl and create redis connection
  cache.on("connect", () => {
    console.log(`Redis connection established`);
  });

  cache.on("error", (error) => {
    console.error(`Redis error, service degraded: ${error}`);
  });
  // try {
  // await cache.connect();
  // } catch (error) {
  //   console.log(error);
  // }
}

async function getCache(key: string) {
  return await cache.get(key);
}

function setCache(key: string, ttl: number, json: string) {
  cache.setEx(key, ttl, json);
}

export { initialCache, getCache, setCache };
