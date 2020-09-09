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
  Image,
} from "react-native";
import axios from "axios";
import MovieCard from "./MovieCard";
import "react-native-gesture-handler";
import * as RootNavigation from "../RootNavigations.js";
import { DataStorage } from "../components/DataMoviesStorage";
import colors from "./StylesGalery";

export default function ListOfMovies({ route, navigation }) {
  //   const { addMovieToFavorite, removeMovieFromFavorite } = route.params;
  const [favoriteList, setFavoriteList] = useContext(DataStorage);
  //   const [userData, setUserData] = useContext(DataStorage);

  const { movieList, type } = route.params;
  const movieStack = checkWitchPage();

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
      {/* back home btn */}
      <View style={colors.btnBack}>
        <TouchableOpacity
          onPress={() => RootNavigation.navigate("Home")}
          style={[
            colors.btn,
            {
              borderTopStartRadius: 50,
              borderBottomStartRadius: 50,
            },
          ]}
        >
          <Text style={{ color: colors.colorWhite248RGB }}>BACK</Text>
        </TouchableOpacity>
      </View>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.textHeader}>List of movies:</Text>
      </View>
      {/* list of movies */}
      <ScrollView style={styles.container}>
        <View style={styles.listOfMovies}>
          {movieStack.length > 0 && movieStack ? (
            movieStack.map((movie, i) => {
              return <MovieCard key={i} index={i} movie={movie} />;
            })
          ) : (
            <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
              {/* in case of empty movies in favorite page */}
              <Text style={{ fontSize: 17 }}>EMPTY</Text>
              <Image
                style={{ width: "70%", height: 200 }}
                source={require("../assets/background/empty.jpg")}
              />
            </View>
          )}
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
  },
  header: {
    width: "100%",
    alignItems: "center",
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 28,
    textDecorationLine: "underline",
  },
});
