import { ContextUser } from "@/globalContext/usuario/context";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  Modal,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { stylePerfil } from "./style/stylePerfil";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { SignupEditForm } from "@/conponents/signupEdit";
import { getCadastro } from "@/utils/cadastroStorage";

export default function Page() {
  const usuario = useContext(ContextUser);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    const getAll = async () => {
      const response = await getCadastro();
      if (response) {
        usuario.setUser(response);
      }
    };

    getAll();
  }, []);

  if (!usuario || !usuario.user) {
    return (
      <View style={stylePerfil.profileBox}>
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  const handleEditImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a galeria foi negada.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      try {
        await usuario.editarImagem(result.assets[0].uri);
      } catch (err) {
        console.log("Erro ao salvar imagem:", err);
      }
    }
  };

  const handleDelete = async () => {
    await usuario.excluirConta();
  };

  return (
    <View style={stylePerfil.profileBox}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={stylePerfil.imageBox}>
        {usuario.user.imagem && (
          <Image
            source={{ uri: usuario.user.imagem }}
            style={stylePerfil.image}
          />
        )}
        <TouchableOpacity
          style={stylePerfil.editIcon}
          onPress={handleEditImage}
        >
          <Feather name="edit" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={stylePerfil.name}>{usuario.user.nome}</Text>
      <Text style={stylePerfil.info}>Idade: {usuario.user.idade} anos</Text>
      <Text style={stylePerfil.info}>Email: {usuario.user.email}</Text>

      <TouchableOpacity
        style={stylePerfil.editButton}
        onPress={() => setIsModal(true)}
      >
        <Text style={stylePerfil.editText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={stylePerfil.deleteButton} onPress={handleDelete}>
        <Text style={stylePerfil.deleteText}>Excluir Conta</Text>
      </TouchableOpacity>

      <Text style={stylePerfil.rodape}>
        Desenvolvido por Jair Junior © 2025
      </Text>

      <Modal
        visible={isModal}
        animationType="slide"
        onRequestClose={() => setIsModal(false)}
      >
        <View style={stylePerfil.container}>
          <View style={stylePerfil.containerPerfil}>
            <View style={stylePerfil.iconBack}>
              <TouchableOpacity onPress={() => setIsModal(false)}>
                <Feather name="chevron-left" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={stylePerfil.titleLogo}>
              <Feather name="trending-up" size={32} color="#40F313" />
              <Text style={stylePerfil.titleLogo1}>Cast</Text>
              <Text style={stylePerfil.titleLogo2}>Finanças</Text>
            </View>

            <SignupEditForm />
          </View>
        </View>
      </Modal>

     
    </View>
  );
}
