import { component$, useClientEffect$, useStyles$ } from "@builder.io/qwik";
import Flicking from "@egjs/flicking";
import { AutoPlay, Sync } from "@egjs/flicking-plugins";
// import lozad from "lozad";
import { Source } from "~/types/source";
import { formatDateTime } from "~/utils/formater";
import HeadlineStyleDesktop from "./headline-desktop.css?inline";

export const HeadlineDesktop = component$((props: { headline: Source[] }) => {
  useStyles$(HeadlineStyleDesktop);

  useClientEffect$(() => {
    const frist = new Flicking("#headline-show", {
      circular: true,
      bounce: 30,
    });

    const second = new Flicking("#headline-list", {
      bound: true,
      bounce: 30,
      autoResize: true,
    });

    frist.addPlugins(
      new Sync({
        type: "index",
        synchronizedFlickingOptions: [
          {
            flicking: frist,
            isSlidable: true,
          },
          {
            flicking: second,
            isClickable: true,
            activeClass: "active",
            isSlidable: false,
          },
        ],
      })
    );

    frist.addPlugins(
      new AutoPlay({ duration: 4000, direction: "NEXT", stopOnHover: true })
    );

    // lozad(".lozad", {
    //   load: function (el) {
    //     el.src = el.dataset.src;
    //     el.onload = function () {
    //       el.classList.add("fade");
    //     };
    //   },
    // }).observe();
  });

  return (
    <div id="headline" class="w-full rounded-xl">
      <div id="headline-show" class="flicking-viewport">
        <div class="flicking-camera">
          {props.headline.map((val) => (
            <div class="flicking-panel w-full relative">
              <div class="headline-show_content">
                <h1 class="headline-show_content__title">
                  <a href={val.url}>{val.title}</a>
                </h1>
                <div class="headline-show_content__date">
                  {formatDateTime(val.publish_at)} WIB
                </div>
              </div>

              <div class="headline-show_backdrop"></div>

              <img
                class="lozad panel-image headline-show_image"
                alt={val.title}
                data-src={`${process.env.ASSET_STORAGE}${val.image}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div id="headline-list" class="flicking-viewport">
        <div class="flicking-camera">
          {props.headline.map((val) => (
            <div class="flicking-panel thumb has-background-primary">
              <img
                class="lozad thumb-image w-36 h-28 align-middle border-none object-cover"
                alt={val.title}
                data-src={`${process.env.ASSET_STORAGE}${val.image}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
