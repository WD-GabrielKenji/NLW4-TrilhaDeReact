import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData { // Tipagem dos dados que seram retornados de Countdown
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout; // Criando uma variavel com uma variavel global

export function CountdownProvider({children}: CountdownProviderProps){ // Serve para rexportar todos os valores deste contexto
    
    const { startNewChallenge } = useContext(ChallengesContext) // Apos fazer as tipagens em "ChallengesContextData" (la no arquivo "ChallengesContext.tsx") as informações tipadas são trazidas para esse componente
    
    const [time, setTime] = useState(0.1 * 60) // Fazendo o Countdown é segundos
    const [isActive, setIsActive] = useState(false) // Fazendo um Estado para verificar se o countdown esta ativo ou desativado
    const [hasFinished, setHasFinished] = useState(false); // 

    const minutes = Math.floor(time / 60); // Converte o tempo em minutos
    const seconds = time % 60; // Pega o valor o tempo de cima e o restante da divisão referindo aos segundos

    function startCountdown(){ //Função que inicia o contador
        setIsActive(true);
    }
    
    function resetCountdown(){ // Função para parar o Countdown
        clearTimeout(countdownTimeout); // Limpando o tempo esgotado para cancelar o deplay de 1s para Encerrar a aplicação
        setIsActive(false);
        setHasFinished(false); // Reseta o botão para iniciar um novo ciclo
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

    
    return (
       <CountdownContext.Provider value={{ // Valores a serem passados
           minutes,
           seconds,
           hasFinished,
           isActive,
           startCountdown,
           resetCountdown,
       }}>
           {children}
       </CountdownContext.Provider>
    )
}