import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";

const AllPlaces = ({ route }) => {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  // when the screen is focused and the route params are available, we can use them
  // to update the state or perform any other actions
  useEffect(() => {
    if (isFocused && route.params) {
      const { place } = route.params;
      setPlaces((prevPlaces) => [...prevPlaces, place]);
    }
  }, [isFocused, route]);

  return (
    <PlacesList places={places} />
  );
};

export default AllPlaces;