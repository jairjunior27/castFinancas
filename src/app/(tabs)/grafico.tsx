import React, { useContext, useEffect, useRef, useState } from "react";
import { PieChart } from "react-native-chart-kit";
import {
  Dimensions,
  View,
  Alert,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import ViewShot, { captureRef } from "react-native-view-shot";

import { styleGrafico } from "./style/styleGrafico";
import { Picker } from "@react-native-picker/picker";
import { cadastroType } from "@/types/cadastroTypeStorage";
import { getCadastro } from "@/utils/cadastroStorage";
import { FormatData } from "@/helps/formatData";
import { transacoesType } from "@/types/transacoes";
import { Feather } from "@expo/vector-icons";
import { mesCalendar } from "@/helps/calendarioMensal";
import { ContextTransacao } from "@/globalContext/transacoes/context";

const screenWidth = Dimensions.get("window").width;

export default function RelatorioGrafico() {
  const [dadosGrafico, setDadosGrafico] = useState<
    {
      name: string;
      value: number;
      color: string;
      legendFontColor: string;
      legendFontSize: number;
    }[]
  >([]);

  const [relatorio, setRelatorio] = useState("");
  const [usuario, setUsuario] = useState<cadastroType | null>(null);
  const [imagemBase64, setImagemBase64] = useState<string | null>(null);
  const dadosTransaqcoes = useContext(ContextTransacao);
  const [mesAtual, setMesAtual] = useState(new Date().getMonth() + 1);
  const [anoAtual, setanoAtual] = useState(new Date().getFullYear());
  const chartRef = useRef(null);
  const Width = Dimensions.get("window").width;
  const Height = Dimensions.get("window").height;

  useEffect(() => {
    const userAll = async () => {
      const user = await getCadastro();
      setUsuario(user);
    };
    userAll();
  }, []);

  useEffect(() => {
    carregarDados();
  }, [mesAtual, anoAtual]);

  const carregarDados = async () => {
    if (!dadosTransaqcoes?.transacoes?.length) return;

    const transacoesFiltradas = dadosTransaqcoes.transacoes.filter((t) => {
      const [, mes, ano] = FormatData(t.data).split("/").map(Number);
      return mes === mesAtual && ano === anoAtual;
    });

    const resumo = transacoesFiltradas.reduce(
      (acc: any, item: transacoesType) => {
        acc[item.tipo] = (acc[item.tipo] || 0) + item.valor;
        return acc;
      },
      {}
    );

    const dados = Object.keys(resumo).map((label, index) => ({
      name: label,
      value: resumo[label],
      color: index % 2 === 0 ? "#2E8B57" : "#FF4500",
      legendFontColor: "#000",
      legendFontSize: 14,
    }));

    setDadosGrafico(dados);
    setTimeout(() => capturarGrafico(dados, transacoesFiltradas), 1000);
  };

  const capturarGrafico = async (dados: any, transacoes: transacoesType[]) => {
    if (!chartRef.current || dados.length === 0) return;

    try {
      const uri = await captureRef(chartRef, {
        format: "png",
        quality: 0.8,
        result: "base64",
      });

      const imagem = `data:image/png;base64,${uri}`;
      setImagemBase64(imagem);
      gerarRelatorio(dados, imagem, transacoes, usuario);
    } catch (error) {
      console.error("Erro ao capturar gráfico", error);
    }
  };

  const gerarRelatorio = (
    dados: any,
    imagem: string,
    transacoes: transacoesType[],
    usuario?: cadastroType | null
  ) => {
    const totalReceitas = transacoes
      .filter((t) => t.tipo === "Entrada")
      .reduce((acc, t) => acc + t.valor, 0);
    const totalDespesas = transacoes
      .filter((t) => t.tipo === "Saida")
      .reduce((acc, t) => acc + t.valor, 0);
    const saldoAtual = totalReceitas - totalDespesas;

    const mesPassado = new Date();
    mesPassado.setMonth(mesPassado.getMonth() - 1);
    let saldoMesAnterior = 0;

    const transacoesMesPassado =
      dadosTransaqcoes?.transacoes.filter((t) => {
        const data = new Date(t.data);
        return (
          data.getMonth() === mesPassado.getMonth() &&
          data.getFullYear() === mesPassado.getFullYear()
        );
      }) || [];

    if (transacoesMesPassado.length > 0) {
      const totalReceitasPassado = transacoesMesPassado
        .filter((t) => t.tipo === "Entrada")
        .reduce((acc, t) => acc + t.valor, 0);
      const totalDespesasPassado = transacoesMesPassado
        .filter((t) => t.tipo === "Saida")
        .reduce((acc, t) => acc + t.valor, 0);

      saldoMesAnterior = totalReceitasPassado - totalDespesasPassado;
    }

    let comparacaoMensagem = "";
    if (saldoAtual > saldoMesAnterior) {
      comparacaoMensagem = `Parabéns! ${usuario?.nome}, você gastou menos do que no mês anterior.`;
    } else if (saldoAtual < saldoMesAnterior) {
      comparacaoMensagem = `Atenção! ${usuario?.nome}, você gastou mais do que no mês anterior.`;
    } else {
      comparacaoMensagem = `${usuario?.nome}, seu saldo ficou igual ao do mês passado.`;
    }

    let textoRelatorio = `
      <html>
        <head>
          <style>
            body { font-family: Arial; padding: 20px; }
            h1, h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            .divider { margin: 10px 0; border-bottom: 1px solid #ccc; }
          </style>
        </head>
        <body>
          <h1>Relatório Financeiro - ${mesAtual}/${anoAtual}</h1>
    `;

    dados.forEach((item: any) => {
      textoRelatorio += `<p><strong>${
        item.name
      }:</strong> R$ ${item.value.toFixed(2)}</p>`;
    });

    textoRelatorio += `
      <h2>Gráfico Financeiro</h2>
      <img src="${imagem}" style="width: 100%; height: auto;" />
      <div class="divider"></div>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoria</th>
            <th>Valor (R$)</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          ${transacoes
            .map(
              (t) => `
                <tr>
                  <td>${t.title}</td>
                  <td>${t.tipo}</td>
                  <td>${t.valor.toFixed(2)}</td>
                  <td>${FormatData(t.data)}</td>
                </tr>`
            )
            .join("")}
        </tbody>
      </table>
      <h2>Total Geral</h2>
      <p><strong>Receitas Totais:</strong> R$ ${totalReceitas.toFixed(2)}</p>
      <p><strong>Despesas Totais:</strong> R$ ${totalDespesas.toFixed(2)}</p>
      <p><strong>Saldo Final:</strong> R$ ${saldoAtual.toFixed(2)}</p>
      <p><strong>Total de Transações:</strong> ${transacoes.length}</p>
      <p style="font-size: 18px; font-weight: bold; text-align: center; margin-top: 20px">${comparacaoMensagem}</p>
    </body></html>`;

    setRelatorio(textoRelatorio);
  };

  const gerarPDF = async () => {
    if (!relatorio) {
      Alert.alert("Erro", "Relatório ainda não gerado.");
      return;
    }

    try {
      const { uri } = await Print.printToFileAsync({
        html: relatorio,
        base64: false,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Erro", "Compartilhamento não disponível.");
      }
    } catch (error) {
      console.error("Erro ao gerar PDF", error);
    }
  };

  return (
    <View style={styleGrafico.container}>
         <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
      <View style={styleGrafico.containerGrafico}>
        <View style={styleGrafico.titleLogo}>
          <Feather name="trending-up" size={32} color="#40F313" />
          <Text style={styleGrafico.titleLogo1}>Cast</Text>
          <Text style={styleGrafico.titleLogo2}>Finanças</Text>
        </View>

        <View style={styleGrafico.data}>
          <Picker
            selectedValue={mesAtual}
            onValueChange={(e) => setMesAtual(e)}
            style={styleGrafico.Picker}
            mode="dropdown"
          >
            {mesCalendar.map((mes, i) => (
              <Picker.Item
                key={i + 1}
                label={mes}
                value={i + 1}
                style={styleGrafico.pickerText}
              />
            ))}
          </Picker>
          <Picker
            selectedValue={anoAtual}
            onValueChange={(e) => setanoAtual(e)}
            style={styleGrafico.Picker}
            mode="dropdown"
          >
            {Array.from({ length: 2 }, (_, i) => {
              const ano = new Date().getFullYear() - i;
              return (
                <Picker.Item
                  key={ano}
                  label={String(ano)}
                  value={ano}
                  style={styleGrafico.pickerText}
                />
              );
            })}
          </Picker>
        </View>

        <ViewShot
          ref={chartRef}
          style={{ marginTop: 16, alignItems: "center" }}
          options={{ format: "png", quality: 0.8 }}
        >
          {dadosGrafico.length > 0 ? (
            <PieChart
              data={dadosGrafico}
              width={screenWidth * .9}
              height={Height * 0.3}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#f1f1f1",
                backgroundGradientTo: "#e2e2e2",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          ) : (
            <View
              style={{
                height: 250,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Não existem dados</Text>
            </View>
          )}
        </ViewShot>
        <View style={styleGrafico.buttomContainer}>
          <TouchableOpacity onPress={gerarPDF} style={styleGrafico.button}>
            <Text style={styleGrafico.textoButtom}>Baixar Relatório PDF</Text>
          </TouchableOpacity>
        </View>
     
      </View>
    </View>
  );
}
