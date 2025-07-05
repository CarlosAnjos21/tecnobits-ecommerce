import { Link } from "react-router-dom";
import { ButtonPrimary } from "../../components/Buttons/ButtonComponents";

NotFoundPage = () => {
    return (
        <div style={{ textAlign: "center", margin: '5rem, 1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItens: 'center', padding: "50px" }}>
            <h2 style={{fontSize: '2rem', fontWeigth: 'bold', }}>404 - Página Não Encontrada</h2>
            <p style={{fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center'}}>Desculpe, a página que você está procurando não existe ou foi movida</p>
            <Link to="/">
                <ButtonPrimary>Voltar para a Página a Home</ButtonPrimary>
            </Link>
        </div>
    )
}

export default NotFoundPage;