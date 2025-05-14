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

export const metadata = {
    title: "IshCord - O'zbekistonda ish",
    description: "O'zbekistonda 100 000 dan ortiq ishlar!",
    keywords: [
        "vakansiyalar", "O'zbekistonda ish", "O'zbekiston vakansiyalari",
        "ish qidirish", "yangi vakansiyalar", "tajribasiz ish", "masofaviy ish", "ish", "vakansiya", "O'zbekistonda ish", "ish",
        "vakansiya qidirish", "ish ko'p", "ishcord", "ish top", "ish qidiruv", "uz ish", "ozbekiston ish", "ishga joylashish", "mehnat markazi",
        "daromad", "internetda pul topish", "onlayn ish", "onlayn pul topish", "online ish", "pul", "pul topish", "ishkord", "ish"
    ],
    robots: "index, follow",
    authors: [{ name: "IshCord" }],
    openGraph: {
        title: "O'zbekistondagi vakansiyalar - ishni eng tez toping!",
        description: "O'zbekistonda 100 000 dan ortiq vakansiyalar!",
        url: "https://ishcord.uz",
        siteName: "IshCord",
        locale: "uz_UZ",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "O'zbekistondagi vakansiyalar - ishni eng tez toping!",
        description: "O'zbekistonda 100 000 dan ortiq ishlar!"
    },
    metadataBase: new URL("https://ishcord.uz"),
    icons: {
        icon: "/images/icon.jpg",
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="uz">
            <head>
                <link rel="icon" href="/images/ishcord1.PNG" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
};