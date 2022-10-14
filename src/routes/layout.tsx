import { component$, createContext, Slot, useClientEffect$, useContextProvider, useStore } from "@builder.io/qwik";
import { ModalSearch } from "~/components/search/modal";
export interface SharedState {
  toggle: boolean;
  items: string[];
}

export const modal = createContext<SharedState>("modal-context");

export default component$(() => {
  const state = useStore<SharedState>({
    toggle: false,
    items: []
  });

  // Assign value (state) to the context (MyContext)
  useContextProvider(modal, state);

  useClientEffect$(({ track }) => {
    track(state,"items")
    state.items = JSON.parse(localStorage.getItem('search_history') || '[]')
    console.log(localStorage);
    
  });
  

  return (
    <>
      <Slot name="header" />
      <Slot />
      <Slot name="footer" />
      <ModalSearch />
    </>
  );
});
