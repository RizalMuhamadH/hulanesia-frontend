import { Category } from "./category";
import { Image } from "./image";
import { Tag } from "./tag";
import { User } from "./user";

export interface Article {
  id: number;
  title: string;
  slug: string;
  description: string;
  body: string;
  source?: any;
  source_link?: any;
  feature?: any;
  category: Category;
  editor: User;
  author: User;
  related: any[];
  status: string;
  tags: Tag[];
  image: Image;
  meta_description?: any;
  meta_keywords?: any;
  seo_title?: any;
  created_at: number;
  deleted_at?: any;
  publish_at: number;
  timestamp: number;
}
