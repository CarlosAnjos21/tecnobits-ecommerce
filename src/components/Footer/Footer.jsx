import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import './footer.css';

const FooterLink = ({ href, children }) => <a href={href}>{children}</a>;

const FooterCopy = ({ children }) => <div>{children}</div>;

const Footer = () => (
  <footer className='footer'>
    {/* div cabeçalho */}
    <div className='footer-header'>
      <img className='footer-logo' src="/images/MaybeFooterLogo.png" alt='Logo da loja' />
      <h3 className='footer-title'>Digital Store</h3>
    </div>

    {/* div descrição */}
    <div>
      <p className='footer-description'>
        Na TecnoBits, tecnologia de ponta está ao seu alcance. Somos uma loja especializada em hardware,
        oferecendo uma seleção completa de processadores, 
        placas de vídeo, CPUs, memórias RAM, SSDs, fontes, periféricos, celulares e muito mais. 
        Trabalhamos com as melhores marcas do mercado para garantir qualidade, desempenho e confiança em cada produto. 
        Seja para montar seu setup gamer, turbinar seu PC ou encontrar o smartphone ideal, aqui você encontra tudo o que precisa com praticidade, segurança e suporte especializado.
      </p>
    </div>

    {/* div links informações */}
    <div className='footer-info'>
      <nav>
        <ul className='footer-info-list'>
          <li className='footer-info-title'>
            <strong>Informações</strong>
          </li>
          <li className='footer-a'>Sobre TecnoBits</li>
          <li className='footer-a'>Segurança</li>
          <li className='footer-a'>Wishlist</li>
          <li className='footer-a'>Blog</li>
          <li className='footer-a'>Trabalhe conosco</li>
          <li className='footer-a'>Meus pedidos</li>
        </ul>
      </nav>
    </div>

    {/* div links categorias */}
    <div className='footer-categories'>
      <nav>
        <ul className='footer-categories-list'>
          <li className='footer-categories-title'>
            <strong>Categorias</strong>
          </li>
          <li className='footer-c'>Smartphone</li>
          <li className='footer-c'>Notebook</li>
          <li className='footer-c'>Headphone</li>
          <li className='footer-c'>Tablet</li>
          <li className='footer-c'>Smart-TV</li>
          <li className='footer-c'>Gadget</li>
          <li className='footer-c'>Processor</li>
          <li className='footer-c'>Placa Gráfica</li>
          <li className='footer-c'>Placa-Mãe</li>
          <li className='footer-c'>Memória Ram</li>
          <li className='footer-c'>Armazenamento</li>
          <li className='footer-c'>Fonte de energia</li>
          <li className='footer-c'>Resfriamento</li>
          <li className='footer-c'>Gabinete</li>
          <li className='footer-c'>Mobile-PC</li>
        </ul>
      </nav>
    </div>

    {/* address */}
    <address className='footer-address'>
      <strong className='footer-address-title'>Contato</strong>
      <p className='p-address'>
        Av. Carlos Jereissati, 100 - Centro, Maracanaú - CE, 61900-010
      </p>
    </address>
    <div className='footer-phone'>
      <p>(85) 9959-3879</p>
    </div>

    <div className='footer-social'>
      {/* Redes sociais */}
      <ul>
        <li className='footer-social-icon-FB'>
          <FontAwesomeIcon icon={faFacebook} />
        </li>
        <li className='footer-social-icon-IG'>
          <FontAwesomeIcon icon={faInstagram} />
        </li>
        <li className='footer-social-icon-TW'>
          <FontAwesomeIcon icon={faTwitter} />
        </li>
      </ul>
    </div>

    {/* div copyright */}
    <div className='footer-copy'>
      <FooterCopy>© {new Date().getFullYear()} Digital College</FooterCopy>
    </div>
    <div className='Ilustrate-Footer-Image'>
      <img src='/images/IlustrateFooterImage.jpg'/>
    </div>

  </footer>
);

export default Footer;
