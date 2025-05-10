import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectedIcon } from "../slectedIcon";
import { useContext, useEffect, useState } from "react";
import { style } from "./style";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import { ReceitasHelps } from "@/helps/receitasHelps";
import { ContextTransacao } from "@/globalContext/transacoes/context";
import { formatarMoeda } from "@/helps/formatValor";
export const Receita = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [valor, setValor] = useState("");
  const [isdate, setIsDate] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (msg !== "") {
      const time = setTimeout(() => {
        setMsg("");
        transacao?.setIsModal(false);
      }, 3000);
      return () => clearTimeout(time);
    }
  }, [msg]);
  const iconReceitas = ReceitasHelps;
  const tipo: "Entrada" | "Saida" = "Entrada";
  const transacao = useContext(ContextTransacao);
  const handleDateChange = (e: any, SelectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (SelectedDate) {
      setDate(SelectedDate);
      setIsDate(true);
    }
  };

  const salvarTransacao = async () => {
    if (!title || !valor || selected === null) {
      setMsg("Favor preencher todos os campos !");

      return;
    }
    const novaTransacao = {
      id: new Date().getTime(),
      title,
      valor: parseFloat(
        valor
          .replace(/\./g, "")
          .replace(",", ".")
          .replace(/[^\d.-]/g, "")
      ),
      data: date.toISOString(),
      icon: ReceitasHelps.find((item) => item.id === selected)?.icon || "",
      tipo,
    };
    try {
      await transacao?.adicionarTransacao(novaTransacao);
      setTitle("");
      setValor("");
      setSelected(null);
      setMsg("Transação salva com sucesso !");
    } catch (e) {
      console.error("Erro ao salvar transação:", e);
    }
  };

  const handleChange = (text: string) => {
    const formatado = formatarMoeda(text);
    setValor(formatado);
  };

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={style.container}>
          {iconReceitas.map((item) => (
            <SelectedIcon
              icon={item.icon}
              label={item.label}
              key={item.id}
              onPress={() => setSelected(item.id)}
              isSelect={selected === item.id}
            />
          ))}
        </View>
      </ScrollView>

      <View style={style.formContainer}>
        <TextInput
          style={style.input}
          placeholder="Digite o nome da Receita"
          value={title}
          onChangeText={(e) => setTitle(e)}
        />
        <TextInput
          style={style.input}
          placeholder="Digite o valor R$"
          keyboardType="numeric"
          onChangeText={handleChange}
          value={valor}
        />
        <TouchableOpacity
          style={style.inputData}
          onPress={() => setShowPicker(true)}
        >
          <Feather name="calendar" size={24} color="#fff" />
          <Text style={style.textInputData}>
            {!isdate ? "Adicione a data" : date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {msg && <Text style={style.textoMsg}>{msg}</Text>}
        <TouchableOpacity style={style.buttom} onPress={salvarTransacao}>
          <Text style={style.textButtom}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
