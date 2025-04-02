"use client";
import React, { useState } from "react";
import { PDFDownloadLink, BlobProvider, PDFViewer } from "@react-pdf/renderer";
import { EventQuote } from "@/components/event-quote";

import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const EventQuoteGenerator = () => {
  // Example data matching your FormData type
  const exampleData = {
    quantidadePessoas: 100,
    entrada: {
      selecionado: true,
      itens: [
        "Canapés de salmão",
        "Bruschetta de tomate",
        "Queijo brie com geleia",
      ],
    },
    rodaButeco: {
      selecionado: true,
      itens: [
        "Batata frita",
        "Torresmo",
        "Aipim frito",
        "Polenta frita",
        "Linguiça caseira",
        "Filé de peito empanado",
        "Tilápia frita",
      ],
    },
    almoco: {
      selecionado: false,
      itens: [],
    },
    jantar: {
      selecionado: true,
      itens: [
        "Filé ao molho madeira",
        "Arroz branco",
        "Batata gratinada",
        "Salada verde",
      ],
    },
    churrasco: {
      selecionado: false,
      itens: [],
    },
    coffeeBreak: {
      selecionado: true,
      itens: [
        "Café",
        "Água",
        "Sucos naturais",
        "Mini pães de queijo",
        "Bolos variados",
      ],
    },
    bebidas: {
      selecionado: true,
      itens: [
        "Água mineral",
        "Refrigerantes",
        "Sucos naturais",
        "Cerveja",
        "Vinho",
      ],
    },
    espaco: {
      selecionado: true,
      itens: [
        "Salão principal com capacidade para 150 pessoas",
        "Estacionamento",
        "Área externa",
      ],
    },
    preco: "R$ 15.000,00",
    observacoes: [
      "Taxa de serviço não inclusa (12%)",
      "Duração do evento: 6 horas",
      "Equipe de serviço incluída no valor",
    ],
  };

  return (
    <div>
      <h1>Orçamento de Eventos - Darlene Machado</h1>
      <div>
        <PDFViewer className="w-screen h-screen">
          <EventQuote formData={exampleData} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default EventQuoteGenerator;
