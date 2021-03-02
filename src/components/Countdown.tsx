import { useContext } from "react"; // Importe do State do React / funcionalidade useEffect - disparar um rook (um efeito colaterar), é ativado quando algo mudar ou algo acontecer ele executa uma função ou dispara um efeito colateral
import { CountdownContext } from "../contexts/CountdownContext";

import styles from "../styles/components/Countdown.module.css"

export function Countdown() {
    const { 
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountdown, 
        resetCountdown, 
    } = useContext(CountdownContext) // Passando todos os valores do contexto do countdown para ca
    
    // Não foi para dentro do contexto pois estamos formatando estes dados porque a parte visual necessita destes dados de uma maneira especifica (Quem esta exigindo estes dados é o layout e não a regra de negocio da aplicação, ou seja, o layout necessita de cada caracteres das string para formar os minutos e o segundos)
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); // Com o ".split('')" dividimos a String em caracteres (25 '2' '5') / ".padStart(2, '0')" verifica a String tem pelo menos 2 caracteres, se não tiver acrescenta um "0" no começo (padStart -> '5' -> '0' '5')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

                {hasFinished ? (
                    <button 
                        disabled
                        className={styles.countdownButton}
                    >
                        Ciclo Encerrado
                    </button>
                ) : ( // Adicionamos isto para os Dois Dotões Abaixo só terem interações enquanto Botão de Encerrado não aparecer / Depois que o countdown é encerrado o botão so apresentara como Ciclo Encerrado, sem interações e sem apresentar os outros botões
                    <>
                        {isActive ? (
                            <button 
                                type="button" 
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                onClick={resetCountdown}
                            >
                                Abandonar Ciclo
                            </button>
                        ) : (
                            <button 
                                type="button" 
                                className={styles.countdownButton}
                                onClick={startCountdown}
                            >
                                Iniciar um Clico
                            </button>
                        )}
                    </>
                )}
        </div> 
    ); // Ternario se para a aplicação indentificar se estiver ativo apresentará o botão de Abandonar ciclo ou se não estiver ativo apresentara o botão de Iniciar um ciclo
       // Dentro do className podemos concatena duas string, herdara e reatribuira os valores presentes em um para o outro
       // if ternario {} podemos usar apenas uma condição passando desta maneira -> {'variavel booleana' && 'condição'}
       
}       