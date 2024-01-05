import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Button, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";
import { REST_API_KEY, REDIRECT_URI } from "../utils/constants";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

// parse url from webview
const getCode = (target: string) => {
  const exp = "code=";
  const condition = target.indexOf(exp);
  if (condition !== -1) {
    const requestCode = target.substring(condition + exp.length);
    requestToken(requestCode);
  }
};

const requestToken = async (code: string) => {
  const requestTokenUrl = "https://kauth.kakao.com/oauth/token";

  // const options = qs.stringify({
  //   grant_type: "authorization_code",
  //   client_id: REST_API_KEY,
  //   redirect_uri: REDIRECT_URI,
  //   code,
  // });
  const options = {
    code,
  };

  try {
    const response = await axios.post(requestTokenUrl, options);
    const accessToken = response.headers["authorization"];
    const refreshToken = response.headers["authorization-refresh"];

    if (accessToken) {
      await AsyncStorage.setItem("accessToken", accessToken);
    }
    if (refreshToken) {
      await AsyncStorage.setItem("refreshToken", refreshToken);
    }
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
};

export default function LoginScreen() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </View>
  );
}
