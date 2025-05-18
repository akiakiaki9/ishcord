import './styles/styles.css'
import './styles/header.css'
import './styles/navbar.css'
import './styles/vacancy.css'
import './styles/vacancydetail.css'
import './styles/modal.css'
import './styles/filters.css'
import './styles/footer.css'
import './styles/dropdown.css'
import './styles/videobg.css'
import './styles/about.css'
import './styles/pagination.css'
import './styles/company.css'
import './styles/required.css'
import './styles/vacancies.css'
import Script from 'next/script'

export const metadata = {
  title: "IshCord - Работа в Узбекистане",
  description: "Более 10 0000 вакансий в Узбекистане!",
  keywords: [
    "вакансии", "работа в Узбекистане", "вакансии Узбекистан",
    "поиск работы", "новые вакансии", "работа без опыта", "удалённая работа", "ish", "vakansiya", "работа в Узбекистане", "работа",
    "поиск вакансий", "ish kop", "ishcord", "ish top", "ish qidiruv", "uz ish", "ozbekiston ish", "трудоустройства", "трудовой центр",
    "заработок", "заработать в интернете", "онлайн работа", "заработать онлайн", "online ish", "pul", "pul topish", "ишкорд", "иш"
  ],
  robots: "index, follow",
  authors: [{ name: "IshCord" }],
  openGraph: {
    title: "Вакансии в Узбекистане - найдите работу быстрее всех!",
    description: "Более 10 0000 вакансий в Узбекистане!",
    url: "https://ishcord.uz",
    siteName: "IshCord",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Вакансии в Узбекистане - найдите работу быстрее всех!",
    description: "Более 10 0000 вакансий в Узбекистане!"
  },
  metadataBase: new URL("https://ishcord.uz"),
  other: {
    'google-site-verification': 'd3pJ15Hi_CUbvfyoyE4PA96w36m-wK0QPBCRtKWMOjw',
    'yandex-verification': '32d166ca44a8a7cf',
  },
  icons: {
    icon: "/images/icon.jpg",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta name="google-adsense-account" content="ca-pub-8855410666957906"></meta>
        <link rel="icon" href="/images/ishcord1.PNG" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C5H4MLMDYL"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C5H4MLMDYL');
          `,
          }}
        />
      </head>
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8855410666957906"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
};