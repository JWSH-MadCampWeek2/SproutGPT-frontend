import React from "react";
import { Text } from "react-native";
import { localPort } from "../../utils/constants";

async function sendRecommend(userInfo: { user_id: string }) {
  await fetch(`${localPort}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Received recommenddata:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function InfoLoad({ navigation, route }: { navigation: any; route: any }) {
  sendRecommend({ user_id: route.params.user_id });
  return <Text>추천 중 ...</Text>;
}

export default InfoLoad;
