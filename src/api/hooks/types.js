export interface Metadata {
  hasMore: boolean;
  limit: number;
  skip: number;
  totalCount: number;
}

export interface PagedData<TData> {
  items: TData[];
  metadata: Metadata;
}

export interface ApiOptions {
  skip: number;
  take: number;
}

export interface User {
  id: number;
  name: string;
}

export type HTTPMethod = "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT";
