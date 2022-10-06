import { component$, Resource, useStyles$ } from "@builder.io/qwik";
import {
  DocumentHead,
  RequestHandler,
  useEndpoint,
} from "@builder.io/qwik-city";
import MobileDetect from "mobile-detect";
import { EditorChoiceDesktop } from "~/components/editor-choice/editor-choice-desktop";
import { HeadlineDesktop } from "~/components/headline/headline-desktop";
import { Desktop } from "~/components/layout/desktop";
import { NavbarDesktop } from "~/components/navbar/navbar-desktop";
import { PopularDesktop } from "~/components/popular/popular-desktop";
import { RecentDesktop } from "~/components/recent/recent-dektop";
import { VideoDesktop } from "~/components/video/video-desktop";
import { getRecent } from "~/controller/article";
import { getCategory } from "~/controller/category";
import { getEditorChoice, getHeadline, getPopular } from "~/controller/feature";
import { getVideos } from "~/controller/video";
// import { lazyLoading } from "~/utils/lazy";
// import { Link } from '@builder.io/qwik-city';
// import {getCache} from '~/redis/cache';
import main from "./main.css?inline";
import flickingStyle from "@egjs/flicking/dist/flicking.css?inline";
import { FooterDesktop } from "~/components/footer/footer-desktop";

export default component$(() => {
  useStyles$(main);
  useStyles$(flickingStyle);
  const resource = useEndpoint<typeof onGet>();

  return (
    <>
      <Resource
        value={resource}
        onResolved={(val) => (
          <>
            <NavbarDesktop q:slot="header" categories={val.categories} />
            <Desktop>
              <HeadlineDesktop q:slot="main" headline={val.headline} />
              <RecentDesktop q:slot="main" articles={val.recent[0]} />
              <EditorChoiceDesktop
                q:slot="main"
                editorChoice={val.editorChoice}
              />
              <RecentDesktop q:slot="main" articles={val.recent[1]} />
              <VideoDesktop q:slot="main" videos={val.videos} />
              <RecentDesktop q:slot="main" articles={val.recent[2]} />
              <PopularDesktop q:slot="side" popular={val.popular} />
            </Desktop>
            <FooterDesktop categories={val.categories}/>
          </>
        )}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
};

export const onGet: RequestHandler<any> = async ({ request }) => {
  console.log(request.headers.get("user-agent"));

  const md = new MobileDetect(request.headers.get("user-agent") ?? "");

  const categories = await getCategory();
  const headline = await getHeadline();
  const recent = await getRecent();
  const editorChoice = await getEditorChoice();
  const videos = await getVideos();
  const popular = await getPopular();

  return {
    // data: recent,
    categories: categories,
    headline: headline,
    recent: recent,
    editorChoice: editorChoice,
    videos: videos,
    popular: popular,
    device: {
      mobile: md.mobile() ?? "",
      phone: md.phone() ?? "",
      userAgent: md.userAgent() ?? "",
    },
  };
};
