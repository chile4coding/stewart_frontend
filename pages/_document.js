import { Html, Head, Main, NextScript } from 'next/document'
import { useSelector } from 'react-redux'

export default function Document() {
  

  return (
    <Html lang="en">
      <Head />
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
