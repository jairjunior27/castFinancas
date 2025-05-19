import { useContext, useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import * as Notifications from "expo-notifications";
import { styleFatura } from "./style";
import { Feather } from "@expo/vector-icons";
import { useTransacoesDataBase } from "@/utils/dataBase/bancoSqlTransacao";
import { formatarMoeda, limparMoeda } from "@/helps/formatValor";
import { ContextTransacao } from "@/globalContext/transacoes/context";
import { verificaNotificacao } from "@/helps/notificacao";

export const Fatura = () => {
  const [titulo, setTitulo] = useState<string>("");
  const [valor, setValor] = useState<string>("");
  const [dataVencimento, setDataVencimento] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const { adcionarFatura } = useTransacoesDataBase();
  const [msg, setMsg] = useState("");
  const [disable, setDisable] = useState<boolean>(false);
  const transacao = useContext(ContextTransacao);
  useEffect(() => {
    if (msg !== "") {
      const time = setTimeout(() => {
        setMsg("");
        transacao?.setIsModal(false);
        setDisable(false);
      }, 3000);
      return () => clearTimeout(time);
    }
  }, [msg]);
  const handleSalvar = async () => {
    if (!titulo.trim() || !valor.trim()) {
      setMsg("Preencha o todos os campos !");
      return;
    }

    const novaFatura = {
      id: Date.now(),
      titulo,
      valor: limparMoeda(valor),
      data: dataVencimento.getTime(),
    };

  
    await adcionarFatura(novaFatura);

    await verificaNotificacao(novaFatura)
    setMsg("Fatura salva e notificações agendadas!");
    setDisable(true);
    setTitulo("");
    setValor("");
    setDataVencimento(new Date());
    setIsDate(false);
  };

  const handleChange = (text: string) => {
    const formatado = formatarMoeda(text);
    setValor(formatado);
  };
  return (
    <View>
      <TextInput
        value={titulo}
        onChangeText={setTitulo}
        style={styleFatura.input}
        placeholder="Digite a fatura Ex: Cartão Nubank"
        placeholderTextColor="#aaa"
      />
      <TextInput
        value={valor}
        onChangeText={handleChange}
        style={styleFatura.input}
        placeholder="Digite o valor da fatura"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={() => setMostrarDatePicker(true)}
        style={[
          styleFatura.buttonData,
          disable && { backgroundColor: "#ccc", opacity: 0.4 },
        ]}
        disabled={disable}
      >
        <Feather name="calendar" size={24} color="#fff" />
        <Text style={styleFatura.textoButtom}>
          {!isDate ? "Adicionar Data" : dataVencimento.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {mostrarDatePicker && (
        <DateTimePicker
          value={dataVencimento}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => {
            setMostrarDatePicker(false);
            if (date) setDataVencimento(date);
            setIsDate(true);
          }}
        />
      )}
      {msg && <Text style={styleFatura.textoMsg}>{msg}</Text>}
      <TouchableOpacity
        style={[
          styleFatura.button,
          disable && { backgroundColor: "#ccc", opacity: 0.4 },
        ]}
        onPress={handleSalvar}
        disabled={disable}
      >
        <Text style={styleFatura.textoButtom}>Salvar Fatura</Text>
      </TouchableOpacity>
    </View>
  );
};
