import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      // eslint-disable-next-line no-param-reassign
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html translate="no">
        <Head>
          {/* {process.env.NEXT_PUBLIC_NODE_PRODUCTION && (
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_NODE_PRODUCTION} />
          )}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600&amp;display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo.png" />
          <link rel="manifest" href="/manifest.json" /> */}
          <link rel="shortcut icon" href="/assets/images/favicon.png" type="images/x-icon" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Radley&family=Roboto:wght@300;400;500;700&family=Rubik:wght@300;400;500;600;700&family=Sansita:wght@400;700;800&display=swap"
            rel="stylesheet"
          />
          {/* <link rel="stylesheet" href="/assets/css/tailwind.min.css" />
          <link rel="stylesheet" href="/assets/css/aos.css" />
          <link rel="stylesheet" href="/assets/css/custom.css" /> */}
        </Head>
        <body style={{ background: 'rgba(10,0,6,1)' }}>
          <noscript>
            <iframe
              title="gtag"
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTAG}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
          <div id="portal-root" />
        </body>
        <footer>
          <script src="/assets/js/jquery.min.js" defer />
          <script src="/assets/js/aos.js" defer />
          <script src="/assets/js/app.js" defer />
        </footer>
      </Html>
    )
  }
}

export default MyDocument
