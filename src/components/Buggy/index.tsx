import { useState } from "react";

export const Buggy = () => {
  const [throwError, setThrowError] = useState(false);

  const handleClick = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error("エラーが発生しました！");
  }

  return <button onClick={handleClick}>エラーを発生させる</button>;
};
