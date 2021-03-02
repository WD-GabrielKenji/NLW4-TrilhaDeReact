import { createContext, useState, ReactNode, useEffect } from 'react'; // Importamos de dentro do React o createContext
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
    completeChallenge: () => void;
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

        useEffect(() => {
            Notification.requestPermission(); // Pedindo permissões para mandar notificações ao usuario
        }, []) // Quando passamos um Array vaziu (, []) como segundo parametro, ele executara uma unica vez a primeira função (() => { codigo }) quando esse componente for exibido em tela

        function levelUp(){ // Funaão para aumentar o level
            setLevel(level + 1);
        }

        function startNewChallenge(){
            const randomChallengeIndex = Math.floor(Math.random() * challenges.length) // Math.floor ira arredodar os numeros doubles (Math.random ira multiplicar a quantidade de Challenges dentro do arquivo "challenges.json") / Gerando desafios aleatorios
            const challenge = challenges[randomChallengeIndex]; // Recebendo o desafio gerado aleatoriamento pelo "randomChallengeIndex"
            
            setActiveChallenge(challenge); // Passando a challenge random 

            new Audio('/notification.mp3').play();

            if (Notification.permission === 'granted') { // Se o usuario permitiu enviar notificações:
                new Notification('Novo desafio', { // 'titulo'
                    body: `Valendo ${challenge.amount}xp!` // body: 'descrição'
                })
            } // Docs para notificações: 
        }

        function resetChallenge(){
        setActiveChallenge(null);
        }

        function completeChallenge(){ // Função de completar o desafios
            if (!activeChallenge){ // Essa função não pode ser chamada sem tem uma challenge ativa
                return;
            }

            const { amount } = activeChallenge; // Pegando o valor do xp da challenge (Descrito lá no arquivo "challenges.json")

            let finalExperience = currentExperience + amount; // Fazendo a adição do xp do usuario + o xp do desafio = no xp final

            if (finalExperience >= experienceToNextLevel){
                finalExperience = finalExperience - experienceToNextLevel; // Faz o calculo de xp entre o up de nivel (ou seja, xp final - o xp para upar = oq sobrou do calculo fica para o proximo level)
                levelUp();
            }

            setCurrentExperience(finalExperience); // Passando o valor final do xp
            setActiveChallenge(null); // Definindo um valor nulo ao desafio para ele deixar de existir ao ser finalizaado
            setChallengesCompleted(challengesCompleted + 1) // Adicionando +1 ao valor dos desafios concluidos

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
            completeChallenge,
        }}>
            {children}
        </ChallengesContext.Provider>

        );
        // "Provider" - Faz com que todos os elementos dentro do Provider tenham acesso aos dados (level, currentExperience, challengesCompleted, função levelUp e a função startNewChallenge) dentro do contexto 
} 

