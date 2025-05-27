import Head from "next/head";

export const getServerSideProps = async ({
  params,
  query,
  req,
  resolvedUrl,
}) => {
  const slug = params?.id;
  const data = await productSingle(slug);

  return {
    props: {
      slug,
      eventData: data?.data?.success ? { ...data?.data?.data } : null,
    },
  };
};

const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dynkejvim/image/upload/v1748335214/o1kxynt46keabweyl0kp.png";

const APP_URL = process.env.NEXT_PUBLIC_FRONTEND;

export function SEOHeader(props) {
  const {
    title,
    description,
    siteName = "Stewart Collection",
    pageUrl,
    ogImage,
    ogType = "website",
  } = props;

  return (
    <Head>
      <title>{title ? title : siteName}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="author" content="Stewart Collection" />
      <link rel="canonical" href={pageUrl ?? APP_URL} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_IE" />
      <meta property="og:url" content={pageUrl ?? APP_URL} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage ?? DEFAULT_OG_IMAGE} />
      <meta property="og:image:alt" content={title || siteName} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="robots" content="index,follow" />
      <meta name="apple-mobile-web-app-title" content="Stewart Collection" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta content="#0B032D" name="theme-color" />
      <meta content="#0B032D" name="msapplication-TileColor" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:site"
        content="https://www.instagram.com/t0010000t?igsh=MTF0cTFubDcwYm5taw%3D%3D&utm_source=qr"
      />
      <meta
        property="twitter:creator"
        content="https://www.instagram.com/t0010000t?igsh=MTF0cTFubDcwYm5taw%3D%3D&utm_source=qr"
      />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage ?? DEFAULT_OG_IMAGE} />
      <meta
        name="twitter:domain"
        content="https://www.instagram.com/t0010000t?igsh=MTF0cTFubDcwYm5taw%3D%3D&utm_source=qr"
      />
      <link rel="shortcut icon" href="/favicon.ico" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: pageUrl,
            name: siteName,
            potentialAction: {
              "@type": "SearchAction",
              target: `${pageUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </Head>
  );
}
