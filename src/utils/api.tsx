import { Client } from "@elastic/elasticsearch";
import axios from "axios";

import * as dotenv from "dotenv";
dotenv.config();

const client = new Client({
  node: process.env.ELASTICSEARCH_HOST,
});

export async function getRecent(index: string, body: any) {
  console.log("here");

  return await axios.get(process.env.ELASTICSEARCH_HOST + index + "/_search", {
    headers: {
      Accept: "application/json",
    },
    params: body,
  });
}

export async function search(body: any) {
  const result = await client.search(body);
  // const parse: ResponseIndex = JSON.parse(JSON.stringify(result))
  return result;
}

export async function document(body: any) {
  const result = await client.get(body);
  // const parse: DocumentIndex = JSON.parse(JSON.stringify(result))
  return result;
}
