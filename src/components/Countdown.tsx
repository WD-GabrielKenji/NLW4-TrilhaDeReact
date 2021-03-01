import { useState, useEffect, useContext } from "react"; // Importe do State do React / funcionalidade useEffect - disparar um rook (um efeito colaterar), é ativado quando algo mudar ou algo acontecer ele executa uma função ou dispara um efeito colateral
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Countdown.module.css"

let countdownTimeout: NodeJS.Timeout; // Criando uma variavel com uma variavel global 

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext) // Apos fazer as tipagens em "ChallengesContextData" (la no arquivo "ChallengesContext.tsx") as informações tipadas são trazidas para esse componente
    
    const [time, setTime] = useState(0.1 * 60) // Fazendo o Countdown é segundos
    const [isActive, setIsActive] = useState(false) // Fazendo um Estado para verificar se o countdown esta ativo ou desativado
    const [hasFinished, setHasFinished] = useState(false); // 

    const minutes = Math.floor(time / 60); // Converte o tempo em minutos
    const seconds = time % 60; // Pega o valor o tempo de cima e o restante da divisão referindo aos segundos

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); // Com o ".split('')" dividimos a String em caracteres (25 '2' '5') / ".padStart(2, '0')" verifica a String tem pelo menos 2 caracteres, se não tiver acrescenta um "0" no começo (padStart -> '5' -> '0' '5')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown(){ //Função que inicia o contador
        setIsActive(true);
    }
    
    function resetCountdown(){ // Função para parar o Countdown
        clearTimeout(countdownTimeout); // Limpando o tempo esgotado para cancelar o deplay de 1s para Encerrar a aplicação
        setIsActive(false);
        setTime(0.1 * 60); // Resetando o tempo quando o countdown for parada
    }

    // Para inicar o useEffect: ( 'oq deseja disparar', 'quando deseja executar' )
    useEffect(() => {
        if(isActive && time > 0){ // Se o countdown for ativo && timer for maior que 0
            countdownTimeout = setTimeout(() =>{ // Passando o retorno da variavel tipada no "setTimeout" / "setTimeout" - é uma funcionabilidade que executa em um certo periodo de tempo / No caso executara em 1s:
                setTime(time - 1); // Tirando 1s do tempo
            }, 1000); // "1000" representa o delay 
        }  else if (isActive && time === 0){ // Quando o countdown for finalizado (chegar a 0)
            setHasFinished(true); // Passando um booleano - correspondendo que finalizou
            setIsActive(false); // Só por boa pratica: Só para mudar mesmo o valor do booleano do countdown passando que ele finzalizou só
            startNewChallenge(); // Passando a função para iniciar um novo desafio quando o timer zerar
        }
    }, [isActive, time]) // Executando uma função sempre que o valor de "active" mudar de false -> true / Acrescentando o time - quer dizer vai ativar toda vez que o valor de active mudar e o tempo tbm (ou seja, ficara continuo)

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