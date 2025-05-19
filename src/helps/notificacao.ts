import { FaturaType } from "@/types/faturaType";
import * as Notifications from "expo-notifications";
import { formatarMoeda } from "./formatValor";
import { FormatDinheiroBr } from "./formatDinheiro";

export const verificaNotificacao = async (fatura: FaturaType) => {
  const hj = new Date();
  hj.setHours(0, 0, 0, 0); 

  const dataFatura = new Date(fatura.data);
  dataFatura.setHours(0, 0, 0, 0); 

  const tresDiasAntes = new Date(dataFatura);
  tresDiasAntes.setDate(tresDiasAntes.getDate() - 3); 
  tresDiasAntes.setHours(0, 0, 0, 0); 

    if (hj.getTime() === dataFatura.getTime()) {
    console.log("🔔 VENCE HOJE -", fatura.titulo);

    // Notificação para o vencimento no mesmo dia
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Fatura vence hoje!",
        body: `Sua fatura "${fatura.titulo}" de  ${FormatDinheiroBr(fatura.valor)} vence hoje.`,
        sound: true,
      },
      trigger: {
        year: dataFatura.getFullYear(),
        month: dataFatura.getMonth() + 1, 
        day: dataFatura.getDate(),
        hour: 9, 
        minute: 0,
        repeats: false,
      } as Notifications.CalendarTriggerInput, 
    });
  }

  
  if (hj.getTime() === tresDiasAntes.getTime()) {
    console.log("🔔 VENCE EM 3 DIAS -", fatura.titulo);

   
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Fatura vence em 3 dias!",
        body: `Sua fatura "${fatura.titulo}" de  ${FormatDinheiroBr(fatura.valor)} vence em 3 dias.`,
        sound: true,
      },
      trigger: {
        year: tresDiasAntes.getFullYear(),
        month: tresDiasAntes.getMonth() + 1, 
        day: tresDiasAntes.getDate(),
        hour: 9, 
        minute: 0,
        repeats: false,
      } as Notifications.CalendarTriggerInput, 
    });
  }
};
