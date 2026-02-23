import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação básica
    if (!body.name || !body.email || !body.phone || !body.cpf) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // API Key (hardcoded temporariamente)
    const apiKey = "$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjAyMzQ1NTUyLWFkNTAtNGNmZS05YWM0LWM1ODE3MTBhZjljYTo6JGFhY2hfMzJhNDk4NWItNmIyZi00ZjY5LWJjZGUtNWM2Yjc2NzUyYWZk"

    console.log('=== INICIANDO PROCESSO DE ASSINATURA ===')

    if (!apiKey) {
      console.error('ASAAS_API_KEY não configurada')
      return NextResponse.json(
        { error: 'Configuração do servidor incompleta' },
        { status: 500 }
      )
    }

    // Dados do cliente
    const customerData = {
      name: body.name,
      email: body.email,
      phone: body.phone.replace(/\D/g, ''),
      cpfCnpj: body.cpf.replace(/\D/g, ''),
      postalCode: body.cep?.replace(/\D/g, '') || '',
      address: body.address || '',
      addressNumber: body.number || '',
      province: body.neighborhood || '',
    }

    // Criar cliente no ASAAS
    console.log('📝 Criando cliente no ASAAS...')
    const customerResponse = await fetch('https://api.asaas.com/v3/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': apiKey,
      },
      body: JSON.stringify(customerData),
    })

    if (!customerResponse.ok) {
      const errorData = await customerResponse.json()
      console.error('❌ Erro ao criar cliente:', errorData)
      return NextResponse.json(
        { error: 'Erro ao criar cliente: ' + (errorData.errors?.[0]?.description || 'Erro desconhecido') },
        { status: 400 }
      )
    }

    const customer = await customerResponse.json()
    console.log('✅ Cliente criado:', customer.id)

    // Determinar valor do plano
    const planValues = {
      'MENSAL': 217,
      'TRIMESTRAL': 557
    }
    const value = planValues[body.plan as keyof typeof planValues] || 217

    // Determinar ciclo
    const planCycles = {
      'MENSAL': 'MONTHLY',
      'TRIMESTRAL': 'QUARTERLY'
    }
    const cycle = planCycles[body.plan as keyof typeof planCycles] || 'MONTHLY'

    // Nome do plano em português
    const planNames = {
      'MENSAL': 'Plano Mensal',
      'TRIMESTRAL': 'Plano Trimestral'
    }
    const planName = planNames[body.plan as keyof typeof planNames] || 'Plano Mensal'

    // Criar assinatura
    const subscriptionData = {
      customer: customer.id,
      billingType: body.billingType || 'CREDIT_CARD',
      value: value,
      nextDueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      cycle: cycle,
      description: `${planName} - Personal Training João Pavlik`,
    }

    console.log('💳 Criando assinatura no ASAAS...')
    const subscriptionResponse = await fetch('https://api.asaas.com/v3/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': apiKey,
      },
      body: JSON.stringify(subscriptionData),
    })

    if (!subscriptionResponse.ok) {
      const errorData = await subscriptionResponse.json()
      console.error('❌ Erro ao criar assinatura:', errorData)
      return NextResponse.json(
        { error: 'Erro ao criar assinatura: ' + (errorData.errors?.[0]?.description || 'Erro desconhecido') },
        { status: 400 }
      )
    }

    const subscription = await subscriptionResponse.json()
    console.log('✅ Assinatura criada:', subscription.id)

    // Buscar a primeira cobrança gerada
    console.log('🔍 Buscando cobrança gerada...')
    const paymentsResponse = await fetch(
      `https://api.asaas.com/v3/payments?subscription=${subscription.id}`,
      {
        headers: {
          'access_token': apiKey,
        },
      }
    )

    let paymentLink = ''
    let invoiceUrl = ''

    if (paymentsResponse.ok) {
      const paymentsData = await paymentsResponse.json()
      if (paymentsData.data && paymentsData.data.length > 0) {
        const payment = paymentsData.data[0]
        
        // Link de pagamento (para PIX e Boleto)
        if (payment.invoiceUrl) {
          invoiceUrl = payment.invoiceUrl
          paymentLink = payment.invoiceUrl
        }
        
        // Se for PIX, pegar o link específico
        if (payment.billingType === 'PIX' && payment.pixUrl) {
          paymentLink = payment.pixUrl
        }
        
        console.log('💰 Link de pagamento:', paymentLink || 'Não disponível (cartão de crédito)')
      }
    }

    // WhatsApp do João Pavlik
    const whatsappNumber = '5562999744071'
    
    // Formatar valor
    const valorFormatado = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    // Criar mensagem personalizada para WhatsApp
    let whatsappMessage = ''
    
    if (paymentLink) {
      // Se tem link de pagamento (PIX/Boleto)
      whatsappMessage = `Olá! Sua assinatura foi criada com sucesso! 🎉

📋 *Detalhes da Assinatura:*
- Plano: ${planName}
- Valor: ${valorFormatado}
- Cliente: ${body.name}

💳 *Link para Pagamento:*
${paymentLink}

Após o pagamento, você receberá a confirmação por email!

Qualquer dúvida, estou à disposição! 💪`
    } else {
      // Se é cartão de crédito (não tem link)
      whatsappMessage = `Olá! Sua assinatura foi criada com sucesso! 🎉

📋 *Detalhes da Assinatura:*
- Plano: ${planName}
- Valor: ${valorFormatado}
- Cliente: ${body.name}

✅ *Pagamento no Cartão de Crédito*
A cobrança será processada automaticamente e você receberá a confirmação por email em breve!

Todo mês a renovação acontece automaticamente no seu cartão. Sem preocupações! 💪

Qualquer dúvida, estou à disposição!`
    }

    // Encodar mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    console.log('✅ Processo concluído com sucesso!')

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      customerId: customer.id,
      paymentLink: paymentLink || null,
      whatsappUrl: whatsappUrl,
      message: 'Assinatura criada com sucesso!',
    })

  } catch (error) {
    console.error('❌ Erro geral:', error)
    return NextResponse.json(
      { error: 'Erro ao processar pagamento: ' + (error instanceof Error ? error.message : 'Erro desconhecido') },
      { status: 500 }
    )
  }
}