import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.js";
import EyeOpen from '../../assets/EyeOpen.png';
import EyeClose from '../../assets/EyeClose.png';
import GlobalStyle from "../../globalStyle/style.js";
import { Link } from "react-router-dom";
import { useAuth } from '../../auth/AuthContext.jsx';

function Login() {
    const [isShow, setIsShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();  // Cria o navigate

    const handlePassword = () => setIsShow(!isShow);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Por favor, insira um email válido.");
            return;
        }

        try {
            // ENVIA os campos corretos que o backend espera
            await login({ email, password }); // <--- AQUI está o ajuste
            navigate('/home');
        } catch (error) {
            alert("Erro ao fazer login. Verifique suas credenciais.");
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
                        <span style={styles.welcomeText}>Bem-vindo(a), Faça seu login aqui!</span>
                    </div>
                    <div style={styles.containerInputText}>
                        <div style={styles.inputsEmail}>
                            <label style={styles.boldLabel}>Email:</label>
                            <input
                                type="text"
                                id="email"
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
                                    type={isShow ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    style={styles.inputPasswords}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button onClick={handlePassword} type="button" style={styles.eye_button}>
                                    <img
                                        src={isShow ? EyeClose : EyeOpen}
                                        style={styles.eye_icon}
                                        alt="toggle visibility"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={styles.containerFeet}>
                        <button style={styles.buttonCadastrar} type="button" onClick={handleLogin}>
                            ENTRAR
                        </button>
                        <a style={styles.link} as="span">
                            <Link to="/register" style={styles.link}>Não possui uma conta? Faça seu cadastro aqui!</Link>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;