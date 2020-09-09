import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import * as RootNavigation from "../RootNavigations.js";
import "react-native-gesture-handler";
import { DataStorage } from "../components/DataMoviesStorage";
import colors from "./StylesGalery";

export default function MovieDetails({ route, navigation }) {
  const { movie, index } = route.params;
  //   const movie = {
  //     title: "Hard Kill",
  //     poster_path: "/kPzcvxBwt7kEISB9O4jJEuBn72t.jpg",
  //     overview:
  //       "When Grizz, Panda, and Ice Bear's love of food trucks and viral videos went out of hand, it catches the attention of Agent Trout from the National Wildlife Control, who pledges to restore the “natural order” by separating them forever. Chased away from their home, the Bears embark on an epic road trip as they seek refuge in Canada, with their journey being filled with new friends, perilous obstacles, and huge parties. The risky journey also forces the Bears to face how they first met and became brothers, in order to keep their family bond from splitting apart. ",
  //     vote_average: "7.8 ",
  //   };
  const [favoriteList, setFavoriteList] = useContext(DataStorage);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [screenOpacity, setScreenOpacity] = useState(1);
  const [displayForWebUser, setDisplayForWebUser] = useState("none");
  const [addBtnStatusColor, setAddBtnStatusColor] = useState(
    checkIfMovieOnList(movie) ? colors.colordarkCoral : colors.colorBlueLight
  );
  const imageUrl = `http://image.tmdb.org/t/p/original/${movie.poster_path}`;
  let imageAdress = { uri: imageUrl };

  //   let imageAdress = { uri: "/n6hptKS7Y0ZjkYwbqKOK3jz9XAC.jpg" };
  //   useEffect(() => {
  //     return () => {
  //       <Text>...Loading</Text>;
  //     };
  //   }, []);
  function checkIfMovieOnList(movie) {
    if (favoriteList == undefined) return false;
    let duplicateMovies = favoriteList.find(
      (movieObj) => movieObj.id == movie.id
    );
    if (duplicateMovies == undefined) return false;
    else {
      return true;
    }
  }
  //   remove movie from favorite list
  const removeMovieFromFavorite = (index) => {
    setFavoriteList(favoriteList.filter((item) => item.id !== index));
    setAddBtnStatusColor(colors.colorBlueLight);
  };

  //   add movie to favorite list
  const addToFavorite = (movie) => {
    if (!checkIfMovieOnList(movie)) {
      setFavoriteList([...favoriteList, movie]);
      setAddBtnStatusColor(colors.colordarkCoral);
    }
    // if the user want to add a movie which is already on the list
    else {
      setModalDisplay(true);
      setScreenOpacity(0.5);
      setDisplayForWebUser("flex");
    }
  };
  //   modal ok btn
  const okBtn = () => {
    setModalDisplay(false);
    setScreenOpacity(1);
    setDisplayForWebUser("none");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={[styles.background, { opacity: screenOpacity }]}
        source={imageAdress}
      >
        {/* back btn */}
        <View style={colors.btnBack}>
          <TouchableOpacity
            onPress={() => RootNavigation.navigate("ListOfMovies")}
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
        {/* details */}
        <View style={styles.detailsAndBtn}>
          <View style={styles.detailsSquere}>
            {/* name */}
            <View style={styles.detailLine}>
              <Text style={styles.headers}>Name </Text>
              <Text style={styles.detailText}>{movie.title} </Text>
            </View>
            {/* summary */}
            <View style={styles.detailLine}>
              <Text style={styles.headers}>Summary </Text>
              <Text style={styles.detailText}>{movie.overview} </Text>
            </View>
            {/* rating */}
            <View style={styles.detailLine}>
              <Text style={styles.headers}>Rating </Text>
              <Text style={styles.detailText}>{movie.vote_average} </Text>
            </View>
          </View>
          <View style={styles.btnsRow}>
            {/* add btn */}
            <TouchableOpacity
              onPress={() => {
                addToFavorite(movie);
              }}
              style={[colors.btn, { backgroundColor: addBtnStatusColor }]}
            >
              <Text style={{ color: colors.colorWhite }}>Add</Text>
            </TouchableOpacity>
            {/* remove btn */}
            <TouchableOpacity
              onPress={() => removeMovieFromFavorite(index)}
              style={colors.btn}
            >
              <Text style={{ color: colors.colorWhite }}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* modal warning alert for trying to add a movie more then once to the favorite list */}
        {/* ////////////////////////////////////////////////////////////////////////// */}
        <Modal
          style={{
            position: "absolute",
            width: "100%",
            alignItems: "center",
            flex: 1,
            display: displayForWebUser,
          }}
          transparent={true}
          visible={modalDisplay}
        >
          <View style={styles.modalMain}>
            <Text style={{ textAlign: "center", fontSize: 17 }}>
              This movie is already on the list
            </Text>
            <View
              style={{
                alignItems: "center",
                width: "100%",
              }}
            >
              <TouchableOpacity onPress={okBtn}>
                <View>
                  <Text style={{ textAlign: "center", fontSize: 17 }}>
                    <Text>OK</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  // modal
  modalMain: {
    backgroundColor: colors.colorWhite,
    top: 100,
    borderRadius: 20,
    width: "80%",
    alignSelf: "center",
    height: 100,
    zIndex: 5,
    justifyContent: "space-around",
  },
});
