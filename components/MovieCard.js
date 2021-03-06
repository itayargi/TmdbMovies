import React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import "react-native-gesture-handler";
import * as RootNavigation from "../RootNavigations.js";

export default function MovieCard(props) {
  const imageUrl = `http://image.tmdb.org/t/p/original/${props.movie.poster_path}`;
  // in case of no poster_path
  const Uc = require("../assets/Icons/Uc.png");
  // poster url
  let imageAdress = { uri: imageUrl };
  // mouse press on a movie direct to movie details with the movie and its index
  const clickPress = (movie, index) => {
    RootNavigation.navigate("MovieDetails", {
      movie: movie,
      index: index,
    });
  };
  return (
    <TouchableOpacity
      onPress={() => clickPress(props.movie, props.movie.id)}
      style={styles.card}
    >
      {props.movie.poster_path ? (
        <Image
          style={styles.image}
          source={imageAdress}
        />
      ) : <Image
          style={styles.image}
          source={Uc}
        />}

    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    width: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    height: 150,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
  },
});
