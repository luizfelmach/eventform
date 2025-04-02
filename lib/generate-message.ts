import type { FormData } from "./store"

export function generateWhatsAppMessage(data: FormData): string {
  let message = `*ORÇAMENTO DE EVENTO - DARLENE MACHADO*\n\n`

  // Add quantity of people
  message += `*Quantidade de pessoas:* ${data.quantidadePessoas}\n\n`

  // Add entrada if selected
  if (data.entrada.selecionado) {
    message += `*Entrada:*\n`
    if (data.entrada.itens.length > 0) {
      data.entrada.itens.forEach((item) => {
        message += `- ${item}\n`
      })
    } else {
      message += `- Não especificado\n`
    }
    message += `\n`
  }

  // Add roda de buteco if selected
  if (data.rodaButeco.selecionado) {
    message += `*Roda de Buteco:*\n`
    if (data.rodaButeco.itens.length > 0) {
      data.rodaButeco.itens.forEach((item) => {
        message += `- ${item}\n`
      })
    } else {
      message += `- Não especificado\n`
    }
    message += `\n`
  }

  // Add almoço if selected
  if (data.almoco.selecionado) {
    message += `*Almoço:*\n`
    if (data.almoco.itens.length > 0) {
      data.almoco.itens.forEach((item) => {
        message += `- ${item}\n`
      })
    } else {
      message += `- Não especificado\n`
    }
    message += `\n`
  }

  // Add jantar if selected
  if (data.jantar.selecionado) {
    message += `*Jantar:*\n`
    if (data.jantar.itens.length > 0) {
      data.jantar.itens.forEach((item) => {
        message += `- ${item}\n`
      })
    } else {
      message += `- Não especificado\n`
    }
    message += `\n`
  }

  // Add bebidas if selected
  if (data.bebidas.selecionado) {
    message += `*Bebidas:*\n`
    if (data.bebidas.itens.length > 0) {
      data.bebidas.itens.forEach((item) => {
        message += `- ${item}\n`
      })
    } else {
      message += `- Não especificado\n`
    }
    message += `\n`
  }

  // Add espaço if selected
  if (data.espaco.selecionado) {
    message += `*Espaço:*\n`
    if (data.espaco.itens.length > 0) {
      data.espaco.itens.forEach((item) => {
        message += `- ${item}\n`
      })
    } else {
      message += `- Não especificado\n`
    }
    message += `\n`
  }

  // Add price
  message += `*Preço:* ${data.preco}\n\n`

  // Add observations if any
  if (data.observacoes.length > 0) {
    message += `*Observações:*\n`
    data.observacoes.forEach((item) => {
      message += `- ${item}\n`
    })
    message += `\n`
  }

  // Add footer
  message += `Orçamento gerado por Darlene Machado Eventos`

  return message
}

export function shareViaWhatsApp(data: FormData): void {
  const message = generateWhatsAppMessage(data)
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/?text=${encodedMessage}`

  // Open WhatsApp in a new tab
  window.open(whatsappUrl, "_blank")
}

