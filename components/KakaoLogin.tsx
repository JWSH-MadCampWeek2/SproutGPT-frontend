import React from "react";
import axios from "axios";
import qs from "qs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Button, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";
import { REST_API_KEY, REDIRECT_URI } from "../utils/constants";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

// parse url from webview
const getCode = (target: string) => {
  console.log(`getCode target: ${target}`);
  const exp = "code=";
  const condition = target.indexOf(exp);
  if (condition !== -1) {
    const requestCode = target.substring(condition + exp.length);
    requestToken(requestCode);
  }
};

export const getData = async (key: string) => {
  console.log(`getData key: ${key}`);
  try {
    const data: any = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  } catch (e) {
    console.log("gotDataa error", e);
    return e;
  }
};

const requestToken = async (code: string) => {
  console.log(`requestToken code: ${code}`);
  const requestTokenUrl = "https://kauth.kakao.com/oauth/token";

  const options = qs.stringify({
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code,
  });

  try {
    const tokenResponse = await axios.post(requestTokenUrl, options);
    const ACCESS_TOKEN = tokenResponse.data.access_token;

    const body = {
      ACCESS_TOKEN,
    };
    const response = await axios.post(REDIRECT_URI, body);
    const value = response.data;
    console.log(`response: ${response}`);
    console.log(`value: ${value}`);
  } catch (e) {
    console.log(e);
  }
};

export default function KakaoLogin() {
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
          const data = event.nativeEvent["url"];
          getCode(data);
        }}
      />
    </View>
  );
}
