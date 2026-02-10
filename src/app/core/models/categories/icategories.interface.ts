interface IcategoriesResponse {
  results: number;
  metadata: Metadata;
  data: Icategories[];
}

interface Icategories {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
