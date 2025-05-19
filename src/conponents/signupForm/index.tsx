import { Feather } from "@expo/vector-icons";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { style } from "./style";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as imagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { cadastroStore } from "@/utils/cadastroStorage";

const signupSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().nonempty("O email é obrigatório").email("E-mail invalido"),
  idade: z
    .string()
    .min(1, "A idade é obrigatória.")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 120,
      {
        message: "A idade deve ser um número entre 1 e 120.",
      }
    ),
});

type formSchema = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const [imagem, setImagem] = useState<string | null>(null);
  const [msg, setMensagem] = useState("");
  const router = useRouter();

  useEffect(() => {
    const time = setTimeout(() => {
      setMensagem("");
    }, 3000);
    return () => clearTimeout(time);
  }, [msg]);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const handleImagem = async () => {
    const { status } = await imagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Habilite o acesso à galeria.");
      return;
    }
    const result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const onSubmit = async (data: formSchema) => {
    if (!imagem) {
      setMensagem("Você precisa adicionar uma imagem.");
      return;
    }
    const formData = {
      nome: data.nome,
      email: data.email,
      idade: data.idade,
      imagem: imagem,
    };

    try {
      if (formData) {
        await cadastroStore(formData);
        setMensagem("Cadastro realizado com sucesso!");
        router.push("/(tabs)/home");
      } else {
        setMensagem("Favor preencher todos os campos");
      }
    } catch (e) {
      console.log("erro ao cadastrar", e);
    }
  };

  return (
    <View style={style.container}>
      <TextInput
        placeholder="Digite seu nome"
        style={style.inputItem}
        onChangeText={(e) => setValue("nome", e)}
      />
      {errors.nome && (
        <Text style={style.textError}>{errors.nome.message}</Text>
      )}
      <TextInput
        placeholder="Digite sua idade"
        style={style.inputItem}
        onChangeText={(e) => setValue("idade", e.replace(/\D/g, ""))}
        keyboardType="numeric"
      />
      {errors.idade && (
        <Text style={style.textError}>{errors.idade.message}</Text>
      )}

      <TextInput
        placeholder="Digite seu email"
        style={style.inputItem}
        onChangeText={(e) => setValue("email", e)}
      />
      {errors.email && (
        <Text style={style.textError}>{errors.email.message}</Text>
      )}
      <TextInput />
      <TouchableOpacity style={style.conteudoImagem} onPress={handleImagem}>
        <Feather name="image" size={30} color="#ccc" />
        <Text style={style.textImage}>Adione uma imagem</Text>
      </TouchableOpacity>
      {imagem && (
        <View style={style.containerPreview}>
          <View style={style.conteudoPreview}>
            <Image source={{ uri: imagem }} style={style.preview} />
          </View>
        </View>
      )}
      <TouchableOpacity
        style={style.conteudoButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text>Cadastar</Text>
      </TouchableOpacity>
      {msg && (
        <View style={style.erroImagem}>
          <Text style={style.textoErroImagem}>{msg}</Text>
        </View>
      )}
    </View>
  );
};
