import { component$, useStyles$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { getPaginationItems } from "~/utils/paginate";
import stylePagination from "./pagination.css?inline";

export const Pagination = component$(
  (props: { current: number; params: string[]; total: number; perPage: number }) => {
    useStyles$(stylePagination);

    const loc = useLocation();

    const pagNums = getPaginationItems(props.current,Math.ceil(props.total/props.perPage),7 )
    

    const paramsJoin = (arr: string[], page: number) => {
      const str = arr.join("&");
      if (str != "") {
        return `?${arr.join("&")}&page=${page}`;
      }
      return `?page=${page}`;
    };

    return (
      <div class="pagination">
        <ul class="flex flex-wrap">
          {props.current - 1 != 0 ? (
            <li class="pagination__prev">
              <a href={`${paramsJoin(props.params, props.current - 1)}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 mx-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
              </a>
            </li>
          ) : (
            <></>
          )}

          {pagNums.map((v) => (
            <li
              class={`paginate__item ${
                props.current == v ? "active" : "inactive"
              }`}
            >
              {!isNaN(v) ? (
                props.current == v ? (
                  <span>{v}</span>
                ) : (
                  <a href={`${loc.pathname}${paramsJoin(props.params, v)}`}>
                    {v}
                  </a>
                )
              ) : (
                <span>...</span>
              )}
            </li>
          ))}

          {props.current != Math.ceil(props.total/props.perPage) ? (
            <li class="pagination__next">
              <a href={`${paramsJoin(props.params, props.current + 1)}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 mx-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    );
  }
);
