import { component$, useStyles$ } from "@builder.io/qwik";
import { Source } from "~/types/source";
import { formatDateTime } from "~/utils/formater";
import editorChoiceStyleDesktop from "./editor-choice-desktop.css?inline";

export const EditorChoiceDesktop = component$(
  (props: { editorChoice: Source[] }) => {
    useStyles$(editorChoiceStyleDesktop);
    return (
      <div class="feature">
        <div class="feature_main">
          <div class="relative w-full h-full">
            <div class="feature_main__content">
              <div class="feature_main__content___date">
                {formatDateTime(props.editorChoice[0].publish_at)} WIB
              </div>
              <a href={props.editorChoice[0].url}>
                <h2 class="feature_main__content___title">
                  {props.editorChoice[0].title}
                </h2>
              </a>
            </div>

            <div class="feature_main__backdrop"></div>
            <img
              class="lozad feature_main__image"
              data-src={process.env.ASSET_STORAGE + props.editorChoice[0].image}
              alt={props.editorChoice[0].title}
            />
          </div>
        </div>

        <div class="feature_list">
          {props.editorChoice.map((val, i) => {
            if (i > 1) {
              return (
                <div class="feature_list__item">
                  <div class="feature_list__item___date">
                    {formatDateTime(val.publish_at)} WIB
                  </div>
                  <a href={val.url}>
                    <h2 class="feature_list__item___title">{val.title}</h2>
                  </a>
                </div>
              );
            }
            return <></>;
          })}
        </div>
      </div>
    );
  }
);
