import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        ></link>

        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
