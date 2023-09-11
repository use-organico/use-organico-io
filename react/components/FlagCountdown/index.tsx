import React, { useState, useEffect } from "react";
import { Counter, Props } from "./typings";
import Countdown from "../ContainerCountdown/Countdown";
import moment from "moment";
import { useRuntime } from 'vtex.render-runtime'
import style from "./styles.css";

const FlagCountdown = ({ isActive = true }: Props) => {
  const { deviceInfo: {isMobile} } = useRuntime()
  const [isAvailable] = useState(true);
  const [timer, setTimer] = useState<Counter>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timerInterval = setInterval(() => {
      mountNextTime(moment().get("hour") >= 10);
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  function mountNextTime(isTomorrow: boolean) {
    const [hour, minute, second] = [9, 59, 59];
    const mountHour = moment()
      .startOf("day")
      .add(hour, "hours")
      .add(minute, "minutes")
      .add(second, "seconds");

    const target = isTomorrow ? mountHour.add(1, "days") : mountHour;

    const hours = target.get("hour") - moment().get("hour");
    const minutes = target.get("minutes") - moment().get("minutes");
    const seconds = target.get("seconds") - moment().get("seconds");

    setTimer({
      hours: isTomorrow ? hours + 24 : hours,
      minutes,
      seconds,
    });
  }

  return isAvailable && isActive && !isMobile ? (
    <div className={style.flag_countdown}>
      <span className={style.flag_countdown_texts}>
        Oferta <br /> limitada
      </span>
      <Countdown
        hours={timer.hours}
        minutes={timer.minutes}
        seconds={timer.seconds}
      />
    </div>
  ) : null;
};

export default FlagCountdown;
