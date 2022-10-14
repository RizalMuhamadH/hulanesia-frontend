import { component$, useContext, useStore, useStyles$ } from "@builder.io/qwik";
import moment from "moment";
import { modal } from "~/routes/layout";
import { Category } from "~/types/category";
import { uriCategory } from "~/utils/formater";
import navbarStyleDesktop from "./navbar-desktop.css?inline";

export const NavbarDesktop = component$((props: { categories: Category[] }) => {
  useStyles$(navbarStyleDesktop);

  const state = useStore({
    date: moment().format("dddd DD MMM YYYY"),
  });


  const search = useContext(modal);

  return (
    <>
      <header class="header">
        <div>
          <div class="bg-white">
            <div class="navbar-main">
              {/* <!-- header utama --> */}
              <div class="navbar-main_social">
                {/* <!-- medsos area --> */}
                {/* <div class="mt-2 text-left text-lg"> */}
                <a
                  href={process.env.SOCIAL_FACEBOOK}
                  class="social-facebook"
                  target="_blank"
                >
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a
                  href={process.env.SOCIAL_TWITTER}
                  class="social-twitter"
                  target="_blank"
                >
                  <i class="fab fa-twitter"></i>
                </a>
                <a
                  href={process.env.SOCIAL_INSTAGRAM}
                  class="social-instagram"
                  target="_blank"
                >
                  <i class="fab fa-instagram"></i>
                </a>
                <a
                  href={process.env.SOCIAL_YOUTUBE}
                  class="social-youtube"
                  target="_blank"
                >
                  <i class="fab fa-youtube"></i>
                </a>
                {/* </div> */}
              </div>
              {/* <!-- end medsos area --> */}

              <div class="navbar-center mx-auto">
                {/* <!-- logo area --> */}
                <a href="/">
                  {/* <img class="logo" src="{{ config('custom.website.image') }}" alt="{{ config('custom.website.title') }}"> */}
                </a>
              </div>
              {/* <!-- end logo area --> */}

              <div class="navbar-end text-center text-base my-auto hidden lg:block">
                {/* <!-- date area --> */}
                <span class="text-main-blue">{state.date} WIB</span>
              </div>
              {/* <!-- end area --> */}
            </div>
            {/* <!-- end row header utama --> */}
          </div>
          <div class="navbar-bg">
            <div class="navbar-container">
              <div class="flex flex-row">
                <div class="px-2 mx-2 navbar-center">
                  <div class="flex items-stretch">
                    {props.categories.map((val) => (
                      <a href={uriCategory(val.slug)} class="navbar-item">
                        {val.name}
                      </a>
                    ))}
                    <a href="/image" class="navbar-item">
                      Image
                    </a>
                    <a href="/video" class="navbar-item">
                      Video
                    </a>
                  </div>
                </div>
                <div class="navbar-end">
                  <button onClick$={()=>{
                    search.toggle = true
                  }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block w-6 h-6 stroke-current"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
});
