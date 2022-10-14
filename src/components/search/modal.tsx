import {
  component$,
  useClientEffect$,
  useContext,
  useStore,
} from "@builder.io/qwik";
import { modal } from "~/routes/layout";

export const ModalSearch = component$(() => {
  const state = useContext(modal);

  const history = useStore({
    items: [],
    keyword: "",
  });

  useClientEffect$(({track}) => {
    track(history,"items")
    history.items = JSON.parse(localStorage.getItem('search_history') || '[]')
  });

  if (!state.toggle) {
    return <></>;
  }
  return (
    <div
      role="dialog"
      aria-modal="true"
      class="overlay-box"
      aria-labelledby="search-modal-1"
    >
      <div onClick$={() => (state.toggle = false)} class="overlay-box_bg"></div>

      <div class="search">
        <div class="search_bg">
          <div class="search_box">
            <div class="search_box__container">
              <svg
                class="search_icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                onKeyUp$={(event) => {
                  if (event.key == "Enter") {
                    const keyword = (event.target as HTMLInputElement).value
                    // const exist = history.items.includes(keyword);
                    // if (!exist) {
                    //   history.items.push(keyword);
                    //   localStorage.setItem('search_history', JSON.stringify(history.items))
                    // }

                    window.location.href = "/search?q="+keyword
                    
                  }
                }}
                class="search_input"
                placeholder="Pencarian (Tekan 'Enter')"
              />
            </div>

            {/* <div class="history">
              <div class="history_label">
                <span class="text-xs">Riwayat Pencarian</span>
                <button class="text-xs">Hapus</button>
              </div>
              <div class="history_items">
                {
                    state.items.map((v)=>(<button onClick$={()=>{
                        window.location.href = "/search?q="+v
                    }} class="history_item">{v}</button>))
                }
                
              </div>
            </div> */}
          </div>
        </div>

        <button onClick$={() => (state.toggle = false)} class="btn-close">
          <span class="sr-only">Close search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
});
