import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styelDesktop from "./desktop.css?inline"

export const Desktop = component$(() => {
  useStyles$(styelDesktop)
  return (
    <main class="w-full md:grid md:grid-cols-12 grid-cols-none">
      <div class="w-full col-span-8 col-start-3 mt-48">
        <div class="container mx-auto">
          <div class="flex flex-wrap">
            <div class="lg:w-2/3 w-full flex flex-col space-y-10">
              <Slot name="main" />
            </div>
            <div class="lg:w-1/3 w-full px-4">
              <Slot name="side" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
});
