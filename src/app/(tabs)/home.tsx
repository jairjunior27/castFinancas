import { Feather } from "@expo/vector-icons";
import {
  Image,
  Text,
  View,
  Modal,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { style } from "../style/styleHome";
import { useContext, useEffect, useState } from "react";
import { TiposTransacoes } from "@/helps/typesTransacao";
import { getCadastro } from "@/utils/cadastroStorage";
import { Balanco } from "@/conponents/balanco";
import { Transacoes } from "@/conponents/transacoes";
import { styleModal } from "../style/styleModal";
import { ButtomItem } from "@/conponents/buttom";
import { Despesas } from "@/conponents/despesas";
import { Receita } from "@/conponents/receita";
import { Fatura } from "@/conponents/fatura";
import { ContextUser } from "@/globalContext/usuario/context";
import { ContextTransacao } from "@/globalContext/transacoes/context";

export default function Page() {
  const [categoria, setCategoria] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const usuario = useContext(ContextUser);
  const data = TiposTransacoes;
  const transacoes = useContext(ContextTransacao)
  
if (!transacoes) {
  return null; 
}
  useEffect(() => {
    const loadCadastro = async () => {
      if (!usuario?.user) {
        const dados = await getCadastro();
        usuario?.setUser(dados);
      }
    };
    loadCadastro();
  }, []);

  return (
    <View style={style.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={style.conteudoHeader}>
        <View style={style.titleLogo}>
          <Feather name="trending-up" size={32} color="#fff" />
          <Text style={style.titleLogo1}>Cast</Text>
          <Text style={style.titleLogo2}>Finanças</Text>
        </View>
        <View style={style.containerTextoImagem}>
          <View style={style.titleSaudacoes}>
            <Text style={style.textoContainerImagemTexto}>
              Seja bem vindo(a)
            </Text>
            <Text
              style={style.titleNome}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {usuario?.user && usuario?.user.nome}
            </Text>
          </View>
          {usuario?.user && usuario?.user.imagem && (
            <View style={style.containerImagem}>
              <Image
                source={{ uri: usuario.user.imagem }}
                style={style.imagem}
              />
            </View>
          )}
        </View>
      </View>
      <View style={style.containerIndex}>
        <Balanco />
        <Transacoes />
        <Modal
          visible={transacoes?.isModal}
          animationType="slide"
          onRequestClose={() => transacoes?.setIsModal(false)}
        >
          <View style={styleModal.container}>
            <View style={styleModal.containerInTerno}>
              <View style={styleModal.headerModal}>
                <TouchableOpacity onPress={() => transacoes.setIsModal(false)}>
                  <View style={styleModal.iconBack}>
                    <Feather name="chevron-left" size={22} color="#fff" />
                  </View>
                </TouchableOpacity>
                <Text style={styleModal.textoModalHeader}>
                  Adcionar Transação
                </Text>
              </View>

              <View style={styleModal.buttomSelect}>
                {data.map((item) => (
                  <ButtomItem
                    label={item.label}
                    key={item.id}
                    isSelected={selected === item.id}
                    onPressButtom={() => {
                      setSelected(item.id);
                      setCategoria(item.label);
                    }}
                  />
                ))}
              </View>
              {categoria === "Despesa" && <Despesas />}
              {categoria === "Receita" && <Receita />}
              {categoria === "Fatura" && <Fatura />}
            </View>
          </View>
        </Modal>
      </View>
      <TouchableOpacity
        onPress={() => transacoes.setIsModal(true)}
        style={style.adcionarTransacoes}
      >
        <Feather name="plus" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
