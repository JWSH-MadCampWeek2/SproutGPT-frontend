import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Modal,
} from "react-native";
import { Button } from "react-native-elements";
import ExerciseItem from "../../components/exercise/ExerciseItem";
import Greeting from "../../components/exercise/Greeting";
import { ChangeGoalBtn, RetryBtn } from "../../components/exercise/RecmBtn";
import Record from "../../components/exercise/Record";

const DATA = [
  { id: "1", name: "스쿼트", description: "근육 1과 근육 2의 발달에 좋습니다" },
  { id: "2", name: "데드리프트", description: "코어 근육의 발달에 좋습니다." },
  { id: "3", name: "트레드밀 러닝", description: "체력 강화에 좋습니다." },
  { id: "4", name: "푸시업", description: "코어 근육의 발달에 좋습니다." },
];

export default function ExerciseMain({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [recommend, setRecommend] = useState<
    { name: string; description: string; link: string }[]
  >(route.params.recommend);
  const [isRecording, setIsRecording] = useState(false);
  const [checkedExercises, setCheckedExercises] = useState<string[]>([]);

  useEffect(() => {
    const getData = async () => {
      const userIdVal = await AsyncStorage.getItem("user_id");
      const userNameVal = await AsyncStorage.getItem("user_name");

      if (userIdVal) {
        setUserId(userIdVal);
      }
      if (userNameVal) {
        setUserName(userNameVal);
      }
    };
    getData();
  }, []);

  const handleExerciseChecked = (exerciseName: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedExercises((prevChecked) => [...prevChecked, exerciseName]);
    } else {
      setCheckedExercises((prevChecked) =>
        prevChecked.filter((name) => name !== exerciseName)
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Greeting userName={userName} navigation={navigation} />
      <Button
        title="오운완!"
        type="outline"
        onPress={() => setIsRecording(true)}
      />
      <Modal visible={isRecording} presentationStyle="formSheet">
        <Record
          exerciseList={checkedExercises}
          onSubmit={() => setIsRecording(false)}
        />
      </Modal>
      <FlatList
        data={recommend}
        renderItem={({ item }) => (
          <ExerciseItem
            exerciseItem={item}
            onExerciseChecked={handleExerciseChecked}
          />
        )}
        keyExtractor={(item) => item.name}
      />
      <ChangeGoalBtn />
      <RetryBtn />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
