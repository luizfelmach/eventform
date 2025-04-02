import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { FormData } from "@/lib/store";

// Register custom fonts
Font.register({
  family: "Montserrat",
  fonts: [
    { src: "./fonts/static/Montserrat-Regular.ttf" },
    { src: "./fonts/static/Montserrat-Bold.ttf", fontWeight: "bold" },
    { src: "./fonts/static/Montserrat-SemiBold.ttf", fontWeight: "semibold" },
  ],
});

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fafafa",
    fontFamily: "Montserrat",
    padding: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#4F46E5",
    borderBottomStyle: "solid",
    paddingBottom: 20,
  },
  logoContainer: {
    width: "30%",
  },
  logo: {
    width: 120,
    height: 40,
  },
  contactInfo: {
    width: "40%",
    textAlign: "right",
    fontSize: 9,
    color: "#6B7280",
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  reportTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },
  generationDate: {
    fontSize: 9,
    color: "#9CA3AF",
    marginTop: 4,
  },
  contactItem: {
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 15,
    color: "#000000",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "semibold",
    marginTop: 10,
    marginBottom: 5,
    color: "#000000",
  },
  sectionContainer: {
    marginVertical: 10,
    border: "1px solid #E5E5E5",
    borderRadius: 5,
    overflow: "hidden",
    marginHorizontal: 20,
  },
  sectionRow: {
    flexDirection: "row",
    borderBottom: "1px solid #E5E5E5",
  },
  lastSectionRow: {
    flexDirection: "row",
  },
  dayHeader: {
    backgroundColor: "#f5c4c0", // Rose gold color
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  dayHeaderOrange: {
    backgroundColor: "#e67e22", // Orange color like in the example
    padding: 10,
    width: "30%",
  },
  dayHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  dayHeaderLine: {
    borderBottomWidth: 2,
    borderBottomColor: "#e67e22",
    marginTop: 5,
    width: "100%",
  },
  menuContainer: {
    flexDirection: "row",
    padding: 0,
  },
  menuLeft: {
    width: "30%",
  },
  menuRight: {
    width: "70%",
    padding: 15,
  },
  menuImageContainer: {
    width: "50%",
    padding: 0,
  },
  menuContent: {
    width: "50%",
    padding: 15,
  },
  menuImage: {
    width: "100%",
    height: 200,
  },
  mealType: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
  },
  itemList: {
    marginLeft: 5,
  },
  itemText: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.4,
  },
  menuDivider: {
    borderLeftWidth: 1,
    borderLeftColor: "#e67e22",
    marginLeft: 15,
    marginRight: 15,
    height: "80%",
    alignSelf: "center",
  },
  footer: {
    marginTop: 20,
    padding: 20,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#000000",
  },
  footerText: {
    fontSize: 10,
    textAlign: "center",
    color: "#000000",
    marginBottom: 5,
  },
  observationContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  observationTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
    textAlign: "center",
  },
  basicInfoContainer: {
    padding: 20,
    marginBottom: 10,
  },
  basicInfoText: {
    fontSize: 12,
    marginBottom: 5,
    color: "#000000",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 20,
    right: 20,
    color: "#666666",
  },
});

const PDFHeader = ({ title }: { title: string }) => (
  <View style={styles.header}>
    <View style={styles.logoContainer}>
      {/* Substitua pela sua logo */}
      <Image style={styles.logo} src="/logo.png" />
    </View>

    <View style={styles.contactInfo}>
      <Text style={styles.companyName}>NOME DA EMPRESA</Text>
      <Text style={styles.contactItem}>contato@empresa.com</Text>
      <Text style={styles.contactItem}>(11) 98765-4321</Text>
      <Text style={styles.contactItem}>www.empresa.com</Text>
      <Text style={styles.generationDate}>
        Gerado em: {new Date().toLocaleDateString("pt-BR")}
      </Text>
    </View>
  </View>
);

// Event Quote PDF Component with menu-style layout
export const EventQuotePDF = ({ data }: { data: FormData }) => {
  // Helper function to render list items
  const renderItems = (items: string[]) => {
    if (!items || items.length === 0)
      return <Text style={styles.itemText}>• Opções a definir</Text>;

    return items.map((item, index) => (
      <Text key={index} style={styles.itemText}>
        • {item}
      </Text>
    ));
  };

  // Helper function to render meal section
  const renderMealSection = (title: string, items: string[]) => {
    if (!items) return null;

    return (
      <View style={{ marginBottom: 15 }}>
        <Text style={styles.mealType}>{title}:</Text>
        <View style={styles.itemList}>{renderItems(items)}</View>
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PDFHeader title="Relatório Financeiro" />

        {/* Title */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.title}>Orçamento Personalizado de Eventos</Text>
        </View>

        {/* Basic Information */}
        <View style={styles.basicInfoContainer}>
          <Text style={styles.subtitle}>Informações do Evento</Text>
          <Text style={styles.basicInfoText}>
            Quantidade de Pessoas:{" "}
            {data.quantidadePessoas || "Não especificado"}
          </Text>
        </View>

        {/* Entrada Section */}
        {data.entrada && data.entrada.selecionado && (
          <View style={styles.sectionContainer}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayHeaderText}>Entrada</Text>
              <View style={styles.dayHeaderLine} />
            </View>
            <View style={styles.menuContainer}>
              <View style={styles.menuImageContainer}>
                <Image
                  style={styles.menuImage}
                  src="/logo.png" // Replace with actual image
                />
              </View>
              <View style={styles.menuContent}>
                <View style={styles.itemList}>
                  {renderItems(data.entrada.itens)}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Roda de Buteco Section */}
        {data.rodaButeco && data.rodaButeco.selecionado && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionRow}>
              <View style={styles.dayHeaderOrange}>
                <Text style={styles.dayHeaderText}>Roda de Buteco</Text>
              </View>
              <View style={styles.menuRight}>
                <View style={styles.itemList}>
                  {renderItems(data.rodaButeco.itens)}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Almoço e Jantar Section (Side by Side) */}
        {(data.almoco && data.almoco.selecionado) ||
        (data.jantar && data.jantar.selecionado) ? (
          <View style={styles.sectionContainer}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayHeaderText}>Refeições</Text>
              <View style={styles.dayHeaderLine} />
            </View>
            <View style={styles.menuContainer}>
              {data.almoco && data.almoco.selecionado && (
                <View style={{ width: "50%", padding: 15 }}>
                  {renderMealSection("Almoço", data.almoco.itens)}
                </View>
              )}

              {data.almoco &&
                data.almoco.selecionado &&
                data.jantar &&
                data.jantar.selecionado && <View style={styles.menuDivider} />}

              {data.jantar && data.jantar.selecionado && (
                <View style={{ width: "50%", padding: 15 }}>
                  {renderMealSection("Jantar", data.jantar.itens)}
                </View>
              )}
            </View>
          </View>
        ) : null}

        {/* Churrasco Section */}
        {data.churrasco && data.churrasco.selecionado && (
          <View style={styles.sectionContainer}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayHeaderText}>Churrasco</Text>
              <View style={styles.dayHeaderLine} />
            </View>
            <View style={styles.menuContainer}>
              <View style={styles.menuContent}>
                <View style={styles.itemList}>
                  {renderItems(data.churrasco.itens)}
                </View>
              </View>
              <View style={styles.menuImageContainer}>
                <Image
                  style={styles.menuImage}
                  src="/logo.png" // Replace with actual image
                />
              </View>
            </View>
          </View>
        )}

        {/* Coffee Break and Bebidas Section (Side by Side) */}
        {(data.coffeeBreak && data.coffeeBreak.selecionado) ||
        (data.bebidas && data.bebidas.selecionado) ? (
          <View style={styles.sectionContainer}>
            <View style={styles.lastSectionRow}>
              <View style={{ width: "50%", padding: 15 }}>
                {data.coffeeBreak && data.coffeeBreak.selecionado && (
                  <View>
                    <Text style={styles.mealType}>Café da manhã:</Text>
                    <View style={styles.itemList}>
                      {renderItems(data.coffeeBreak.itens)}
                    </View>
                  </View>
                )}
              </View>

              <View style={styles.menuDivider} />

              <View style={{ width: "50%", padding: 15 }}>
                {data.bebidas && data.bebidas.selecionado && (
                  <View>
                    <Text style={styles.mealType}>Lanche da tarde:</Text>
                    <View style={styles.itemList}>
                      {renderItems(data.bebidas.itens)}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        ) : null}

        {/* Espaço Section */}
        {data.espaco && data.espaco.selecionado && (
          <View style={styles.sectionContainer}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayHeaderText}>Espaço</Text>
              <View style={styles.dayHeaderLine} />
            </View>
            <View style={styles.menuContainer}>
              <View style={styles.menuImageContainer}>
                <Image
                  style={styles.menuImage}
                  src="/logo.png" // Replace with actual image
                />
              </View>
              <View style={styles.menuContent}>
                <View style={styles.itemList}>
                  {renderItems(data.espaco.itens)}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Observations */}
        {data.observacoes && data.observacoes.length > 0 && (
          <View style={styles.observationContainer}>
            <Text style={styles.observationTitle}>Observações Importantes</Text>
            <View style={styles.itemList}>{renderItems(data.observacoes)}</View>
          </View>
        )}

        {/* Footer with price */}
        <View style={styles.footer}>
          <Text style={styles.price}>
            Investimento Total: {data.preco || "A definir"}
          </Text>
          <Text style={styles.footerText}>
            Este orçamento é válido por 15 dias. Valores sujeitos a alterações
            conforme disponibilidade.
          </Text>
          <Text style={styles.footerText}>
            Darlene Machado Eventos © {new Date().getFullYear()}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
