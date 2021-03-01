import styles from '../styles/components/ExperienceBar.module.css'; // Importamos e definimos um nome de referencia a importação do CSS deste Componente

export function ExperienceBar(){ // Componente ExperienceBar
    return(
       <header className={styles.experienceBar}>
           <span>0 xp</span>  
                <div> 
                    <div style={{width: '50%' }}/> 

                    <span className={styles.currentExperience} style={{ left: '50%' }}>300 xp</span>
                </div>
           <span>600 xp</span>
       </header> 
    ); // Para colocar as definições dos styles para o elemento, utilizamos: className={'nome da importação'.'Nome da classe (definido lá no arquivo proprio do CSS desse componente)'}
}