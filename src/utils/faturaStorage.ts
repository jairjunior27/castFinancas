import AsyncStorage from "@react-native-async-storage/async-storage";
import { FaturaType } from "../types/faturaType";

const STORAGE_KEY = "@faturas";

export const salvarFatura = async (fatura: FaturaType) => {
  const armazenadas = await AsyncStorage.getItem(STORAGE_KEY);
  const faturas: FaturaType[] = armazenadas ? JSON.parse(armazenadas) : [];

  faturas.push(fatura);

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(faturas));
};

export const getFatura = async () => {
  try {
    const jsonValueFatura = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValueFatura ? JSON.parse(jsonValueFatura) : [];
  } catch (e) {
    console.log("não foi possivel carregar os dados", e);
    return [];
  }
};


export const limpaFaturasVencidas = async () =>{
   const armazenadas = await AsyncStorage.getItem(STORAGE_KEY)
   const faturas: FaturaType[] = armazenadas ? JSON.parse(armazenadas) : []

   const hoje = new Date()
   hoje.setHours(0,0,0,0)

   const faturasValidas = faturas.filter(fatura => {
    const dataFatura = new Date(fatura.data)
    dataFatura.setHours(0,0,0,0)
    return dataFatura >= hoje
   })

   await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(faturasValidas))
}
