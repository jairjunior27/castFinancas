import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, StatusBar, Text, View } from "react-native";
import { style } from "./(tabs)/style/styleIndexIntro";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Page() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("cadastro");
        setTimeout(() => {
          if (userData) {
            router.replace("/(tabs)/home"); 
          } else {
            router.replace("/cadastro"); 
          }
        }, 3000); 
      } catch (error) {
        console.error("Erro ao verificar usuário:", error);
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={style.container}>
      <View style={style.containerIndex}>
        <Animated.View
          style={[
            style.titleLogo,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Feather name="trending-up" size={32} color="#40F313" />
          <Text style={style.titleLogo1}>Cast</Text>
          <Text style={style.titleLogo2}>Finanças</Text>
        </Animated.View>
        <Animated.View
          style={[
            style.containerImage,
            { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
          ]}
        >
          <Image
            source={require("../assets/images/controle1.png")}
            style={style.image}
          />
        </Animated.View>
        <Animated.View
          style={[
            style.titleContainer,
            { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
          ]}
        >
          <Text style={style.titleBemVindo}>
            Bem-vindo(a) ao Cash Finanças! Gerencie suas finanças de forma
            simples e eficiente. Com o Cash Finanças, você tem total controle
            sobre seus gastos, ganhos e investimentos, tudo em um só lugar.
          </Text>
        </Animated.View>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
        />
      </View>
    </View>
  );
}
