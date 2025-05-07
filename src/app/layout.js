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
  title: "IshCord - Вакансии в Узбекистане",
  description: "Более 10 0000 вакансий в Узбекистане!",
  other: {
    'google-site-verification': 'd3pJ15Hi_CUbvfyoyE4PA96w36m-wK0QPBCRtKWMOjw',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/ishcord1.PNG" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};