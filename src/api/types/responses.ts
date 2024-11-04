type URLString = string

export interface APIPaginationInfo {
  first: URLString;
  prev: URLString;
  next: URLString;
  last: URLString;
}

export type APISortDirection = "asc" | "desc"
