//Arquivo utilizado para reaproveitamento de estruturas entre as paginas da aplicação e também é recalculado (Layout para telas da aplicação)
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
 
  return ( // Adicionamos as estruturas que queremos reaproveitar dentro desse componente "<Component {...pageProps} />"
    <Component {...pageProps} />
  ) 
  
}

export default MyApp
