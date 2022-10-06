import { component$, useStyles$ } from "@builder.io/qwik";
import { Article } from "~/types/article";
import { formatDateTime, uriArticle, uriCategory } from "~/utils/formater";
import recentStyle from "./recent-desktop.css?inline";

export const RecentDesktop = component$((props: { articles: Article[] }) => {
  useStyles$(recentStyle);
  return (
    <>
      {props.articles.map((val) => (
        <div class="recent">
          <div class="recent_desc">
            <span class="recent_desc__category">
              <a href={uriCategory(val.category.slug)}>{val.category.name}</a>
            </span>

            <h2 class="recent_desc__title">
              <a
                href={uriArticle(
                  val.category.slug,
                  val.publish_at,
                  val.id,
                  val.slug,
                  false
                )}
              >
                {val.title}
              </a>
            </h2>
            <div class="flex space-x-1 items-center mt-1">
              {/* <a href={uriUser(val.author.username)} class="recent_desc__author">{val.author.name}</a>
                <div class="text-slate-400">
                    •
                </div> */}
              <span class="recent_desc__date">
                {formatDateTime(val.publish_at)} WIB
              </span>
            </div>
          </div>

          <img
            class="lozad recent_image"
            data-src={`${process.env.ASSET_STORAGE}${val.image.media.small}`}
            alt={val.image.caption}
          />
        </div>
      ))}
    </>
  );
});
