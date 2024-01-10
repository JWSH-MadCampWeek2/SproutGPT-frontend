import React from "react";
import { ImageBackground } from "react-native";

export function Loading() {
  return (
    <ImageBackground
      source={require("../assets/sprout_loading.png")}
      style={{ width: "100%", height: "100%" }}
    ></ImageBackground>
  );
}

export function Recommending() {
  return (
    <ImageBackground
      source={require("../assets/sprout_loading.png")}
      style={{ width: "100%", height: "100%" }}
    ></ImageBackground>
  );
}
