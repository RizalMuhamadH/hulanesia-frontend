export interface DocumentIndex<T> {
  _index: string;
  _type: string;
  _id: string;
  _version: number;
  _seq_no: number;
  _primary_term: number;
  _ignored: string[];
  found: boolean;
  _source: T;
}

export interface Shards {
  total: number;
  successful: number;
  skipped: number;
  failed: number;
}

export interface Total {
  value: number;
  relation: string;
}

export interface Hit<T> {
  _index: string;
  _type: string;
  _id: string;
  _score?: any;
  _ignored: string[];
  _source: T;
  sort: number[];
}

export interface Hits<T> {
  total: Total;
  max_score?: any;
  hits: Hit<T>[];
}

export interface ResponseIndex<T> {
  took: number;
  timed_out: boolean;
  _shards: Shards;
  hits: Hits<T>;
}
