import { Popular } from "~/types/popular";
import { Source } from "~/types/source";
import { ResponseIndex } from "~/types/types";
import { search } from "~/utils/api";

export async function getHeadline(): Promise<Source[]> {
  const result = await search({
    index: "headline",
  });
  const parse: ResponseIndex<Source> = JSON.parse(JSON.stringify(result));

  const headline: Source[] = parse.hits.hits.map<Source>((v) => v._source);

  return headline;
}

export async function getEditorChoice(): Promise<Source[]> {
  const result = await search({
    index: "editor_choice",
  });
  const parse: ResponseIndex<Source> = JSON.parse(JSON.stringify(result));

  const editorChoice: Source[] = parse.hits.hits.map<Source>((v) => v._source);

  return editorChoice;
}

export async function getPopular(): Promise<Popular[]> {
  const result = await search({
    index: "popular",
  });
  const parse: ResponseIndex<Popular> = JSON.parse(JSON.stringify(result));

  const popular: Popular[] = parse.hits.hits.map<Popular>((v) => v._source);

  return popular;
}
