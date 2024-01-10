import React from "react";
import { Text } from "react-native";

import styled from "styled-components/native";

function Comment({
  onCommentComplete,
  commentData,
}: {
  onCommentComplete: () => void;
  commentData: string;
}) {
  // Use a regular expression to remove the numeric part
  const quoteIndex = commentData.indexOf("'");

  // Extract the substring starting from the character after the first single quote
  const parsedString = commentData
    .substring(quoteIndex + 1, commentData.length - 1)
    .replace(/\\n/g, "\n");
  console.log(parsedString);

  return (
    <>
      <Text>{parsedString}</Text>
      <Button title="돌아가기" onPress={onCommentComplete} />
    </>
  );
}

export default Comment;
