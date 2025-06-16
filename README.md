✅ Boas Práticas Utilizadas
Este projeto segue uma série de boas práticas de desenvolvimento front-end, visando organização, manutenibilidade e integração eficiente com o back-end e banco de dados. Abaixo estão os principais padrões adotados:

🔹 Organização de Arquivos e Componentes
Estrutura de pastas modularizada, separando componentes reutilizáveis, páginas e serviços.

Separação clara entre lógica (.jsx) e estilização (.js ou .css), utilizando styled-components ou arquivos de estilo externos.

🔹 Consumo de API
Utilização da biblioteca axios com configuração centralizada de baseURL, integrando com o ambiente (VITE_API_URL).

Requisições HTTP bem estruturadas, com tratamento de erros e uso de async/await.

Rotas protegidas com envio de token JWT via cabeçalho Authorization.

🔹 Integração com Backend
Integração com o back-end hospedado na plataforma Render.

Comunicação com o banco de dados PostgreSQL hospedado na Railway por meio de rotas da API.

Separação entre rotas públicas e privadas no front.

🔹 Boas práticas de segurança e ambiente
Uso de variáveis de ambiente (.env) para esconder URLs sensíveis e tokens.

Exclusão de arquivos sensíveis via .gitignore, como .env.

🔹 Deploy e Hospedagem
Deploy automatizado do front-end na Vercel, com integração contínua via GitHub.

Separação clara entre desenvolvimento local e produção, com URLs dinâmicas para APIs.

🔹 Código Limpo
Uso de funções bem nomeadas e componentes legíveis.

Uso de useEffect e useState com dependências bem definidas.

Evita duplicações e mantém a lógica centralizada.
