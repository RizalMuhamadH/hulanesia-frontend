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
