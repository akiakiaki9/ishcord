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

export const metadata = {
  title: "IshCord",
  description: "Найди подходящую работу в Узбекистане!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
      </body>
    </html>
  );
};