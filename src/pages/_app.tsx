//Arquivo utilizado para reaproveitamento de estruturas entre as paginas da aplicação e também é recalculado (Layout para telas da aplicação)
import { useState } from 'react';
import '../styles/global.css'

import { ChallengesPorvider } from '../contexts/ChallengesContext'
import { CountdownProvider } from '../contexts/CountdownContext';

function MyApp({ Component, pageProps }) {
 
  return (
    <ChallengesPorvider>
        <Component {...pageProps} />
    </ChallengesPorvider>
  ) // Adicionamos as estruturas que queremos reaproveitar dentro desse componente "<Component {...pageProps} />"
  
}

export default MyApp
