import { Html, Head, Main, NextScript } from 'next/document'
import { useSelector } from 'react-redux'

export default function Document() {
  

  return (
    <Html lang="en">
      <Head />
      {/* <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      <link rel="icon" type="svg" sizes="16x16" href="/logos.svg" />
      <script
        type="text/javascript"
        src="https://sdk.monnify.com/plugin/monnify.js"></script>

      <body className=" ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
