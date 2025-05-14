export const metadata = {
    title: "Работа в Фергане - лучшие вакансии!",
    description: "Более 10 0000 вакансий в Узбекистане!",
    keywords: [
        "вакансии Фергана", "работа в Фергане", "вакансии Узбекистан",
        "поиск работы", "новые вакансии", "работа без опыта", "удалённая работа"
    ],
    robots: "index, follow",
    authors: [{ name: "IshCord" }],
    openGraph: {
        title: "Вакансии в Фергане - найдите работу быстрее всех!",
        description: "Более 10 0000 вакансий в Узбекистане!",
        url: "https://ishcord.uz",
        siteName: "IshCord",
        locale: "ru_RU",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Вакансии в Фергане - найдите работу быстрее всех!",
        description: "Более 10 0000 вакансий в Узбекистане!"
    },
    metadataBase: new URL("https://ishcord.uz"),
};
export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <body>
                {children}
            </body>
        </html>
    );
};