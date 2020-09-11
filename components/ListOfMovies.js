import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import MovieCard from "./MovieCard";
import "react-native-gesture-handler";
import * as RootNavigation from "../RootNavigations.js";
import { DataStorage } from "../components/DataMoviesStorage";
import colors from "./StylesGalery";
import { AntDesign } from '@expo/vector-icons';

export default function ListOfMovies({ route, navigation }) {
  const [favoriteList, setFavoriteList] = useContext(DataStorage);
  const { movieList, type } = route.params;
  const movieStack = checkWitchPage();
  // header's name
  const nameOfPage = type == "popular" ? "POPULAR" : "FAVORITE"
  // check which page the user pressed and showing header and movies accordingly
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
      {/* header */}
      <View style={styles.header}>
        <View style={colors.btnBack}>
          {/* back home btn */}
          <AntDesign style={colors.btnBack} name="arrowleft" size={26} color="white"
            onPress={() => RootNavigation.navigate("Home")} />
        </View>
        <Text style={styles.textHeader}>{`${nameOfPage}`} MOVIES</Text>
      </View>
      {/* list of movies */}
      <ScrollView style={styles.container}>
        <View style={styles.listOfMovies}>
          {movieStack.length > 0 && movieStack ? (
            movieStack.map((movie, i) => {
              return (
                <MovieCard
                  key={i}
                  index={i}
                  movie={movie}
                />
              );
            })
          ) : (
              <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
                {/* in case of empty movies in favorite page */}
                <Text style={{ fontSize: 17, color: 'red' }}>
                  There are no movies in favorite list
              </Text>
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
    backgroundColor: "black",
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
    backgroundColor: '#022C80',
    paddingBottom: 10,
    opacity: 0.7,
    paddingTop: 10,
  },
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: 'white',
  },
});
