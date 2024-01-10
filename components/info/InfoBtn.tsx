import React, { useState } from "react";
import { Button } from "@rneui/themed";
import { GREEN_DEEP, GREEN_LIGHT } from "../../utils/colors";
import styled from "styled-components/native";

function InfoBtn({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <StyledButton
      title={title}
      color={GREEN_DEEP}
      onPress={onPress}
      style={{ marginHorizontal: 16, height: 48 }}
      radius="lg"
    />
  );
}

export function NextBtn({ onPress }: { onPress: () => void }) {
  return <InfoBtn title={"다음으로"} onPress={onPress} />;
}

export function StartBtn({ onPress }: { onPress: () => void }) {
  return <InfoBtn title={"시작하기"} onPress={onPress} />;
}
export function ConfirmBtn({ onPress }: { onPress: () => void }) {
  return <InfoBtn title={"저장하기"} onPress={onPress} />;
}

const StyledButton = styled(Button)`
  font-family: Jalnan2;
`;
