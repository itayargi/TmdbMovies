import React from "react";
import { StyleSheet } from "react-native";
import Welcome from "./components/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigations";
import { createStackNavigator } from "@react-navigation/stack";
import { MyProvider } from "./components/DataMoviesStorage";
import ListOfMovies from "./components/ListOfMovies";
import MovieDetails from "./components/MovieDetails";

const Stack = createStackNavigator();
// stack navigator - navigate between components
// 1- homepage (Welcome.js) - welcome header and 2 btns (popular & favorite movies)
// 2- MovieDetail component gets the type of movies the user want to see and show them 
// 3- MovieDetails - details for each movie pressed and 2 btn (add or remove movie from favorite list)
// 4- dataStorage used by Createcontext
// 5- StyleGalery - export colors and styles

export default function App() {
  return (
    <MyProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Home">
          {/* home */}
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {(props) => <Welcome {...props} />}
          </Stack.Screen>
          {/* movie list */}
          <Stack.Screen name="ListOfMovies" options={{ headerShown: false }}>
            {(props) => <ListOfMovies {...props} />}
          </Stack.Screen>
          {/* details */}
          <Stack.Screen name="MovieDetails" options={{ headerShown: false }}>
            {(props) => <MovieDetails {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </MyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
