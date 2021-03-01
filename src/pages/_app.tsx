//Arquivo utilizado para reaproveitamento de estruturas entre as paginas da aplicação e também é recalculado

import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} /> // Adicionamos as estruturas que queremos reaproveitar dentro desse componente
}

export default MyApp
