import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const PlaceItem = ({ place, onSelect }) => {
  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image
        source={{ uri: place.imageUri }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>
          {place.title}
        </Text>
        <Text style={styles.address}>
          {place.address}
        </Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    minHeight: 100,
    height: "100%",
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});