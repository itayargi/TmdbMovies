import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Welcome from "./components/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef, isReadyRef } from "./RootNavigations";
import { createStackNavigator } from "@react-navigation/stack";
import { MyProvider } from "./components/DataMoviesStorage";
import ListOfMovies from "./components/ListOfMovies";
import MovieDetails from "./components/MovieDetails";
const Stack = createStackNavigator();

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
