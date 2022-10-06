import { component$, useStyles$ } from "@builder.io/qwik";
import { Popular } from "~/types/popular";
import popularStyeleDesktop from "./popular-desktop.css?inline";

export const PopularDesktop = component$((props: { popular: Popular[] }) => {
  useStyles$(popularStyeleDesktop);
  return (
    <div class="popular">
      <div class="popular_label">
        <span class="popular_label__title">Berita Terpopuler</span>
      </div>

      {props.popular.map((val, i) => (
        <div class="popular_item">
          <div class="flex">
            <div class="popular_item__label">
              <span class="popular_item__label___number">{i + 1}</span>
            </div>
            <div class="popular_item__desc">
              <h3 class="popular_item__desc___title">
                {" "}
                <a href={val.pagePath}>{val.pageTitle}</a>
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
