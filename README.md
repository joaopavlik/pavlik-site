# Site João Guilherme Pavlik

Site profissional em Next.js 14 para personal trainer e atleta de Jiu-Jitsu com sistema de pagamentos recorrentes integrado ao ASAAS.

## 🚀 Tecnologias

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animações)
- **Lucide React** (ícones)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar em produção
npm start
```

O site estará disponível em `http://localhost:3000`

## 🎨 Características

✅ Design moderno e impactante com tema atlético
✅ Animações suaves com Framer Motion
✅ 100% responsivo (mobile, tablet, desktop)
✅ Seções completas: Hero, Sobre, Serviços, Planos, Contato
✅ Sistema de pagamentos preparado para ASAAS
✅ Performance otimizada
✅ SEO-friendly

## 💳 Integração ASAAS

### Configuração

1. **Criar conta no ASAAS**
   - Acesse: https://www.asaas.com
   - Crie sua conta

2. **Obter API Key**
   - Vá em: Configurações > Integrações > API Key
   - Copie sua chave de API

3. **Configurar variáveis de ambiente**
   - Crie arquivo `.env.local` na raiz do projeto:
   ```bash
   ASAAS_API_KEY=sua_chave_api_aqui
   ```

4. **Criar rota de API**
   - Crie o arquivo `app/api/subscription/route.ts`:

```typescript
export async function POST(request: Request) {
  const body = await request.json()
  
  const response = await fetch('https://api.asaas.com/v3/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': process.env.ASAAS_API_KEY!
    },
    body: JSON.stringify({
      customer: body.email,
      billingType: 'CREDIT_CARD', // ou 'BOLETO' ou 'PIX'
      value: body.amount,
      nextDueDate: new Date().toISOString().split('T')[0],
      cycle: body.plan === 'Plano Mensal' ? 'MONTHLY' : 'QUARTERLY',
      description: `${body.plan} - João Pavlik Training`,
      customer: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        cpfCnpj: body.cpf
      }
    })
  })
  
  return Response.json(await response.json())
}
```

5. **Descomentar código no PaymentModal.tsx**
   - Arquivo: `app/components/PaymentModal.tsx`
   - Procure o comentário "// Chamada real (descomentar em produção):"
   - Descomente o código de integração

### Documentação ASAAS

- Docs: https://docs.asaas.com
- API Reference: https://asaasv3.docs.apiary.io

## 📝 Personalização

### Informações de Contato

Edite o arquivo `app/components/Contact.tsx`:

```typescript
const contactItems = [
  {
    icon: Mail,
    label: 'E-mail',
    value: 'SEU_EMAIL@dominio.com', // ← Altere aqui
    href: 'mailto:SEU_EMAIL@dominio.com'
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '(62) 99999-9999', // ← Altere aqui
    href: 'https://wa.me/5562999999999' // ← Altere aqui (DDI + DDD + número)
  },
  // ...
]
```

### Cores do Tema

Edite o arquivo `tailwind.config.js`:

```javascript
colors: {
  primary: '#c41e3a',        // Vermelho principal
  'primary-dark': '#8b1428', // Vermelho escuro
  secondary: '#1a1a1a',      // Preto/cinza escuro
  accent: '#d4af37',         // Dourado
}
```

### Valores dos Planos

Edite o arquivo `app/components/Plans.tsx`:

```typescript
const plans = [
  {
    name: 'Plano Mensal',
    price: 217, // ← Altere aqui
    // ...
  }
]
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Crie conta em https://vercel.com
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente (ASAAS_API_KEY)
4. Deploy automático!

### Netlify

1. Crie conta em https://netlify.com
2. Arraste a pasta do projeto
3. Configure build command: `npm run build`
4. Configure variáveis de ambiente

### Hospedagem Tradicional

1. Execute `npm run build`
2. Faça upload da pasta `.next` e `public`
3. Configure servidor Node.js
4. Execute `npm start`

## 📱 Estrutura do Projeto

```
pavlik-site/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Plans.tsx
│   │   ├── PaymentModal.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── pavlik.jpeg
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🔧 Troubleshooting

**Erro de módulos não encontrados:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Imagem não aparece:**
- Verifique se `pavlik.jpeg` está em `/public`
- Use caminho `/pavlik.jpeg` no código

**Erro de TypeScript:**
```bash
npm run build
```

## 📞 Suporte

Para dúvidas sobre:
- **Next.js**: https://nextjs.org/docs
- **ASAAS**: https://atendimento.asaas.com
- **Deploy**: Documentação da plataforma escolhida

## 📄 Licença

Todos os direitos reservados - João Guilherme Pavlik 2026
