import moment from "moment-timezone";
moment.locale("id");

export function uriArticle(
  category: string,
  timestamp: number,
  id: number,
  slug: string,
  amp: boolean
) {
  const dateParse = moment.tz(timestamp, "Asia/Jakarta").format("DDMMYYYY");
  return (
    "/" +
    category +
    "/" +
    (amp ? "amp/" : "") +
    id +
    "/" +
    dateParse +
    "/" +
    slug
  );
}

export function uriVideo(id: number, timestamp: number, slug: string) {
  const dateParse = moment.tz(timestamp, "Asia/Jakarta").format("DDMMYYYY");

  return `/video/detail/${id}/${dateParse}/${slug}`;
}

export function uriCategory(slug: string) {
  return `/${slug}`;
}

export function uriUser(username: string) {
  return `/author/@${username}`;
}

export const chunk = (arr: any, size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export function formatDateTime(timestamp: number) {
  return moment.tz(timestamp, "Asia/Jakarta").format("dddd DD MMM YYYY, HH:mm");
}
