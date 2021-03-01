// Todos os trechos de codigos que estão presentes neste Document sera carregado uma unica vez

import Document, {Html, Head, Main, NextScript} from 'next/document'; // Importando o componente document de dentro do Next / Importande de dentro do Document as TAGS { Html, Head, Main, NextScript} - 

export default class MyDocument extends Document{ // "Export default class" é era maneira padrão que criava Componentes no React utilizando classes
    render(){
        return(
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet"/>
                </Head>
                <body>
                    <Main/>
                    <NextScript/> 
                </body>
            </Html>
        )
    }
}

/* TAGS do Document: 
    <Head/> - Tudo que for colocada dentro desta TAG o Next coloca dentro do head no HTML automaticamente
    <Main/> - É onde sera mostrada a aplicação (as paginas)
    <NextScript/> - São alguns scripts que o Next injeta na aplicação de forma automatizada 
*/
