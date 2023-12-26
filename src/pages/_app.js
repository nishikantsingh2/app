import '@/styles/globals.css'
import '@/styles/login.css'
import '../../public/css/style.css';

import '@/styles/home.css' 
// import { Provider } from 'react-redux';
// import { store } from '@/redux/store';
import { AuthContextProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }) {
  return<>
  {/* <Provider store={store}> */}
<AuthContextProvider>
   <Component {...pageProps} />
</AuthContextProvider>
{/* </Provider> */}
  
  </> 
}
