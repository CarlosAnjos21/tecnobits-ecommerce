import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './FormCreatePage.module.css';

// --- LÓGICA DE VALIDAÇÃO (Atualizada para múltiplos perfis) ---

const VALIDATION_RULES = {
  EMAIL_REGEX: /\S+@\S+\.\S+/,
  PASSWORD_MIN_LENGTH: 8,
};

const ERROR_MESSAGES = {
  REQUIRED: (fieldName) => `O campo ${fieldName} é obrigatório`,
  INVALID_EMAIL: 'O formato do email é inválido',
  PASSWORD_TOO_SHORT: (minLength) => `A senha deve ter no mínimo ${minLength} caracteres`,
  PASSWORDS_DO_NOT_MATCH: 'As senhas não coincidem',
};

const validateForm = (formData, userType) => {
  const errors = {};
  const { firstName, lastName, storeName, cnpj, email, password, confirmPassword } = formData;

  // Validação específica para cada tipo de usuário
  if (userType === 'cliente') {
    if (!firstName) errors.firstName = ERROR_MESSAGES.REQUIRED('nome');
    if (!lastName) errors.lastName = ERROR_MESSAGES.REQUIRED('sobrenome');
  } else if (userType === 'vendedor') {
    if (!storeName) errors.storeName = ERROR_MESSAGES.REQUIRED('nome da loja');
    if (!cnpj) errors.cnpj = ERROR_MESSAGES.REQUIRED('CNPJ');
  }

  // Validações comuns
  if (!email) {
    errors.email = ERROR_MESSAGES.REQUIRED('email');
  } else if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    errors.email = ERROR_MESSAGES.INVALID_EMAIL;
  }

  if (!password) {
    errors.password = ERROR_MESSAGES.REQUIRED('senha');
  } else if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    errors.password = ERROR_MESSAGES.PASSWORD_TOO_SHORT(VALIDATION_RULES.PASSWORD_MIN_LENGTH);
  }

  if (!confirmPassword) {
    errors.confirmPassword = ERROR_MESSAGES.REQUIRED('confirmação da senha');
  } else if (password !== confirmPassword) {
    errors.confirmPassword = ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH;
  }

  return errors;
};

// --- SUB-COMPONENTE: Formulário de Cadastro ---
const RegistrationForm = ({ userType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    storeName: '',
    cnpj: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validateForm(formData, userType);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      console.log(`Formulário de ${userType} enviado:`, formData);
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Crie sua Conta de {userType === 'cliente' ? 'Cliente' : 'Vendedor'}</h1>
        <p className={styles.subtitle}>
          Já possui uma conta? <Link to="/login" className={styles.link}>Faça login aqui</Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {userType === 'cliente' && (
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">Nome *</label>
              <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} className={errors.firstName ? styles.inputError : ''} placeholder="Seu nome" />
              {errors.firstName && <p className={styles.errorMessage}>{errors.firstName}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Sobrenome *</label>
              <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} className={errors.lastName ? styles.inputError : ''} placeholder="Seu sobrenome" />
              {errors.lastName && <p className={styles.errorMessage}>{errors.lastName}</p>}
            </div>
          </div>
        )}

        {userType === 'vendedor' && (
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="storeName">Nome da Loja *</label>
              <input id="storeName" name="storeName" type="text" value={formData.storeName} onChange={handleChange} className={errors.storeName ? styles.inputError : ''} placeholder="Nome da sua loja" />
              {errors.storeName && <p className={styles.errorMessage}>{errors.storeName}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cnpj">CNPJ *</label>
              <input id="cnpj" name="cnpj" type="text" value={formData.cnpj} onChange={handleChange} className={errors.cnpj ? styles.inputError : ''} placeholder="Seu CNPJ" />
              {errors.cnpj && <p className={styles.errorMessage}>{errors.cnpj}</p>}
            </div>
          </div>
        )}

        {/* Campos Comuns */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={errors.email ? styles.inputError : ''} placeholder="exemplo@email.com" />
          {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Senha *</label>
          <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className={errors.password ? styles.inputError : ''} placeholder="Mínimo de 8 caracteres" />
          {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirmar Senha *</label>
          <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? styles.inputError : ''} placeholder="Repita sua senha" />
          {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Criando conta...' : 'Criar Conta'}
        </button>
      </form>
    </div>
  );
};

// --- SUB-COMPONENTE: Tela de Seleção de Tipo ---
const TypeSelection = ({ onSelect }) => (
  <div className={styles.formWrapper}>
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>Crie sua Conta</h1>
      <p className={styles.subtitle}>Escolha o tipo de conta que deseja criar.</p>
    </div>
    <div className={styles.selectionContainer}>
      <button onClick={() => onSelect('cliente')} className={styles.selectionButton}>
        Quero Comprar
        <span>Cadastro de Cliente</span>
      </button>
      <button onClick={() => onSelect('vendedor')} className={styles.selectionButton}>
        Quero Vender
        <span>Cadastro de Vendedor</span>
      </button>
    </div>
    <p className={styles.subtitle} style={{ textAlign: 'center', marginTop: '1.5rem' }}>
      Já possui uma conta? <Link to="/login" className={styles.link}>Faça login aqui</Link>
    </p>
  </div>
);

// --- COMPONENTE PRINCIPAL ---
const FormCreatePage = () => {
  const [userType, setUserType] = useState(null); // null, 'cliente', ou 'vendedor'

  if (!userType) {
    return (
      <div className={styles.pageContainer}>
        <TypeSelection onSelect={setUserType} />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <RegistrationForm userType={userType} />
    </div>
  );
};

export default FormCreatePage;