import { Article } from "~/types/article";
import { ResponseIndex } from "~/types/types";
import { search } from "~/utils/api";
import { chunk } from "~/utils/formater";

export async function getRecent(): Promise<Article[]> {
  const result = await search({
    index: "article",
    from: 0,
    size: 30,
    _source: [
      "id",
      "title",
      "slug",
      "description",
      "image.media.small",
      "image.caption",
      "category",
      "author.name",
      "author.username",
      "publish_at",
      "created_at",
    ],
    sort: {
      publish_at: {
        order: "desc",
      },
    },
    body: {
      query: {
        match: {
          status: "PUBLISH",
        },
      },
    },
  });
  const parse: ResponseIndex<Article> = JSON.parse(JSON.stringify(result));

  const articles: Article[] = parse.hits.hits.map<Article>((v) => v._source);

  return chunk(articles, 10);
}

export async function getArticleByCategory(
  page: number,
  category: string,
  size: number
): Promise<any> {
  const result = await search({
    index: "article",
    from: page != 0 ? size * (page - 1) : 0,
    size: size,
    _source: [
      "id",
      "title",
      "slug",
      "description",
      "image.media.small",
      "image.caption",
      "feature",
      "category",
      "author.name",
      "author.username",
      "publish_at",
      "created_at",
    ],
    sort: {
      publish_at: {
        order: "desc",
      },
    },
    body: {
      query: {
        bool: {
          must: [
            {
              match: {
                status: "PUBLISH",
              },
            },
            {
              match: {
                "category.slug": category,
              },
            },
          ],
        },
      },
    },
  });

  const parse: ResponseIndex<Article> = JSON.parse(JSON.stringify(result));

  const articles: Article[] = parse.hits.hits.map<Article>((v) => v._source);

  return {
    items: articles,
    totalLength: parse.hits.total.value
  };
}

export async function getArticleIndex(
  param: string,
  page: number,
  size: number
): Promise<any> {
  let start: number;
  let end: number;

  if (param == "") {
    const now = new Date();
    end = now.getTime();
    const last = now.setDate(now.getDate() - 30);
    start = last.valueOf();
  } else {
    const [s, e] = param.split(" - ");
    start = new Date(s).getTime();
    end = new Date(e + " 23:59:59").getTime();
  }

  const result = await search({
    index: "article",
    from: page != 0 ? size * (page - 1) : 0,
    size: size,
    _source: [
      "id",
      "title",
      "slug",
      "description",
      "image.media.small",
      "image.caption",
      "feature",
      "category",
      "author.name",
      "author.username",
      "publish_at",
      "created_at",
    ],
    sort: {
      publish_at: {
        order: "desc",
      },
    },
    body: {
      query: {
        bool: {
          must: [
            {
              range: {
                publish_at: {
                  gte: start,
                  lte: end,
                  boost: 2.0,
                },
              },
            },
            {
              match: {
                status: "PUBLISH",
              },
            },
          ],
        },
      },
    },
  });
  

  const parse: ResponseIndex<Article> = JSON.parse(JSON.stringify(result));

  const articles: Article[] = parse.hits.hits.map<Article>((v) => v._source);

  return {
    items: articles,
    totalLength: parse.hits.total.value
  };
}
