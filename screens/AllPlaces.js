import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";

const AllPlaces = ({ route }) => {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const data = await fetchPlaces();
      setPlaces(data);
    };

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return (
    <PlacesList places={places} />
  );
};

export default AllPlaces;