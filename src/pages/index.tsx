// Arquivo da Home principal:
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile"
import { ChallengeBox } from "../components/ChallengeBox";
import styles from "../styles/pages/Home.module.css"

import Head from 'next/head';
import { CountdownProvider } from "../contexts/CountdownContext";

export default function Home() {
  return (
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
    
  )
  // <section> ou até a <div> são boas para serem feitas as divisões no layout da Pagina
}
