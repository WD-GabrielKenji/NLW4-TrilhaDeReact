import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){

    const {activeChallenge, resetChallenge} = useContext(ChallengesContext); // Definimos como {ActiveChallenge, resetChallenge} para que possa pegar o valor deles / E Usamos o Contexto para usar oq esta definido dentro do arquivo "Challenges.tsx" em qualquer outro componente / Atraves do Provider
    
    return(
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? ( // Quando tem desafios ativos - Ira verificar se o "activeChallenge" não é nulo:
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button 
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={resetChallenge} // Executa a função para resetar o desafio
                        >
                            Falhei
                        </button>

                        <button 
                            type="button"
                            className={styles.challengeSucceededButton}
                        >
                            Completei
                        </button>
                    </footer>

                </div>
            ) : ( // Se o "activeChallenge" for nulo: 
                <div className={styles.challengeNotActive}>
                <strong> Finalize um ciclo para receber um desafio </strong>    
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level completando desafios
                </p>
            </div>
            )}
        </div>
    );
}