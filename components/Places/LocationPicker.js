import { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Image, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { getAddress, getMapPreview } from "../../util/location";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

const LocationPicker = ({ onPickLocation }) => {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState();

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.lat,
        lng: route.params.lng,
      };

      setPickedLocation(mapPickedLocation);
    }
  }, [isFocused, route]);

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
        onPickLocation({ ...pickedLocation, address });
      }
    };

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  const verifyPermissions = async () => {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
        style={styles.image}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlinedButton
          icon="location"
          onPress={getLocationHandler}
        >
          Locate User
        </OutlinedButton>
        <OutlinedButton
          icon="map"
          onPress={pickOnMapHandler}
        >
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});