import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import "react-native-gesture-handler";
import * as RootNavigation from "../RootNavigations.js";

export default function MovieCard(props) {
  const imageUrl = `http://image.tmdb.org/t/p/original/${props.movie.poster_path}`;
  const examplePic =
    "http://image.tmdb.org/t/p/w500//TnOeov4w0sTtV2gqICqIxVi74V.jpg";
  const Uc = require("../assets/Icons/Uc.png");
  let imageAdress = { uri: imageUrl };

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
      {/* <Text>title: {props.movie.title}</Text> */}
      {/* <Text>poster: {props.movie.poster_path}</Text> */}
      {props.movie.poster_path ? (
        <Image
          style={styles.image}
          source={imageAdress}
          //   source={require("../assets/Icons/Uc.png")}
        />
      ) : null}
      {/* <Image style={{ width: "100%", height: "100%" }} source={imageUrl} /> */}
      {/* <Text numberOfLines={2}>summary: {props.movie.overview}</Text> */}
      {/* <Text>rating: {props.movie.vote_average}</Text> */}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    // position: "relative",
    width: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    // borderWidth: 1,
    // borderRadius: 10,
    // backgroundColor: "#535264",
    height: 150,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
  },
});
