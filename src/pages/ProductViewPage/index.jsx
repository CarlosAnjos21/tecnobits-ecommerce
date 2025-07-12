import './ProductViewPage.css';
import { useParams } from "react-router-dom";
import products from '../../data/products.json';
import { ButtonPrimary } from '../../components/Buttons/ButtonComponents';


  

function ProductViewPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  // Calcula o percentual de desconto do produto 
  const descontoPercentual = product.priceDiscount && product.priceDiscount > 0
    ? `${Math.round(((product.price - product.priceDiscount) / product.price) * 100)}%`
    : "0%";

  if (!product) {
    return <h2>Produto não encontrado.</h2>;
  }

  return (
    <div className="principal">
      <div className="titulo">
        <p className='textotitulo'>
          {product.category}
          <span className='pasta'>{'>'}</span>
          {product.brand}
        </p>
      </div>
      <div className='conteudo'>
        <div className='esquerda'>
          <img src={product.image} alt={product.name} className='imagem-produto' />
        </div>
        <div className='direita'>
          <div className="direitainfo">
          <p>NOVO</p>
          <h2 className='descricao'>{product.description}</h2>
          <p className='desconto'>De: {product.price.toFixed(2)} por:</p>
          <p className='preco'>R$ {product.priceDiscount}</p>
          <p className='avista'><img src="/public/images/pix.png" alt="pix" className='pix'/>À vista no PIX com {descontoPercentual} de desconto</p>
          <div className='botoes'><ButtonPrimary className='compraragr' >COMPRAR AGORA</ButtonPrimary>
          <ButtonPrimary className='addcarrinho'>ADICIONAR AO CARRINHO</ButtonPrimary></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductViewPage;
