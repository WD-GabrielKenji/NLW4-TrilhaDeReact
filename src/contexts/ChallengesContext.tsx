import { createContext, useState, ReactNode } from 'react'; // Importamos de dentro do React o createContext

interface ChallengesContextData { // tipagem dados dados que estão sendo retorna do contexto
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: () => void; // Função sem retorno
    startNewChallenge: () => void; // Função sem retorno
}

interface ChallengesPorviderProps {// Definimos a propriedade tipando o children (definimos os tipos do children)
    children: ReactNode; // ReactNode faz aceitar qualquer elemento filho para children (Podendo ser: componente, um texto, tag html ...) / Porem só para quando o children tambem é um Componente React podemos usar o ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData); // Definindo o valor inicial do contexto como ChallengesContextData (Dizendo que o contexto segue o formato inicial na tipagem)

export function ChallengesPorvider({ children }:ChallengesPorviderProps) { // Função do contexto tipada
    const [level, setLevel] = useState(1); // Criando um State que armazena a informação do Level (Começando no level 1)
    const [currentExperience, setCurrentExperience] = useState(0); // Criando um State que armazena as informações da xp (Começa no xp 0)
    const [challengesCompleted, setChallengesCompleted] = useState(0); // Criando um State que armazena as informações dos desafios completados (Começa em 0)


        function levelUp(){ // Funaão para aumentar o level
            setLevel(level + 1);
        }

        function startNewChallenge(){
            console.log('New Challenge')
        }

        return (

        <ChallengesContext.Provider value={{ 
            level, 
            currentExperience, 
            challengesCompleted, 
            levelUp,
            startNewChallenge
        }}>
            {children}
        </ChallengesContext.Provider>

        );
        // "<ChallengesContext.Provider value={{ level, levelUp}}>" Usando isso temos dentro do componente acesso ao level e uma função que incrementa o level por toda aplicação
} 

