import { FaturaType } from "@/types/faturaType";
import * as Notifications from "expo-notifications";

export const verificaNotificacao = async (fatura: FaturaType) => {
  const hj = new Date();
  hj.setHours(0, 0, 0, 0); // Zera a hora para comparação com a data

  const dataFatura = new Date(fatura.data);
  dataFatura.setHours(0, 0, 0, 0); // Zera a hora da data da fatura

  const tresDiasAntes = new Date(dataFatura);
  tresDiasAntes.setDate(tresDiasAntes.getDate() - 3); // Ajusta para 3 dias antes
  tresDiasAntes.setHours(0, 0, 0, 0); // Zera a hora da data 3 dias antes

  // Verificar se a notificação para o "dia da fatura" deve ser agendada
  if (hj.getTime() === dataFatura.getTime()) {
    console.log("🔔 VENCE HOJE -", fatura.titulo);

    // Notificação para o vencimento no mesmo dia
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Fatura vence hoje!",
        body: `Sua fatura "${fatura.titulo}" de R$ ${fatura.valor.toFixed(2)} vence hoje.`,
        sound: true,
      },
      trigger: {
        year: dataFatura.getFullYear(),
        month: dataFatura.getMonth() + 1, // Mês 0 indexado, então +1
        day: dataFatura.getDate(),
        hour: 9, // Defina o horário da notificação (9:00 AM)
        minute: 0,
        repeats: false,
      } as Notifications.CalendarTriggerInput, // Agendamento baseado em data
    });
  }

  // Verificar se a notificação para "3 dias antes" da fatura deve ser agendada
  if (hj.getTime() === tresDiasAntes.getTime()) {
    console.log("🔔 VENCE EM 3 DIAS -", fatura.titulo);

    // Notificação para 3 dias antes do vencimento
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Fatura vence em 3 dias!",
        body: `Sua fatura "${fatura.titulo}" de R$ ${fatura.valor.toFixed(2)} vence em 3 dias.`,
        sound: true,
      },
      trigger: {
        year: tresDiasAntes.getFullYear(),
        month: tresDiasAntes.getMonth() + 1, // Mês 0 indexado, então +1
        day: tresDiasAntes.getDate(),
        hour: 9, // Defina o horário da notificação (9:00 AM)
        minute: 0,
        repeats: false,
      } as Notifications.CalendarTriggerInput, // Agendamento baseado em data
    });
  }
};
