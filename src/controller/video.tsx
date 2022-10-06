import { ResponseIndex } from "~/types/types";
import { Video } from "~/types/video";
import { search } from "~/utils/api";

export async function getVideos(): Promise<Video[]> {
  const result = await search({
    index: "video",
    from: 0,
    size: 5,
    _source: ["id", "title", "slug", "thumbnail", "created_at"],
    sort: {
      id: {
        order: "asc",
      },
    },
    body: {
      query: {
        match: {
          status: 1,
        },
      },
    },
  });
  const parse: ResponseIndex<Video> = JSON.parse(JSON.stringify(result));

  const videos: Video[] = parse.hits.hits.map<Video>((v) => v._source);

  return videos;
}
