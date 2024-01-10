import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, View, Modal, Alert } from "react-native";
import { Button } from "react-native-elements";
import ExerciseItem from "../../components/exercise/ExerciseItem";
import Greeting from "../../components/exercise/Greeting";
import { ChangeGoalBtn, RetryBtn } from "../../components/exercise/Buttons";
import Record from "../../components/exercise/Record";
import Comment from "./Comment";
import styled from "styled-components/native";

export default function ExerciseMain({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [recommend, setRecommend] = useState<
    { name: string; description: string; link: string; target: string }[]
  >(route.params.recommend);
  const [comment, setComment] = useState(route.params.comment);
  const [isRecording, setIsRecording] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [checkedExercises, setCheckedExercises] = useState<string[]>([]);

  useEffect(() => {
    const getData = async () => {
      const userIdVal = await AsyncStorage.getItem("user_id");
      const userNameVal = await AsyncStorage.getItem("user_name");
      const userPhotoVal = await AsyncStorage.getItem("user_photo");

      if (userIdVal) {
        setUserId(userIdVal);
      }
      if (userNameVal) {
        setUserName(userNameVal);
      }
      if (userPhotoVal) {
        setUserPhoto(userPhotoVal);
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
    <StyledContainer>
      <Greeting userName={userName} userPhoto={userPhoto} />
      <Button
        title="오운완!"
        type="outline"
        onPress={() =>
          checkedExercises.length > 0
            ? setIsRecording(true)
            : Alert.alert(
                "안내",
                "오늘 완료한 운동이 없어요!",
                [{ text: "확인", onPress: () => {}, style: "cancel" }],
                {
                  cancelable: true,
                  onDismiss: () => {},
                }
              )
        }
      />
      <Modal visible={isRecording} presentationStyle="formSheet">
        <Record
          exerciseList={checkedExercises}
          onSubmit={() => setIsRecording(false)}
        />
      </Modal>
      <Button
        title="AI의 코멘트 확인하기!"
        type="outline"
        onPress={() => setIsComment(true)}
      />
      <Modal visible={isComment} presentationStyle="formSheet">
        <Comment
          onCommentComplete={() => setIsComment(false)}
          commentData={comment}
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
    </StyledContainer>
  );
}

const StyledContainer = styled(View)``;
