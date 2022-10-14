import { component$, Resource, useClientEffect$ } from "@builder.io/qwik";
import {
  DocumentHead,
  RequestHandler,
  useEndpoint,
  useLocation,
} from "@builder.io/qwik-city";
import { easepick } from "@easepick/core";
import { RangePlugin } from "@easepick/range-plugin";
import { PresetPlugin } from "@easepick/preset-plugin";
import { getCategories } from "~/controller/category";
import MobileDetect from "mobile-detect";
import { getPopular } from "~/controller/feature";
import { PopularDesktop } from "~/components/popular/popular-desktop";
import { NavbarDesktop } from "~/components/navbar/navbar-desktop";
import { Desktop } from "~/components/layout/desktop";
import { FooterDesktop } from "~/components/footer/footer-desktop";
import { getArticleIndex } from "~/controller/article";
import { Pagination } from "~/components/pagination/pagination";
import { RecentDesktop } from "~/components/recent/recent-dektop";
// import { easepick, PresetPlugin, RangePlugin } from "@easepick/bundle";

export default component$(() => {
  const loc = useLocation();
  const resource = useEndpoint<typeof onGet>();

  useClientEffect$(() => {
    const [s, e] = loc.query.date ? loc.query.date.split(" - "):"";
    new easepick.create({
      element: "#datepicker",
      css: [
        "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css",
      ],
      zIndex: 50,
      grid: 2,
      calendars: 2,
      readonly: false,
      autoApply: false,
      format: "DD MMM YYYY",
      PresetPlugin: {
        position: "top",
      },
      plugins: [RangePlugin, PresetPlugin],
      setup(picker) {
        const now = new Date();
        const end = e ? new Date(e) : now.getTime();
        const last = now.setDate(now.getDate() - 30);
        const start = s ? new Date(s) : last.valueOf();
        picker.setDateRange(start, end);
        picker.on("click", (evt) => {
          const target = evt.target;
          console.log("target", target);
        });

        picker.on("select", (evt) => {
          const { start, end } = evt.detail;
          console.log(start, end);
          const date =
            start.format("MM-DD-YYYY") + " - " + end.format("MM-DD-YYYY");
          console.log(date);
          window.location.href = "/indeks?date=" + date;
        });
      },
    });
    // console.log(picker.getDate());
  });

  return (
    <>
      <Resource
        value={resource}
        onRejected={() => <div>404: Product not found!!!</div>}
        onResolved={(val) => {
          if (val != null) {
            return (
              <>
                <NavbarDesktop q:slot="header" categories={val.categories} />
                <Desktop>
                  <div
                    q:slot="main"
                    class="border-b-4 border-b-main-blue pb-1 flex flex-row justify-between"
                  >
                    <span class="text-gray-700 text-3xl">Indeks</span>
                    <input
                      type="text"
                      id="datepicker"
                      class="w-2/5 text-gray-900 text-sm cursor-pointer border border-gray-400 rounded-md"
                    />
                  </div>
                  <RecentDesktop q:slot="main" articles={val.articles}/>
                  <Pagination
                    q:slot="main"
                    current={val.page}
                    total={val.totalLength}
                    perPage={20}
                    params={[
                      loc.query.date != undefined
                        ? `date=${loc.query.date}`
                        : "",
                    ]}
                  />
                  <PopularDesktop q:slot="side" popular={val.popular} />
                </Desktop>
                <FooterDesktop q:slot="footer" categories={val.categories} />
              </>
            );
          }
          return <div>404: Product not found!!!</div>;
        }}
      />
    </>
  );
});

export const onGet: RequestHandler<any> = async ({ url, request }) => {
  console.log(request.headers.get("user-agent"));

  const md = new MobileDetect(request.headers.get("user-agent") ?? "");

  const categories = await getCategories();
  const popular = await getPopular();

  const articles = await getArticleIndex(
    url.searchParams.get("date") ?? "",
    url.searchParams.get("page") != undefined
      ? Number(url.searchParams.get("page"))
      : 1,
    20
  );


  return {
    articles: articles.items,
    categories: categories,
    popular: popular,
    totalLength: articles.totalLength,
    page:
      url.searchParams.get("page") != undefined
        ? Number(url.searchParams.get("page"))
        : 1,
    url: url,
    device: {
      mobile: md.mobile() ?? "",
      phone: md.phone() ?? "",
      userAgent: md.userAgent() ?? "",
    },
  };
};

export const head: DocumentHead<any> = ({ data }) => {
  return {
    title: process.env.WEBSITE_TITLE,
    meta: [
      {
        name: "description",
        content: process.env.WEBSITE_DESCRIPTION,
      },
      {
        property: "og:type",
        content: "article",
      },
      {
        property: "og:url",
        content: data.url,
      },
      {
        property: "og:description",
        content: process.env.WEBSITE_DESCRIPTION,
      },
      {
        property: "og:image",
        content: process.env.WEBSITE_LOGO,
      },
      {
        property: "og:site_name",
        content: process.env.WEBSITE_NAME,
      },
    ],
    styles: [
      {
        style: JSON.stringify([
          {
            published_date: "Not Available",
            rubrik: "Not Available",
            penulis: "Not Available",
            editor: "Not Available",
            id: "Not Available",
            source: "Not Available",
            // "topic": "Not Available",
            tag: "Not Available",
            penulis_id: "Not Available",
            editor_id: "Not Available",
          },
        ]),
        key: "dataLayer",
      },
    ],
  };
};
