import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as RootNavigation from "../RootNavigations.js";
import "react-native-gesture-handler";
import axios from "axios";
import { DataStorage } from "../components/DataMoviesStorage";
// RootNavigation.navigate("homePageMain");

export default function Welcome() {
  const [favoriteList, setFavoriteList] = useContext(DataStorage);
  const [movieList, setMovieList] = useState([]);

  const apiKey = "dd22d2352bf6e11b0e6fe40a9970011b";
  const apiToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDIyZDIzNTJiZjZlMTFiMGU2ZmU0MGE5OTcwMDExYiIsInN1YiI6IjVmNTY2NjgyZTYyNzE5MDAzN2VkMzZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VGg6Cmj5bJAUQA_72PQ7SAfYPSDBBDqRqrE-8TWPTUE";
  const mainDomain = "https://api.themoviedb.org/3/";
  const popularDomain = `movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  // axios
  const axiosRequest = async () => {
    const favoriteUrl = mainDomain + popularDomain;

    try {
      let res = await axios({
        url:
          "https://api.themoviedb.org/3/movie/popular?api_key=dd22d2352bf6e11b0e6fe40a9970011b",
        method: "get",
        headers: {
          "Authorization": `Bearer ${apiToken}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      let dataFromServer = res.data;
      if (dataFromServer && dataFromServer.results) {
        setMovieList(dataFromServer.results);
        // console.log(dataFromServer.results);
      }
    } catch (e) {
      console.log(`😱 line 30 Axios failed: ${e}`);
      alert("Axios", `${e}`);
      return "";
    }
  };
  useEffect(() => {
    axiosRequest();
    return () => {
      <Text>...Loading</Text>;
    };
  }, []);

  const goToPopular = () => {
    RootNavigation.navigate("ListOfMovies", {
      movieList: movieList,
      type: "popular",
    });
  };
  const goToFavorite = () => {
    RootNavigation.navigate("ListOfMovies", {
      type: "favorite",
    });
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundPic}
        source={require("../assets/background/welcome.jpg")}
      >
        <Text style={styles.header}>welcome</Text>
        <View style={styles.btnsBox}>
          {/* Popular btn */}
          <TouchableOpacity onPress={goToPopular}>
            <View style={[styles.btn, { backgroundColor: "#d3d3d3" }]}>
              <Text>Popular movies</Text>
            </View>
          </TouchableOpacity>
          {/* Favority btn */}
          <TouchableOpacity onPress={goToFavorite}>
            <View style={[styles.btn, { backgroundColor: "#8fbc8f" }]}>
              <Text>Favorite movies</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 34,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  btnsBox: {
    flex: 0.6,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  btn: {
    width: 150,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderColor: "blue",
    borderWidth: 1,
  },
  backgroundPic: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
