import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";
import { REST_API_KEY, REDIRECT_URI } from "../utils/constants";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

// parse url from webview
function getCode(target: string): string {
  const exp = "code=";
  const condition = target.indexOf(exp);
  console.log(`KakaoLogin_targetOfGetCode: ${target}`);
  if (condition !== -1) {
    const requestCode = target.substring(condition + exp.length);
    console.log(`requestCode !!!!!! ${requestCode}`);
    return requestCode;
  } else {
    console.log("condition was -1");
    return "";
  }
}

// async function onMessage(event: any, onAuthSuccess: (code: string) => void) {
//   const data = event.nativeEvent["url"];
//   const requestCode = await getCode(data);
//   console.log(`KakaoLogin_requestCode: ${requestCode}`);
//   onAuthSuccess(requestCode);
// }
async function onMessage(event: any, onAuthSuccess: (code: string) => void) {
  const url = event.nativeEvent.url;

  // Check if the URL is the redirect URI
  if (url.startsWith(REDIRECT_URI)) {
    const requestCode = await getCode(url);
    if (requestCode) {
      console.log(`Authorization Code: ${requestCode}`);
      onAuthSuccess(requestCode);
    } else {
      console.log("No authorization code found in the URL");
    }
  } else {
    console.log("Waiting for the correct redirect...");
  }
}

export default function KakaoLogin({
  onAuthSuccess,
}: {
  onAuthSuccess: (code: string) => void;
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
        onMessage={(event) => onMessage(event, onAuthSuccess)}
      />
    </View>
  );
}
