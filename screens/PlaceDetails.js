import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";

const PlaceDetails = ({ route, navigation }) => {
  const [place, setPlace] = useState();

  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      initialLat: place.location.lat,
      initialLng: place.location.lng,
    });
  };

  const placeId = route.params.placeId;

  useEffect(() => {
    const loadPlaceDetails = async () => {
      const data = await fetchPlaceDetails(placeId);
      setPlace(data);

      navigation.setOptions({
        title: data.title,
      });
    }

    loadPlaceDetails();
  }, [placeId]);

  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image
        source={{ uri: place.imageUri }}
        style={styles.image}
      />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>
            {place.address}
          </Text>
        </View>
        <OutlinedButton
          icon="map"
          onPress={showOnMapHandler}
        >
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "35%",
    minHeight: 300,
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});