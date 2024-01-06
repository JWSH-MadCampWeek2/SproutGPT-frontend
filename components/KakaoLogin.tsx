import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";
import { REST_API_KEY, REDIRECT_URI } from "../utils/constants";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

// parse url from webview
function getCode(target: string): string {
  console.log(`getCode target: ${target}`);
  const exp = "code=";
  const condition = target.indexOf(exp);
  if (condition !== -1) {
    const requestCode = target.substring(condition + exp.length);
    // requestToken(requestCode);
    console.log(requestCode);
    return requestCode;
  }
  return "";
}

// const requestToken = async (code: string) => {
//   console.log(`requestToken code: ${code}`);
//   const requestTokenUrl = "https://kauth.kakao.com/oauth/token";

//   const options = qs.stringify({
//     grant_type: "authorization_code",
//     client_id: REST_API_KEY,
//     redirect_uri: REDIRECT_URI,
//     code,
//   });

//   try {
//     const tokenResponse = await axios.post(requestTokenUrl, options);
//     const ACCESS_TOKEN = tokenResponse.data.access_token;

//     const body = {
//       ACCESS_TOKEN,
//     };
//     const response = await axios.post(REDIRECT_URI, body);
//     const value = response.data;
//     console.log(`response: ${response}`);
//     console.log(`value: ${value}`);
//   } catch (e) {
//     console.log(e);
//   }
// };

export default function KakaoLogin({
  onSuccess,
}: {
  onSuccess: (code: string) => void;
}) {
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
          const requestCode = getCode(data);
          onSuccess(requestCode);
        }}
      />
    </View>
  );
}
