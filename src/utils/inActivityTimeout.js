import React, { useMemo, useState } from "react";

function InActivityTimeout() {
  const [inActiveTime, setInActiveTime] = useState(0);

  const activityCalculator = useMemo(() => {
    setInActiveTime(() => {
      setTimeout(() => {
        console.log("2324 34345");
      }, [2 * 60 * 60 * 1000]);
    });
  }, [
    window.KeyboardEvent,
    window.onload,
    window.onclick,
    window.MouseEvent,
    window.scroll,
  ]);
  console.log("hello");

  return <div>inActivityTimeout</div>;
}

export default InActivityTimeout;
