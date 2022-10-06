import { component$, useStyles$ } from "@builder.io/qwik";
import { Category } from "~/types/category";
import { uriCategory } from "~/utils/formater";
import footerStyleDesktop from "./footer-desktop.css?inline";

export const FooterDesktop = component$((props: { categories: Category[] }) => {
  useStyles$(footerStyleDesktop);

  return (
    <>
      <footer class="footer-frist">
        <div>
          <img class="w-64" src={process.env.WEBSITE_LOGO} alt=""/>
          <p>{/* {{ config('custom.website.address') }} */}</p>
        </div>
        <div>
          {props.categories.map((val, i) => {
            if (i >= 4) {
              return (
                <a class="link link-hover" href={uriCategory(val.slug)}>
                  {val.name}
                </a>
              );
            }
            return;
          })}
        </div>
        <div>
          {props.categories.map((val, i) => {
            if (i < 4) {
              return (
                <a class="link link-hover" href={uriCategory(val.slug)}>
                  {val.name}
                </a>
              );
            }
            return;
          })}
        </div>
      </footer>

      <footer class="footer-second">
        <div class="grid grid-flow-col gap-4">
          <a class="link link-hover" href="">
            Tentang Kami
          </a>
          <a class="link link-hover" href="">
            Redaksi
          </a>
          <a class="link link-hover" href="">
            Iklan
          </a>
          <a class="link link-hover" href="">
            Karir
          </a>
          <a class="link link-hover" href="">
            Kontak
          </a>
          <a class="link link-hover" href="">
            Pedoman
          </a>
        </div>
      </footer>
    </>
  );
});
