import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import * as RootNavigation from "../RootNavigations.js";
import "react-native-gesture-handler";
import { DataStorage } from "../components/DataMoviesStorage";
import colors from "./Colors";

export default function MovieDetails({ route, navigation }) {
  const { movie, index } = route.params;
  //   const movie = {
  //     title: "Hard Kill",
  //     poster_path: "/kPzcvxBwt7kEISB9O4jJEuBn72t.jpg",
  //     overview:
  //       "When Grizz, Panda, and Ice Bear's love of food trucks and viral videos went out of hand, it catches the attention of Agent Trout from the National Wildlife Control, who pledges to restore the “natural order” by separating them forever. Chased away from their home, the Bears embark on an epic road trip as they seek refuge in Canada, with their journey being filled with new friends, perilous obstacles, and huge parties. The risky journey also forces the Bears to face how they first met and became brothers, in order to keep their family bond from splitting apart. ",
  //     vote_average: "7.8 ",
  //   };
  const typeOfDevice = Platform.OS;
  const iconArrowPosition = typeOfDevice == "android" ? "right" : "left";
  const rightAngle = require("../assets/Icons/rightAngle.png");
  const leftAngle = require("../assets/Icons/leftAngle.png");
  const backIcon = iconArrowPosition == "android" ? leftAngle : rightAngle;
  const fontColor = "white";

  const [favoriteList, setFavoriteList] = useContext(DataStorage);
  const imageUrl = `http://image.tmdb.org/t/p/original/${movie.poster_path}`;
  let imageAdress = { uri: imageUrl };

  //   let imageAdress = { uri: "/n6hptKS7Y0ZjkYwbqKOK3jz9XAC.jpg" };

  //   remove movie from favorite list
  const removeMovieFromFavorite = (index) => {
    setFavoriteList(favoriteList.filter((item) => item.id !== index));
  };

  //   add movie to favorite list
  const addToFavorite = (movie) => {
    let duplicateMovies = favoriteList.find(
      (movieObj) => movieObj.id == movie.id
    );
    if (duplicateMovies == undefined) {
      setFavoriteList([...favoriteList, movie]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.background} source={imageAdress}>
        <View style={styles.btnBack}>
          <TouchableOpacity
            onPress={() => RootNavigation.navigate("ListOfMovies")}
            style={[
              styles.btn,
              {
                borderTopStartRadius: 50,
                borderBottomStartRadius: 50,
              },
            ]}
          >
            <Text style={{ color: colors.colorWhite248RGB }}>BACK</Text>
          </TouchableOpacity>
        </View>
        {/* details */}
        <View style={styles.detailsAndBtn}>
          <View style={styles.detailsSquere}>
            <View style={styles.detailLine}>
              <Text style={styles.headers}>Name </Text>
              <Text style={styles.detailText}>{movie.title} </Text>
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
          <View style={styles.btnsRow}>
            <TouchableOpacity
              onPress={() => {
                addToFavorite(movie);
              }}
              style={styles.btn}
            >
              <Text style={{ color: "white" }}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removeMovieFromFavorite(index)}
              style={styles.btn}
            >
              <Text style={{ color: "white" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  btnBack: {
    width: "100%",
    justifyContent: "flex-start",
    paddingTop: "7%",
    paddingStart: "5%",
  },
  btn: {
    width: 80,
    height: 40,
    backgroundColor: colors.colorBlueLight,
    // color: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
  detailsAndBtn: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "10%",
  },
  detailLine: {
    backgroundColor: colors.colorBattleshipGrey,
    borderWidth: 1,
    borderColor: colors.colorCloud,
    borderRadius: 10,
    alignItems: "center",
    margin: 5,
    padding: 5,
  },
  headers: {
    fontSize: 18,
    textDecorationLine: "underline",
  },
  detailText: {
    textAlign: "center",
    color: colors.colorWhite,
  },
  btnsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
