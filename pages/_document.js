import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* 
        https://github.com/PrismJS/prism-themes 
        https://www.jsdelivr.com/package/npm/prism-themes?path=themes
        */}
        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-vsc-dark-plus.min.css"
        ></link> */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/dracula-prism/dist/css/dracula-prism.css"
        ></link>

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
