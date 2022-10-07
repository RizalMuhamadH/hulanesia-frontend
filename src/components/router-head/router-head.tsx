import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap"
        rel="stylesheet"
      />

      <meta name="robots" content="index,follow" />
      <meta name="googlebot-news" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta name="language" content="id" />
      <meta name="geo.country" content="id" />
      <meta http-equiv="content-language" content="In-Id" />
      <meta name="geo.placename" content="Indonesia" />

      <script src="/~partytown/partytown.js"></script>
      <script
        type="text/partytown"
        src="https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js"
      ></script>
      {/* <script type="text/partytown" src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>
      <script type="text/partytown" src="/js/onesignal-init.js"></script> */}

      <meta property="og:site_name" content="" />
      <meta name="twitter:site" content="" />
      <meta name="twitter:title" content="" />

      {head.meta.map((m) => (
        <meta {...m} />
      ))}

      {head.links.map((l) => (
        <link {...l} />
      ))}

      {head.styles.map((s) => {
        if (s.key == "style") {
          return <style {...s.props} dangerouslySetInnerHTML={s.style} />;
        } else {
          return (
            <script
              {...s.props}
              dangerouslySetInnerHTML={(s.key != null ? `${s.key} = ` : "")+s.style}
            />
          );
        }
      })}
    </>
  );
});
