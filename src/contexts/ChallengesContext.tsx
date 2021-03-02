import { createContext, useState, ReactNode } from 'react'; // Importamos de dentro do React o createContext
import challenges from '../../challenges.json' // Importando os desafios lá de dentro do arquivo "challenges.json"

interface Challenge { // Fazemos uma tipagem para a challenge, para tipar o que tem dentro dela
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData { // tipagem dados dados que estão sendo retorna do contexto
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: () => void; // Função sem retorno
    startNewChallenge: () => void; // Função sem retorno
    activeChallenge: Challenge; // Definimos activeChallenge com a tipagem acima
    resetChallenge: () => void;
    experienceToNextLevel: number;
}

interface ChallengesPorviderProps {// Definimos a propriedade tipando o children (definimos os tipos do children)
    children: ReactNode; // ReactNode faz aceitar qualquer elemento filho para children (Podendo ser: componente, um texto, tag html ...) / Porem só para quando o children tambem é um Componente React podemos usar o ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData); // Definindo o valor inicial do contexto como ChallengesContextData (Dizendo que o contexto segue o formato inicial na tipagem)

export function ChallengesPorvider({ children }:ChallengesPorviderProps) { // Função do contexto tipada
    const [level, setLevel] = useState(1); // Criando um State que armazena a informação do Level (Começando no level 1)
    const [currentExperience, setCurrentExperience] = useState(0); // Criando um State que armazena as informações da xp (Começa no xp 0)
    const [challengesCompleted, setChallengesCompleted] = useState(0); // Criando um State que armazena as informações dos desafios completados (Começa em 0)
    
    const [activeChallenge, setActiveChallenge] = useState(null); // Criando um State que armazena as informações das challenges

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2) // Calculo para o Proximo Level 

        function levelUp(){ // Funaão para aumentar o level
            setLevel(level + 1);
        }

        function startNewChallenge(){
            const randomChallengeIndex = Math.floor(Math.random() * challenges.length) // Math.floor ira arredodar os numeros doubles (Math.random ira multiplicar a quantidade de Challenges dentro do arquivo "challenges.json") / Gerando desafios aleatorios
            const challenge = challenges[randomChallengeIndex]; // Recebendo o desafio gerado aleatoriamento pelo "randomChallengeIndex"
            
            setActiveChallenge(challenge); // Passando a challenge random 
        }

        function resetChallenge(){
        setActiveChallenge(null);
        }

        return (

        <ChallengesContext.Provider value={{ 
            level, 
            currentExperience, 
            challengesCompleted, 
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
        }}>
            {children}
        </ChallengesContext.Provider>

        );
        // "Provider" - Faz com que todos os elementos dentro do Provider tenham acesso aos dados (level, currentExperience, challengesCompleted, função levelUp e a função startNewChallenge) dentro do contexto 
} 

