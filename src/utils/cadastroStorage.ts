import { cadastroType } from "../types/cadastroTypeStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const cadastroStore = async (value: cadastroType) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("cadastro", jsonValue);
  } catch (e) {
    console.log("erro ao cadastrar storage ", e);
  }
};

export const getCadastro = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("cadastro");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("não foi possivel carregar os dados", e);
  }
};


export const atualizarImagem = async (novaImagem: string) => {
  const dados = await getCadastro();
  if (dados) {
    const atualizado = { ...dados, imagem: novaImagem };
    await cadastroStore(atualizado);
    return atualizado;
  }
  return null;
};
