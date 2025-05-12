const styles = {
    main: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        fontFamily: 'Arial, sans-serif',
    },
    containerCentral: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        position: 'absolute',
        top: '100px',
        fontWeight: 'bold',
        fontSize: '40px',
        textAlign: 'center',
    },
    container: {
        backgroundColor: '#FEC89A',
        borderRadius: '20px',
        padding: '40px',
        width: '450px',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
    },
    span: {
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '22px',
        marginBottom: '25px',
        textAlign: 'center',
    },
    containerInputText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '15px',
        fontSize: '16px',
        marginBottom: '25px',
    },
    inputsEmail: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
    },
    containerPasswords: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
    },
    password: {
        display: 'flex',
        alignItems: 'center',
    },
    inputEmailTel: {
        borderRadius: '7px',
        border: 'none',
        height: '40px',
        padding: '0 15px',
        fontSize: '16px',
    },
    inputPasswords: {
        flex: 1,
        borderRadius: '7px',
        border: 'none',
        height: '40px',
        padding: '0 15px',
        fontSize: '16px',
    },
    eye_button: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        marginLeft: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eye_icon: {
        width: '40px', // aumentado
        height: '40px',
    },
    containerFeet: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
    },
    buttonCadastrar: {
        backgroundColor: '#fff',
        color: '#000',
        padding: '12px 0',
        width: '130px',
        border: 'none',
        borderRadius: '7px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '15px',
    },
    link: {
        fontSize: '15px', // aumentado
        color: '#000',
        textDecoration: 'none',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: '1.3',
        cursor: 'pointer'
    },
    labelPass: {
        marginTop: '7px',
    },
    boldLabel: {
        fontWeight: 'bold',
    }
};

export default styles;
