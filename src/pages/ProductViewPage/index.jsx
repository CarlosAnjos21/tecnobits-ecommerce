import './ProductViewPage.css';
import { useParams } from "react-router-dom";
import products from '../../data/products.json';

function ProductViewPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2>Produto não encontrado.</h2>;
  }

  return (
    <div className="principal">
      <div className="esquerda">
      <img
        src={product.image}
        alt={product.name} className='imagem-produto'
      /></div>
      <div className="direita">
        <div className='conteudo'>
      <p className='descricao'>{product.description}</p>
      <p className="desconto"> De: {product.priceDiscount} por:</p>
      <h2>R$ {product.price.toFixed(2)}</h2></div></div>
    </div>
  );
}

export default ProductViewPage;
