import '@/styles/globals.css'
import '@/styles/login.css'
import '../../public/css/style.css';
import { AuthContextProvider } from './context/AuthContext';
import '@/styles/home.css' 

export default function App({ Component, pageProps }) {
  return<>

<AuthContextProvider>
   <Component {...pageProps} />
</AuthContextProvider>
 
  
  </> 
}
