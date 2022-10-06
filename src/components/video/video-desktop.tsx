import { component$, useClientEffect$, useStyles$ } from "@builder.io/qwik";
import Flicking from "@egjs/flicking";
import { Video } from "~/types/video";
import { formatDateTime, uriVideo } from "~/utils/formater";
import videoStyleDesktop from "./video-desktop.css?inline";

export const VideoDesktop = component$((props: { videos: Video[] }) => {
  useStyles$(videoStyleDesktop);
  useClientEffect$(() => {
    new Flicking("#video", {
      circular: true,
      horizontal: true,
      align: "center",
      autoResize: false,
      duration: 500,
    });
  });

  return (
    <div class="w-full my-4 flex">
      <div id="video" class="flicking-viewport">
        {/* <!-- Additional required wrapper --> */}
        <div class="flicking-camera">
          {/* <!-- Slides --> */}
          {props.videos.map((val) => (
            <div class="video-item">
              <a
                class="video-item__box"
                href={uriVideo(val.id, val.created_at, val.slug)}
              >
                <img
                  class="lozad video-item__image"
                  data-src={val.thumbnail}
                  alt={val.title}
                />
                <div class="video-item__desc">
                  <span class="text-xs text-gray-700">
                    {formatDateTime(val.created_at)} WIB
                  </span>

                  <h3 class="text-base">{val.title}</h3>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
