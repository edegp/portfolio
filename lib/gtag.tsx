import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""

// IDが取得できない場合を想定する
export const existsGaId = GA_ID !== ""

// PVを測定する
export const pageview = (path: string) => {
  window.gtag("config", GA_ID, {
    page_path: path,
  })
}

// GAイベントを発火させる
export const event = ({
  action,
  category,
  label,
  value = "",
}: {
  action: string
  category: string
  label: string
  value?: number | string
}) => {
  if (!existsGaId) {
    return
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label ? JSON.stringify(label) : "",
    value,
  })
}

// _app.tsx で読み込む
export const usePageView = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!existsGaId) {
      return
    }

    const handleRouteChange = (path: string) => {
      pageview(path)
    }
    const url = pathname + searchParams.toString()
    handleRouteChange(url)
  }, [pathname, searchParams])
}

// _app.tsx で読み込む
export const GoogleAnalytics = () =>
  existsGaId && (
    <>
      <script
        // defer
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        // strategy="afterInteractive"
      />
      <script
        // defer
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
              gtag('consent', 'default', {
  'ad_storage': 'granted' ,
  'analytics_storage': 'granted' ,
});

            `,
        }}
        // strategy="afterInteractive"
      />
    </>
  )
