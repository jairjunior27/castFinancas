import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";
import { TransacoesProvider } from "@/globalContext/transacoes/provider";
import { UserProvider } from "@/globalContext/usuario/provider";
import { SQLiteProvider } from "expo-sqlite";
import { inicializeDataBase } from "@/utils/dataBase/inicializeBancoDados";


export default function Layout() {
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão para notificações negada");
      }
    };

    if (Platform.OS !== "web") {
      requestPermissions();
    }
  }, []);
  return (
    <SQLiteProvider databaseName="transacoes.db" onInit={inicializeDataBase}>
    <TransacoesProvider>
   
      <UserProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: "rgba(3, 3, 3, 0.69)" },
            tabBarActiveBackgroundColor: "rgba(0, 0, 0, 0.41)",
            tabBarInactiveTintColor: "#ccc",
            tabBarActiveTintColor: "#EEFF00",
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={20} color={color} />
              ),
            }}
          ></Tabs.Screen>
          <Tabs.Screen
            name="grafico"
            options={{
              title: "Grafico",
              tabBarIcon: ({ color }) => (
                <Ionicons name="bar-chart" size={20} color={color} />
              ),
            }}
          ></Tabs.Screen>
          <Tabs.Screen
            name="transacoes"
            options={{
              title: "Transações",
              tabBarIcon: ({ color }) => (
                <Ionicons name="wallet" size={20} color={color} />
              ),
            }}
          ></Tabs.Screen>
          <Tabs.Screen
            name="fatura"
            options={{
              title: "Fatura",
              tabBarIcon: ({ color }) => (
                <Ionicons name="wallet" size={20} color={color} />
              ),
            }}
          ></Tabs.Screen>
          <Tabs.Screen
            name="perfil"
            options={{
              title: "Perfil",
              tabBarIcon: ({ color }) => (
                <Ionicons name="person" size={20} color={color} />
              ),
            }}
          ></Tabs.Screen>
        </Tabs>
      </UserProvider>
     
    </TransacoesProvider>

    </SQLiteProvider>
  );
}
