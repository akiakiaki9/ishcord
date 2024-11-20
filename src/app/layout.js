import './styles/styles.css'
import './styles/header.css'
import './styles/registration.css'
import './styles/login.css'
import './styles/signup.css'
import './styles/navbar.css'
import './styles/menu.css'
import './styles/layout.css'

export const metadata = {
  title: "IshCord",
  description: "Найди подходящую работу в Узбекистане!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
};