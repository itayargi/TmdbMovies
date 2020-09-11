import React, { useState, useEffect } from "react";
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
import colors from './StylesGalery'

export default function Welcome() {
  // popular movies list
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
  // navigate to popular page (props of popular)
  const goToPopular = () => {
    RootNavigation.navigate("ListOfMovies", {
      movieList: movieList,
      type: "popular",
    });
  };
  // navigate to favorite page (props of favorite)
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
        {/* header welcome */}
        <View style={styles.headerView}>
          <Text style={styles.header}>WELCOME</Text>
        </View>
        <View style={styles.btnsBox}>
          {/* Popular btn */}
          <TouchableOpacity
            style={[
              colors.categoryBtn,
              { backgroundColor: colors.popularColor },
            ]}
            onPress={goToPopular}
          >
            <Text style={styles.btnText}>POPULAR MOVIES</Text>
          </TouchableOpacity>
          {/* Favority btn */}
          <TouchableOpacity
            style={[
              colors.categoryBtn,
              { backgroundColor: colors.favoriteColor, },
            ]}
            onPress={goToFavorite}
          >
            <Text style={styles.btnText}>FEVORITE MOVIES</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  headerView: {
    width: "97%",
    backgroundColor: "#022C80",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
    marginBottom: 5,
  },
  btnsBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginBottom: 50,
  },
  backgroundPic: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
