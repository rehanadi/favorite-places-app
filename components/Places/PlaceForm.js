import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = () => {
  const [title, setTitle] = useState("");

  const changeTitleHandler = (text) => {
    setTitle(text);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>
          Title
        </Text>
        <TextInput
          value={title}
          onChangeText={changeTitleHandler}
          style={styles.input}
        />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 8,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary700,
    backgroundColor: Colors.primary100,
  },
});