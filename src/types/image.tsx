import { Media } from "./media";

export interface Image {
  id: number;
  caption: string;
  media: Media;
  photographer?: any;
  source?: any;
  created_at: number;
}
