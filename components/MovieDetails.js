import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as RootNavigation from "../RootNavigations.js";
import "react-native-gesture-handler";
import { DataStorage } from "../components/DataMoviesStorage";

export default function MovieDetails({ route, navigation }) {
  const { movie, index } = route.params;
  const [favoriteList, setFavoriteList] = useContext(DataStorage);

  const removeMovieFromFavorite = (index) => {
    setFavoriteList(favoriteList.filter((item) => item.id !== index));
    // let favoriteCopy = favoriteList;
    // let newarry = favoriteCopy.splice(index, 1);
    // setFavoriteList(favoriteCopy);
    // console.log(favoriteCopy);
  };

  const addToFavorite = (movie) => {
    let duplicateMovies = favoriteList.find(
      (movieObj) => movieObj.id == movie.id
    );
    console.log(duplicateMovies);
    if (duplicateMovies == undefined) {
      setFavoriteList([...favoriteList, movie]);
    }
  };
  const propsValidation = (prop) => {
    if (prop == undefined || null) {
      return <ActivityIndicator size="small" color="blue" />;
    } else {
      return (
        <View style={styles.detailsSquere}>
          <View style={styles.detailLine}>
            <Text style={styles.headers}>Name </Text>
            <Text style={styles.detailText}>{movie.title} </Text>
          </View>
          <View style={styles.detailLine}>
            <Text style={styles.headers}>Poster </Text>
            <Text style={styles.detailText}>{movie.poster_path} </Text>
          </View>
          <View style={styles.detailLine}>
            <Text style={styles.headers}>Summary </Text>
            <Text style={styles.detailText}>{movie.overview} </Text>
          </View>
          <View style={styles.detailLine}>
            <Text style={styles.headers}>Rating </Text>
            <Text style={styles.detailText}>{movie.vote_average} </Text>
          </View>
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/background/popcorn.jpg")}
      >
        {/* details */}
        {propsValidation(movie)}
        <View style={styles.btnBox}>
          <TouchableOpacity
            onPress={() => RootNavigation.navigate("ListOfMovies")}
            style={styles.btn}
          >
            <Text>Back</Text>
          </TouchableOpacity>
          {/* add btn */}
          <TouchableOpacity
            onPress={() => {
              addToFavorite(movie);
            }}
            style={styles.btn}
          >
            <Text>Add</Text>
          </TouchableOpacity>
          {/* remove btn */}
          <TouchableOpacity
            onPress={() => removeMovieFromFavorite(index)}
            style={styles.btn}
          >
            <Text>Remove</Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ecf0f1",
    padding: 50,
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsSquere: {
    width: "80%",
    height: "50%",
    justifyContent: "space-around",
    backgroundColor: "#fff8dc",
    borderRadius: 15,
    padding: 20,
  },
  detailLine: {
    alignItems: "center",
    backgroundColor: "#dcdcdc",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 5,
  },
  headers: {
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  detailText: {
    textAlign: "center",
  },
  btnBox: {
    paddingTop: 40,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    width: "30%",
    backgroundColor: "#0082f2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "white",
  },
});
