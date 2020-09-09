import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";
import MovieCard from "./MovieCard";
import "react-native-gesture-handler";
import * as RootNavigation from "../RootNavigations.js";
import { DataStorage } from "../components/DataMoviesStorage";

export default function ListOfMovies({ route, navigation }) {
  const { addMovieToFavorite, removeMovieFromFavorite } = route.params;
  const [favoriteList, setFavoriteList] = useContext(DataStorage);
  //   const [userData, setUserData] = useContext(DataStorage);

  const { movieList, type } = route.params;
  const movieStack = checkWitchPage();
  console.log(movieStack);
  console.log(type);

  function checkWitchPage() {
    switch (type) {
      case "popular": {
        return movieList;
      }
      default: {
        return favoriteList;
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>List of movies:</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.listOfMovies}>
          {movieStack !== [""] && movieStack ? (
            movieStack.map((movie, i) => {
              return (
                <MovieCard
                  key={i}
                  index={i}
                  movie={movie}

                  //   addMovieToFavorite={addMovieToFavorite}
                  //   removeMovieFromFavorite={removeMovieFromFavorite}
                />
              );
            })
          ) : (
            <View>
              <ActivityIndicator size="large" color="blue" />
            </View>
          )}
        </View>
        <View style={styles.btnBox}>
          <TouchableOpacity
            onPress={() => RootNavigation.navigate("Home")}
            style={styles.btn}
          >
            <Text>Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listOfMovies: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: 20,
  },
  header: {
    paddingTop: 40,
    width: "100%",
    alignItems: "center",
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 28,
    textDecorationLine: "underline",
  },
  btnBox: {
    paddingTop: 40,
    width: "100%",
    alignItems: "center",
    flex: 1,
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
