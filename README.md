# MovMold - Landing Page

Landing page oficial da **MovMold**, uma empresa focada em excelência em engenharia de precisão, modelação e ferramentaria, localizada em Itapira/SP.

O site foi desenvolvido com foco em alta performance, SEO, acessibilidade e design responsivo, oferecendo uma interface limpa para apresentação de serviços e captura de leads (contatos) integrados diretamente via e-mail.

## Tecnologias Utilizadas

* **[React 18](https://react.dev/)** + **[TypeScript](https://www.typescriptlang.org/)**: Base da aplicação.
* **[Vite](https://vitejs.dev/)**: Bundler para desenvolvimento.
* **[Tailwind CSS](https://tailwindcss.com/)**: Estilização utilitária e design responsivo.
* **[Framer Motion](https://www.framer.com/motion/)**: Animações fluidas de interface.
* **[Supabase](https://supabase.com/)**: Backend as a Service (BaaS) utilizado com *Edge Functions* para processar o formulário.
* **[Resend](https://resend.com/)**: API para disparo transacional dos e-mails de contato.
* **[Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)**: Proteção anti-bot (CAPTCHA invisível).
* **[Lucide React](https://lucide.dev/)**: Biblioteca de ícones.

## Variáveis de Ambiente

Para rodar este projeto, você precisará adicionar as seguintes variáveis de ambiente. Utilize o arquivo `.env.example` como referência e crie um arquivo `.env` na raiz do projeto:

**Frontend (Vite):**
\`\`\`env
VITE_SUPABASE_PROJECT_ID="seu_project_id"
VITE_SUPABASE_URL="sua_url_supabase"
VITE_SUPABASE_PUBLISHABLE_KEY="sua_chave_anon_publica"
VITE_TURNSTILE_SITE_KEY="sua_site_key_publica"
\`\`\`

**Backend (Supabase Secrets):**
Estas variáveis devem ser configuradas diretamente no painel do Supabase ou via CLI para as Edge Functions:
* `RESEND_API_KEY`
* `TURNSTILE_SECRET_KEY`

## Instalação e Execução local

1. Clone o repositório:
\`\`\`bash
git clone https://github.com/seu-usuario/movmold-landing-page.git
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Inicie o servidor de desenvolvimento:
\`\`\`bash
npm run dev
\`\`\`
O site estará disponível em `http://localhost:8080`.

## Scripts Disponíveis

No diretório do projeto, você pode rodar:

* `npm run dev`: Inicia o ambiente de desenvolvimento.
* `npm run build`: Cria a versão otimizada para produção.
* `npm run lint`: Executa o ESLint para encontrar problemas no código.
* `npm run format`: Formata todo o código da aplicação utilizando o Prettier.