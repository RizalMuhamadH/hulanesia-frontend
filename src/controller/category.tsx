import { Category } from "~/types/category";
import { ResponseIndex } from "~/types/types";
import { search } from "~/utils/api";

// Promise<ResponseIndex<Category>>
export async function getCategories(): Promise<Category[]> {
  const result = await search({
    index: "category",
    sort: {
      order: {
        order: "asc",
      },
    },
    body: {
      query: {
        match: {
          present: 1,
        },
      },
    },
  });
  const parse: ResponseIndex<Category> = JSON.parse(JSON.stringify(result));

  const categories: Category[] = parse.hits.hits.map<Category>(
    (v) => v._source
  );

  return categories;
}


export async function getCategory(category: string): Promise<Category> {
  const result = await search({
    index: "category",
    body: {
      query: {
        match: {
          slug: category,
        },
      },
    },
  });
  const parse: ResponseIndex<Category> = JSON.parse(JSON.stringify(result));

  const cat: Category = parse.hits.hits.map<Category>(
    (v) => v._source
  )[0];

  return cat;
}