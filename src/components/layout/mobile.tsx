import { component$, Slot } from "@builder.io/qwik";

export const Mobile = component$(() => {
  return (
    <main class="flex-grow mt-32">
      <Slot />
    </main>
  );
});
