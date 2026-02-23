# 🚀 Guia Rápido - Começar em 5 Minutos

## Passo 1: Instalar Dependências

```bash
npm install
```

## Passo 2: Rodar o Projeto

```bash
npm run dev
```

Abra seu navegador em: **http://localhost:3000**

## Passo 3: Personalizar

### ✉️ Alterar Email e WhatsApp

Arquivo: `app/components/Contact.tsx`

Linha 11: `value: 'SEU_EMAIL@dominio.com'`
Linha 17: `value: '(62) 99999-9999'`
Linha 18: `href: 'https://wa.me/5562XXXXXXXXX'`

### 💰 Alterar Valores dos Planos

Arquivo: `app/components/Plans.tsx`

Linha 14: `price: 217` (Plano Mensal)
Linha 26: `price: 557` (Plano Trimestral)

## Passo 4: Integrar ASAAS (Opcional)

1. Criar conta: https://www.asaas.com
2. Pegar API Key em: Configurações > Integrações
3. Criar arquivo `.env.local`:
   ```
   ASAAS_API_KEY=sua_chave_aqui
   ```
4. Ver instruções completas no README.md

## Passo 5: Fazer Deploy

### Opção A - Vercel (Mais Fácil)

1. Criar conta em https://vercel.com
2. Importar projeto do GitHub
3. Deploy automático!

### Opção B - Netlify

1. Criar conta em https://netlify.com
2. Arrastar pasta do projeto
3. Configurar: Build command = `npm run build`

## 📁 Estrutura Simplificada

```
pavlik-site/
├── app/
│   ├── components/     ← Todos os componentes do site
│   ├── page.tsx       ← Página principal
│   └── globals.css    ← Estilos globais
├── public/
│   └── pavlik.jpeg    ← Sua foto
└── package.json       ← Dependências
```

## 🎨 Alterar Cores

Arquivo: `tailwind.config.js`

```javascript
primary: '#c41e3a',        // Cor principal (vermelho)
'primary-dark': '#8b1428', // Tom escuro
secondary: '#1a1a1a',      // Preto
```

## 💡 Dicas

- Use `npm run build` antes do deploy
- Teste em mobile com DevTools (F12)
- Substitua `pavlik.jpeg` por outras fotos suas
- Adicione Google Analytics se quiser

## ❓ Problemas Comuns

**Site não abre?**
```bash
rm -rf .next
npm run dev
```

**Erro ao instalar?**
```bash
rm -rf node_modules
npm install
```

**Precisa de ajuda?**
- Leia o README.md completo
- Documentação Next.js: https://nextjs.org/docs

---

**Pronto! Seu site está funcionando! 🎉**
