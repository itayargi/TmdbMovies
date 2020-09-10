import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import * as RootNavigation from "../RootNavigations.js";
import "react-native-gesture-handler";
import { DataStorage } from "../components/DataMoviesStorage";
import colors from "./Colors";
import { AntDesign } from '@expo/vector-icons';

export default function MovieDetails({ route, navigation }) {
  // movie object and index
  const { movie, index } = route.params;
  // error message for user
  const [error, setError] = useState('');
  // favorite list
  const [favoriteList, setFavoriteList] = useContext(DataStorage);
  // movie poster
  const imageUrl = `http://image.tmdb.org/t/p/original/${movie.poster_path}`;
  let imageAdress = { uri: imageUrl };
  //   remove movie from favorite list
  const removeMovieFromFavorite = (index) => {
    setError('')
    setFavoriteList(favoriteList.filter((item) => item.id !== index));
  };
  //   add movie to favorite list
  const addToFavorite = (movie) => {
    let duplicateMovies = favoriteList.find(
      (movieObj) => movieObj.id == movie.id
    );
    // if the movie is not on the list, save it to favorite list
    if (duplicateMovies == undefined) {
      setFavoriteList([...favoriteList, movie]);
    }
    // if the user try to add a movie more then once
    else {
      setError('movie exist on your list')
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.background} source={imageAdress}>
        {/* back btn */}
        <View style={colors.btnBack}>
          <AntDesign style={colors.btnBack} name="close" size={30} color="white"
            onPress={() => RootNavigation.navigate("ListOfMovies")} />
        </View>
        {/* details */}
        <View style={styles.detailsAndBtn}>
          {/* name */}
          <View style={styles.detailsSquere}>
            <View style={styles.detailLine}>
              <Text style={styles.headers}>NAME </Text>
              <Text style={styles.detailText}>{movie.title} </Text>
            </View>
            {/* summary */}
            <View style={styles.detailLine}>
              <Text style={styles.headers}>SUMMERY </Text>
              <Text style={styles.detailText}>{movie.overview} </Text>
            </View>
            {/* rating */}
            <View style={styles.detailLine}>
              <Text style={styles.headers}>RATING</Text>
              <Text style={styles.detailText}>{movie.vote_average} </Text>
            </View>
          </View>
          {/* error message in case of trying to add movie to favorite list more then once */}
          {
            error.length > 0 ?
              <View style={styles.errorView}>
                <Text style={styles.error}>{error}</Text>
              </View>
              : null
          }

          {/* buttons - add && remove */}
          <View style={styles.btnsRow}>
            <TouchableOpacity
              onPress={() => {
                addToFavorite(movie);
              }}
              style={styles.btn}
            >
              <Text style={styles.btnText}>ADD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removeMovieFromFavorite(index)}
              style={styles.btn}
            >
              <Text style={styles.btnText}>REMOVE</Text>
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
    backgroundColor: 'black'
  },
  background: {
    flex: 1,
  },

  btn: {
    width: "48%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.detailBtnColor,
    borderWidth: 1,
    borderBottomColor: colors.detailBtnColor,
    opacity: 0.9,

  },
  detailsAndBtn: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "10%",
  },
  detailLine: {
    backgroundColor: colors.colorBlack,
    borderWidth: 1,
    borderColor: colors.colorBlack,
    alignItems: "center",
    margin: 5,
    padding: 5,
    opacity: 0.8,
  },
  headers: {
    fontSize: 18,
    color: colors.colorWhite,
    fontWeight: 'bold'
  },
  detailText: {
    textAlign: "center",
    color: colors.colorWhite,
  },
  btnsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 5
  },
  btnText: {
    color: colors.colorWhite,
    fontWeight: 'bold'
  },
  error: {
    color: colors.colorWhite,
    fontSize: 15,
  },
  errorView: {
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: colors.colordarkCoral,
    alignItems: "center",
    margin: 5,
    padding: 5,
    width: '100%'
  }
});
