import { component$, Resource } from "@builder.io/qwik";
import { DocumentHead, RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import MobileDetect from "mobile-detect";
import { FooterDesktop } from "~/components/footer/footer-desktop";
import { Desktop } from "~/components/layout/desktop";
import { NavbarDesktop } from "~/components/navbar/navbar-desktop";
import { PopularDesktop } from "~/components/popular/popular-desktop";
import { RecentDesktop } from "~/components/recent/recent-dektop";
import { getArticleByCategory } from "~/controller/article";
import { getCategories, getCategory } from "~/controller/category";
import { getPopular } from "~/controller/feature";

export default component$(() => {
  const resource = useEndpoint<typeof onGet>();

  return (
    <>
      <Resource
        value={resource}
        onPending={() => <div>Loading</div>}
        onRejected={() => <div>404: Product not found!!!</div>}
        onResolved={(val) => {
          if (val != null) {
            return (
              <>
                <NavbarDesktop q:slot="header" categories={val.categories} />
                <Desktop>
                  <span q:slot="main" class="label">
                    {val.category.name}
                  </span>
                  <RecentDesktop q:slot="main" articles={val.articles} />

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

export const onGet: RequestHandler<any> = async ({
  url,
  params,
  request,
  response,
  abort,
}) => {
  //   console.log(request.headers.get("user-agent"));
  const md = new MobileDetect(request.headers.get("user-agent") ?? "");
  console.log(params.category);

  const category = await getCategory(params.category);

  if (category == undefined) {
    response.status = 404;
    return null;
  }
  const categories = await getCategories();
  const popular = await getPopular();
  const articles = await getArticleByCategory(
    params.page != undefined ? Number(params.page) : 0,
    params.category,
    20
  );

  abort();

  return {
    categories: categories,
    category: category,
    articles: articles,
    popular: popular,
    page: params.page,
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
    title: data.category.title + (data.page ? ` - Halaman ${data.page}` : ""),
    meta: [
      {
        name: "description",
        content: data.category.description,
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
        content: data.category.description,
      },
      {
        property: "og:image",
        content: process.env.WEBSITE_LOGO
      },
      {
        property: "og:site_name",
        content: data.category.title + (data.page ? ` - Halaman ${data.page}` : ""),
      }
    ],
    styles: [
      {
        style: JSON.stringify([
          {
            published_date: "Not Available",
            rubrik: data.category.title,
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
