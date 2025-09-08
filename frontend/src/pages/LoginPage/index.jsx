import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css'; // Usando CSS Modules

// --- LÓGICA DE VALIDAÇÃO PARA LOGIN ---
const validateLoginForm = (formData) => {
    const errors = {};
    if (!formData.email) {
        errors.email = 'O email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'O formato do email é inválido';
    }
    if (!formData.password) {
        errors.password = 'A senha é obrigatória';
    }
    return errors;
};

// --- COMPONENTE LoginPage ---
const LoginPage = () => {
    const navigate = useNavigate();

    // Estado para armazenar os dados do formulário (email e senha)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Estado para armazenar mensagens de erro
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Função para atualizar o estado do formulário
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        // Limpa os erros ao digitar
        if (errors.general) {
            setErrors({});
        }
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = e => {
        e.preventDefault();
        const newErrors = validateLoginForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);
            console.log('Tentativa de login com:', formData);

            // Simula uma chamada à API e verificação de perfil
            setTimeout(() => {
                setIsSubmitting(false);
                
                // DADOS DE TESTE PARA VENDEDOR
                if (formData.email === 'vendedor@tecnobits.com' && formData.password === 'vendedor123') {
                    alert('Login de VENDEDOR efetuado com sucesso!');
                    // No futuro, aqui você salvaria o token e o perfil do usuário em um AuthContext
                    navigate('/vendedor/cadastrar-produto'); // Exemplo de redirecionamento para vendedor
                } 
                // DADOS DE TESTE PARA CLIENTE
                else if (formData.email === 'cliente@tecnobits.com' && formData.password === 'cliente123') {
                    alert('Login de CLIENTE efetuado com sucesso!');
                    navigate('/'); // Redireciona para a página inicial
                }
                // FALHA NO LOGIN
                else {
                    setErrors({ general: 'Email ou senha inválidos.' });
                }
            }, 1500);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.formWrapper}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Acesse sua Conta</h1>
                    <p className={styles.subtitle}>
                        Não tem uma conta? <Link to="/create-account" className={styles.link}>Crie uma aqui</Link>
                    </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    {/* Campo Email */}
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email *</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? styles.inputError : ''}
                            placeholder="seu.email@exemplo.com"
                        />
                        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                    </div>

                    {/* Campo Senha */}
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Senha *</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? styles.inputError : ''}
                            placeholder="Sua senha"
                        />
                        {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
                    </div>

                    {/* Botão de envio e mensagem de erro geral */}
                    {errors.general && <p className={styles.errorMessage}>{errors.general}</p>}
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className={styles.separator}>
                    <span>Ou entre com</span>
                </div>

                {/* Opções de Login Social */}
                <div className={styles.socialLogin}>
                    {/* Adicionar botões  */}
                    <button className={styles.socialButton}>Google</button>
                    <button className={styles.socialButton}>Facebook</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
