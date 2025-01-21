import './styles/styles.css'
import './styles/header.css'
import './styles/registration.css'
import './styles/login.css'
import './styles/signup.css'
import './styles/navbar.css'
import './styles/menu.css'
import './styles/layout.css'
import './styles/noauth.css'
import './styles/vacancy.css'
import './styles/profile.css'
import './styles/role.css'
import './styles/vacancydetail.css'
import './styles/favorites.css'
import './styles/profiledrop.css'
import './styles/modal.css'
import './styles/filters.css'
import './styles/notifications.css'
import './styles/dropdown.css'
import './styles/companyprofile.css'
import './styles/videobg.css'
import './styles/successmessage.css'
import './styles/errormessage.css'
import './styles/create.css'

import { AuthProvider } from '@/AuthContext'

export const metadata = {
  title: "IshCord",
  description: "Найди подходящую работу в Узбекистане!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
};