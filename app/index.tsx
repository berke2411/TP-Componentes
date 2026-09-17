import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Guitarra = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  image: ImageSourcePropType;
};

const DATA: Guitarra[] = [
  {
    id: 1,
    titulo: "John Mayer's black strat",
    descripcion:
      "Réplica de la icónica Fender Stratocaster negra usada por John Mayer en sus giras.",
    // Imagen local (require)
    image: require("../assets/images/black-strat.jpg"),
    precio: 15000,
  },
  {
    id: 2,
    titulo: "David Gilmour's Black Strat",
    descripcion:
      "La Stratocaster de 1969 utilizada por David Gilmour en los discos más famosos de Pink Floyd.",
    image: {
      uri: "https://www.groundguitar.com/wp-content/uploads/2022/12/David-Gilmours-Black-Strat-1969-Fender-Stratocaster.jpg",
    },
    precio: 25000,
  },
  {
    id: 3,
    titulo: "SRV 'Number One' Stratocaster",
    descripcion:
      "La guitarra principal de Stevie Ray Vaughan, apodada 'Number One'.",
    image: {
      uri: "https://www.groundguitar.com/wp-content/uploads/2022/05/Stevie-Ray-Vaughan-Number-One-Fender-Stratocaster.jpg",
    },
    precio: 30000,
  },
  {
    id: 4,
    titulo: "Jimi Hendrix's Woodstock Stratocaster",
    descripcion:
      "La Stratocaster que Jimi Hendrix tocó durante su legendaria presentación en Woodstock.",
    image: {
      uri: "https://www.groundguitar.com/wp-content/uploads/2018/08/Jimi-Hendrixs-1968-Fender-Stratocaster-that-he-used-at-Woodstock.jpg",
    },
    precio: 500000,
  },
  {
    id: 5,
    titulo: "Eric Clapton's 'Blackie' Stratocaster",
    descripcion:
      "'Blackie', una de las guitarras más famosas de Eric Clapton, ensamblada a partir de varias Stratocasters.",
    image: {
      uri: "https://www.groundguitar.com/wp-content/uploads/2018/07/Eric-Clapton-Blackie-Stratocaster.jpg",
    },
    precio: 450000,
  },
  {
    id: 6,
    titulo: "Jimmy Page's 1959 Les Paul 'Number One'",
    descripcion:
      "La Gibson Les Paul de 1959 que Jimmy Page usó en la mayoría de las grabaciones de Led Zeppelin.",
    image: {
      uri: "https://www.groundguitar.com/wp-content/uploads/2022/11/Jimmy-Pages-1959-Gibson-Les-Paul-Standard-Number-One-electric-guitar.jpg",
    },
    precio: 400000,
  },
  {
    id: 7,
    titulo: "Slash's 1959 Les Paul Replica (Kris Derrig)",
    descripcion:
      "Réplica de una Les Paul de 1959 construida por Kris Derrig y usada por Slash en Appetite for Destruction.",
    image: {
      uri: "https://www.groundguitar.com/wp-content/uploads/2013/07/Les-Paul-Slash-Replica-Kris-Derrig-9-0607.jpg",
    },
    precio: 120000,
  },
  {
    id: 8,
    titulo: "B.B. King's 'Lucille' Gibson ES",
    descripcion:
      "'Lucille', la Gibson ES que B.B. King tocó durante décadas de carrera.",
    image: {
      uri: "https://upload.wikimedia.org/wikipedia/commons/e/eb/B.B._King%2C_Lucille%2C_2009-07-17.jpg",
    },
    precio: 200000,
  },
  {
    id: 9,
    titulo: "Kurt Cobain's 1969 Fender Competition Mustang",
    descripcion:
      "La Mustang zurda que Kurt Cobain tocó en varios shows en vivo de Nirvana.",
    image: {
      uri: "https://www.groundguitar.com/wp-content/uploads/2019/03/Kurt-Cobain-Fender-Competition-Mustang-Left-Handed-Blue.jpg",
    },
    precio: 90000,
  },
  {
    id: 10,
    titulo: "Eric Clapton's 1964 Gibson SG 'The Fool'",
    descripcion:
      "La Gibson SG pintada a mano por The Fool, usada por Eric Clapton en la época de Cream.",
    image: {
      uri: "https://www.groundguitar.com/wp-content/uploads/2018/06/Gibson-SG-Fool-Clapton.jpg",
    },
    precio: 350000,
  },
  {
    id: 11,
    titulo: "Eddie Van Halen's 'Frankenstrat'",
    descripcion:
      "La icónica guitarra armada por Eddie Van Halen combinando partes de distintas marcas.",
    image: {
      uri: "https://upload.wikimedia.org/wikipedia/commons/4/40/EVH_frankenstrat.jpg",
    },
    precio: 300000,
  },
  {
    id: 12,
    titulo: "Stevie Ray Vaughan's 'Lenny' Stratocaster",
    descripcion:
      "'Lenny', un regalo de la esposa de Stevie Ray Vaughan y una de sus guitarras favoritas.",
    image: {
      uri: "https://www.groundguitar.com/wp-content/uploads/2022/06/Stevie-Ray-Vaughan-Lenny-Stratocaster.jpg",
    },
    precio: 180000,
  },
  {
    id: 13,
    titulo: "Prince's 'Cloud' Guitar (Smithsonian)",
    descripcion:
      "La guitarra 'Cloud' diseñada para Prince, hoy exhibida en el Smithsonian.",
    image: {
      uri: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Prince_guitar_Smithsonian-20070301.jpg",
    },
    precio: 250000,
  },
];

type ResizeMode = "cover" | "contain" | "stretch";

export default function GaleriaScreen() {
  const [filtro, setFiltro] = useState("");
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [seleccionado, setSeleccionado] = useState<Guitarra | null>(null);
  const [resizeMode, setResizeMode] = useState<ResizeMode>("cover");

  const datosFiltrados = useMemo(
    () =>
      DATA.filter((item) =>
        item.titulo.toLowerCase().includes(filtro.trim().toLowerCase()),
      ),
    [filtro],
  );

  const abrirDetalle = (item: Guitarra) => {
    setResizeMode("cover");
    setSeleccionado(item);
  };

  const cerrarDetalle = () => setSeleccionado(null);

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.precio}>Filtrar por Titulo</Text>
        <TextInput
          placeholder="Black Strat..."
          style={styles.textInput}
          placeholderTextColor={"#565555"}
          value={filtro}
          onChangeText={setFiltro}
          autoCorrect={false}
          autoCapitalize="none"
        ></TextInput>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={datosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separador} />}
          renderItem={({ item }) => {
            const esFavorito = favoritos.includes(item.id);
            return (
              <Pressable
                style={[styles.item, esFavorito && styles.itemFavorito]}
                onPress={() => abrirDetalle(item)}
                onLongPress={() => toggleFavorito(item.id)}
              >
                {esFavorito && <Text style={styles.favIcono}>★</Text>}
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Image source={item.image} style={styles.imagen} />
                <Text style={styles.precio}>${item.precio}</Text>
              </Pressable>
            );
          }}
        ></FlatList>
      </View>

      <Modal
        visible={seleccionado !== null}
        transparent
        animationType="slide"
        onRequestClose={cerrarDetalle}
      >
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            {seleccionado && (
              <>
                <Image
                  source={seleccionado.image}
                  style={styles.modalImagen}
                  resizeMode={resizeMode}
                />

                <View style={styles.resizeButtonsRow}>
                  {(["cover", "contain", "stretch"] as ResizeMode[]).map(
                    (modo) => (
                      <Pressable
                        key={modo}
                        style={[
                          styles.resizeButton,
                          resizeMode === modo && styles.resizeButtonActivo,
                        ]}
                        onPress={() => setResizeMode(modo)}
                      >
                        <Text
                          style={[
                            styles.resizeButtonTexto,
                            resizeMode === modo && styles.resizeButtonTextoActivo,
                          ]}
                        >
                          {modo}
                        </Text>
                      </Pressable>
                    ),
                  )}
                </View>

                <Text style={styles.modalTitulo}>{seleccionado.titulo}</Text>
                <Text style={styles.modalDescripcion}>
                  {seleccionado.descripcion}
                </Text>

                <Pressable style={styles.button} onPress={cerrarDetalle}>
                  <Text style={styles.buttonText}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 24,
    backgroundColor: "#d9d6d6",
    paddingTop: 50,
  },
  filterContainer: { width: "100%", paddingRight: 40, paddingLeft: 40 },
  textInput: {
    padding: 5,
    backgroundColor: "#fff",
    borderColor: "#ec3737",
    borderRadius: 15,
    borderWidth: 2,
  },
  listWrapper: { flex: 1, width: "100%" },
  separador: {
    marginBottom: 10,
  },
  item: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "column",
    marginHorizontal: 40,
  },
  itemFavorito: {
    borderWidth: 2,
    borderColor: "#f5c518",
  },
  favIcono: {
    position: "absolute",
    top: 8,
    right: 8,
    fontSize: 20,
    color: "#f5c518",
  },
  imagen: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  precio: {
    fontSize: 15,
    padding: 4,
  },
  titulo: {
    fontSize: 18,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    gap: 10,
  },
  modalImagen: {
    width: 250,
    height: 250,
    backgroundColor: "#eee",
  },
  resizeButtonsRow: {
    flexDirection: "row",
    gap: 8,
  },
  resizeButton: {
    borderWidth: 1,
    borderColor: "#ec3737",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  resizeButtonActivo: {
    backgroundColor: "#ec3737",
  },
  resizeButtonTexto: {
    color: "#333",
  },
  resizeButtonTextoActivo: {
    color: "#fff",
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  modalDescripcion: {
    fontSize: 14,
    textAlign: "center",
    color: "#444",
  },
  button: {
    backgroundColor: "#eb2525",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
