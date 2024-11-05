export interface PaginatedData<T> {
  first: number | null;
  prev: number | null;
  next: number | null;
  last: number | null;
  data: T;
}
