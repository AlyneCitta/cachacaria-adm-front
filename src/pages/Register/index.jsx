import { useState } from 'react';
import styles from "./styles.js";
import EyeOpen from '../../assets/EyeOpen.png';
import EyeClose from '../../assets/EyeClose.png';
import GlobalStyle from "../../globalStyle/style.js";
import { Link, useNavigate } from "react-router-dom";
import api from '../../api/api'; // <-- importação da instância da API

function Register() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Por favor, insira um email válido.");
            return;
        }

        if (password.length < 8) {
            alert("A senha deve conter no mínimo 8 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        try {
            const response = await api.post("/api/users", {
                email,
                senha: password,
            });

            alert("Cadastro realizado com sucesso!");
            navigate('/login');
        } catch (error) {
            console.error("Erro ao se cadastrar:", error);
            const mensagem = error.response?.data?.error || "Erro ao conectar com o servidor.";
            alert(mensagem);
        }
    };

    return (
        <main style={styles.main}>
            <GlobalStyle />
            <div style={styles.containerCentral}>
                <div style={styles.title}>
                    <span>ADMINISTRAÇÃO - Cachaçaria Antonio Carlos</span>
                </div>
                <div style={styles.container}>
                    <div style={styles.span}>
                        <span style={styles.welcomeText}>Bem-vindo(a), Faça seu cadastro aqui!</span>
                    </div>

                    <div style={styles.containerInputText}>
                        <div style={styles.inputsEmail}>
                            <label style={styles.boldLabel}>Email:</label>
                            <input
                                type="text"
                                name="email"
                                style={styles.inputEmailTel}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div style={styles.containerPasswords}>
                            <label style={{ ...styles.labelPass, ...styles.boldLabel }}>Senha:</label>
                            <div style={styles.password}>
                                <input
                                    type={isShowPassword ? "text" : "password"}
                                    name="password"
                                    style={styles.inputPasswords}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button onClick={() => setIsShowPassword(!isShowPassword)} type="button" style={styles.eye_button}>
                                    <img src={isShowPassword ? EyeClose : EyeOpen} style={styles.eye_icon} alt="toggle password" />
                                </button>
                            </div>
                        </div>

                        <div style={styles.containerPasswords}>
                            <label style={{ ...styles.labelPass, ...styles.boldLabel }}>Confirmar Senha:</label>
                            <div style={styles.password}>
                                <input
                                    type={isShowConfirm ? "text" : "password"}
                                    name="confirmPassword"
                                    style={styles.inputPasswords}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button onClick={() => setIsShowConfirm(!isShowConfirm)} type="button" style={styles.eye_button}>
                                    <img src={isShowConfirm ? EyeClose : EyeOpen} style={styles.eye_icon} alt="toggle confirm password" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={styles.containerFeet}>
                        <button style={styles.buttonCadastrar} type="button" onClick={handleRegister}>
                            CADASTRAR
                        </button>
                        <a style={styles.link} as="span">
                            <Link to="/login" style={styles.link}>Já possui uma conta? Faça seu login aqui!</Link>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Register;
