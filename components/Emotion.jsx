import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

const emotions = {
  joy: { color: "red", emoji: "😄" },
  sadness: { color: "blue", emoji: "😞" },
  fear: { color: "purple", emoji: "😨" },
  anger: { color: "orange", emoji: "😡" },
  neutral: { color: "gray", emoji: "😐" },
  undefined: { color: "gray", emoji: "😐" },
};

const EmotionCard = ({ emotion }) => {
  const { color, emoji } = emotions[emotion];
  return (
    <Card color={"red"} className={`p-2 bg-${color}-300 dark:bg-${color}-700`}>
      <CardHeader className="p-2 flex-col items-center ">
        <h4 className="font-bold text-center text-large dark:text-white">
          {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
        </h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex items-center justify-center">
        <div className="text-6xl">{emoji}</div>
      </CardBody>
    </Card>
  );
};

const Emotion = ({ emotions }) => {
  if (!emotions || emotions.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center items-center space-x-4 border-2 p-4 dark:bg-gray-800">
      {emotions.map((emotion) => (
        <EmotionCard key={emotion} emotion={emotion} />
      ))}
    </div>
  );
};

export default Emotion;
