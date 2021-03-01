// Arquivo da Home principal:
import { CompletedChallenges } from "../components/CompletedChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile"
import styles from "../styles/pages/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <ExperienceBar /> 

      <section>
        <div>
          <Profile />
          <CompletedChallenges/>
        </div>
        <div>

        </div>
      </section>
    </div>
  )
  // <section> ou até a <div> são boas para serem feitas as divisões no layout da Pagina
}
