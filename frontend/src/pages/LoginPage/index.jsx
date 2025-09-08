import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

// --- LÓGICA DE VALIDAÇÃO (sem alterações) ---
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

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // --- FUNÇÃO handleSubmit ATUALIZADA ---
    const handleSubmit = e => {
        e.preventDefault();
        const newErrors = validateLoginForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);
            console.log('Tentativa de login com:', formData);

            // Simula uma chamada à API com diferenciação de usuário
            setTimeout(() => {
                setIsSubmitting(false);
                
                // --- LÓGICA DE TESTE ---
                if (formData.email === 'vendedor@tecnobits.com' && formData.password === 'vendedor123') {
                    alert('Login de Vendedor efetuado com sucesso!');
                    navigate('/vendedor/dashboard'); // Redireciona para a página do vendedor
                } else if (formData.email === 'cliente@tecnobits.com' && formData.password === 'cliente123') {
                    alert('Login de Cliente efetuado com sucesso!');
                    navigate('/'); // Redireciona para a página inicial
                } else {
                    // Define um erro geral se as credenciais não corresponderem
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

                    {/* Exibe o erro geral de login */}
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

                <div className={styles.socialLogin}>
                    <button className={styles.socialButton}>Google</button>
                    <button className={styles.socialButton}>Facebook</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

