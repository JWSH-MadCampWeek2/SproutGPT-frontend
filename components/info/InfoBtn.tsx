import React, { useState } from "react";
import { Button } from "@rneui/themed";

function InfoBtn({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Button
      title={title}
      type="outline"
      onPress={onPress}
      style={{ margin: 16 }}
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
