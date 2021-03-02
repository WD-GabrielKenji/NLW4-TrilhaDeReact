import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'; // Importamos e definimos um nome de referencia a importação do CSS deste Componente

export function ExperienceBar(){ // Componente ExperienceBar

    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext) // Passando os valores de 'currentExperience' e 'experienceToNextLevel'

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel; // Progresso da barrinha em acompanhamento com o level

    return(
       <header className={styles.experienceBar}>
           <span>0 xp</span>  
                <div> 
                    <div style={{width: `${percentToNextLevel}%` }}/> 

                    <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}` }}>
                        {currentExperience} xp
                    </span>
                </div>
           <span> {experienceToNextLevel} xp</span>
       </header> 
    ); // Para colocar as definições dos styles para o elemento, utilizamos: className={'nome da importação'.'Nome da classe (definido lá no arquivo proprio do CSS desse componente)'}
      // Fazendo a interpolação para a barrinha acompanhar o level com `${percentToNextLevel}`
}