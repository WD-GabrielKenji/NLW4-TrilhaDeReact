// Arquivo da Home principal:
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile"
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import styles from "../styles/pages/Home.module.css"
import { ChallengesPorvider } from "../contexts/ChallengesContext";

interface HomeProps { // Tipando o props
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {

  return ( // Interface
    <ChallengesPorvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | Move.it</title>
        </Head>

        <ExperienceBar /> 

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges/>
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesPorvider>
    
  )
  // <section> ou até a <div> são boas para serem feitas as divisões no layout da Pagina
}

// Essa método faz uma chamada a API que busca alguns dados para serem preenchidos na interface / E não podemos fazer uma chamada de API de dentro do componente acima, pois os dados não estarão presentes quando os motores de busca acessarem a aplicação, porque os motores de busca não irão aguardar a chamada ser finaliza, por conta do Next não fazer a chamada antes de ter a interface pronta primeiro.
export const getServerSideProps: GetServerSideProps = async (ctx) => { // Esta função precisa ser exatamente com esse mesmo nome "getServerSideProps" / E precisa ser "async (assincrona)" para funcionar por causa da tipagem do Next.js / Recebe um parametro "ctx" para ter acesso tanto no Browser como no Banco de dados
  // Tudo que é aplicado aqui dentro desse método so funciona no servidor do Node!
  // Passamos aqui as chamadas para pegar os dados

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies; // Pegando todos os cookies da aplicação

  return { // Aqui retornamos os dados para a interface montar e apresentar em tela
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}

