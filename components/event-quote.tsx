import React from "react";
import {
  Document,
  Page,
  Text,
  Image,
  StyleSheet,
  View,
  Font,
} from "@react-pdf/renderer";
import { FormData } from "@/lib/store";

// Caso queira usar uma fonte customizada, descomente e ajuste o caminho
// Font.register({
//   family: "Montserrat",
//   src: "/path/to/Montserrat-Regular.ttf",
// });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica", // ou "Montserrat" se registrar a fonte customizada
    fontSize: 11,
    color: "#333",
  },
  header: {
    flexDirection: "row",
    borderRadius: 8,
    textAlign: "center",
    marginBottom: 20,
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  contactContainer: {},
  contactInfo: {
    fontSize: 10,
    color: "#000",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  headerSubtitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
  logo: {
    width: 190,
    borderRadius: "8px",
  },
  section: {
    marginBottom: 16,
    paddingBottom: 10,
    borderBottom: "1 solid #ddd",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a4a4a",
    marginBottom: 8,
  },
  textItem: {
    marginLeft: 12,
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginTop: 10,
  },
  footer: {
    textAlign: "center",
    fontSize: 10,
    color: "#777",
    marginTop: 30,
    paddingTop: 10,
  },
});

// Função auxiliar para renderizar seções dinamicamente
const renderSection = (
  title: string,
  selecionado: boolean,
  itens: string[]
) => {
  if (!selecionado) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {itens.map((item, idx) => (
        <Text style={styles.textItem} key={`${title}-${idx}`}>
          • {item}
        </Text>
      ))}
    </View>
  );
};

export function EventQuote({ formData }: { formData: FormData }) {
  const {
    quantidadePessoas,
    entrada,
    rodaButeco,
    almoco,
    jantar,
    churrasco,
    coffeeBreak,
    bebidas,
    espaco,
    preco,
    observacoes,
  } = formData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cabeçalho Moderno */}
        <View style={styles.header}>
          <View style={styles.contactContainer}>
            <Text style={styles.contactInfo}>Telefone: (27) 99753-1022</Text>
            <Text style={styles.contactInfo}>
              Instragram: @darlenemachadobuffet
            </Text>
            <Text style={styles.contactInfo}>
              Facebook: Darlene Machado Buffet
            </Text>
            <Text style={styles.contactInfo}>
              Site: darlenemachadobuffet.top
            </Text>
          </View>
          <Image style={styles.logo} src="/logo.png" />
        </View>

        {/* Detalhes do Evento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes do Evento</Text>
          <Text style={styles.textItem}>
            Quantidade de Pessoas: {quantidadePessoas}
          </Text>
        </View>

        {/* Renderiza cada seção condicionalmente */}
        {renderSection("Entrada", entrada.selecionado, entrada.itens)}
        {renderSection(
          "Roda de Buteco",
          rodaButeco.selecionado,
          rodaButeco.itens
        )}
        {renderSection("Almoço", almoco.selecionado, almoco.itens)}
        {renderSection("Jantar", jantar.selecionado, jantar.itens)}
        {renderSection("Churrasco", churrasco.selecionado, churrasco.itens)}
        {renderSection(
          "Coffee Break",
          coffeeBreak.selecionado,
          coffeeBreak.itens
        )}
        {renderSection("Bebidas", bebidas.selecionado, bebidas.itens)}
        {renderSection("Espaço", espaco.selecionado, espaco.itens)}

        {/* Seção de Preço */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Valor do serviço</Text>
          <Text style={styles.price}>{preco}</Text>
        </View>

        {/* Observações, se houver */}
        {observacoes && observacoes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Observações</Text>
            {observacoes.map((obs, idx) => (
              <Text style={styles.textItem} key={`obs-${idx}`}>
                - {obs}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <Text>Obrigado pela preferência!</Text>
          <Text>
            {"Domingos Martins"},{" "}
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
