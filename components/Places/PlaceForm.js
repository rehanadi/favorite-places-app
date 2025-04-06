import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";

const PlaceForm = ({ onCreatePlace }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  const changeTitleHandler = (text) => {
    setTitle(text);
  };

  const takeImageHandler = (imageUri) => {
    setImage(imageUri);
  }

  // use callback to prevent unnecessary re-renders
  // and to prevent infinite loop in useEffect
  // because this function is passed to child component
  // and used in useEffect in child component
  const pickLocationHandler = useCallback((location) => {
    setLocation(location);
  }, []);

  const savePlaceHandler = () => {
    const place = new Place(title, image, location);

    onCreatePlace(place);
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
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>
        Add Place
      </Button>
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