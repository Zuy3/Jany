# @zuy_silva emagrecer — Quiz Barriga Chapada em 7 Dias

Quiz interativo de alta conversão para avaliação de sensibilidade digestiva, identificação do perfil de inchaço abdominal e recomendação personalizada do protocolo Barriga Chapada em 7 Dias.

---

## 🚀 Como Publicar no GitHub Pages

Este projeto está 100% preparado para ser publicado no GitHub Pages com caminhos relativos (`./assets/`), fallback para SPA (`404.html`) e suporte a bypass do Jekyll (`.nojekyll`).

Você pode escolher um dos 2 métodos abaixo:

---

### Método 1: Enviar os arquivos HTML prontos (Mais Rápido e Fácil)

1. Baixe o arquivo **`quiz-zuy-emagrecer-html.zip`** (disponível na pasta do projeto ou clicando em **Configurações / Integrações** no topo da página).
2. Descompacte o arquivo `.zip` no seu computador. Você verá a seguinte estrutura:
   ```text
   ├── index.html        (página principal)
   ├── 404.html          (redirecionamento automático)
   ├── .nojekyll         (desativa o processador Jekyll)
   └── assets/           (scripts, estilos CSS e imagens otimizadas)
   ```
3. No seu repositório no GitHub (ex: `https://github.com/zuy3/quiz-zuyzelia`):
   - Arraste ou faça upload desses arquivos diretamente na raiz da branch `main` (ou `gh-pages`).
4. No GitHub, acesse:
   - **Settings** (Configurações) → **Pages** (no menu lateral esquerdo).
   - Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
   - Em **Branch**, selecione `main` (ou `gh-pages`) e a pasta `/ (root)`.
   - Clique em **Save**.
5. Pronto! Em 1 a 2 minutos sua página estará no ar (ex: `https://zuy3.github.io/quiz-zuyzelia/`).

---

### Método 2: Subir o código-fonte completo (com GitHub Actions automático)

1. Envie todo o projeto para o seu repositório GitHub via `git push`.
2. O workflow automatizado **`.github/workflows/deploy.yml`** já está incluído.
3. No GitHub:
   - Acesse **Settings** → **Pages**.
   - Em **Source**, selecione **GitHub Actions**.
4. A cada atualização ou `git push`, o GitHub compilará e publicará o site automaticamente.

---

## 🔒 Preservação do Checkout Oficial Hotmart

- **Link oficial do checkout:** `https://pay.hotmart.com/T93171913Y?off=pz33btfg&checkoutMode=10`
- O aplicativo preserva e repassa dinamicamente todos os parâmetros de rastreamento UTM recebidos na URL (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `src`, `sck`, `fbclid`).

---

## 🛠️ Comandos de Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor local
npm run dev

# Compilar build estático de produção
npm run build
```
