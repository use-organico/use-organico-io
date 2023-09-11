import React, { useState, useEffect } from "react";
import { Counter, Props } from "./typings";
import { schema, defaultProps } from "./schema";
import { useRuntime, Link } from 'vtex.render-runtime'
import Countdown from "./Countdown";
import style from "./styles.css";
import moment from "moment";

const ContainerCountdown = ({
  countdownTitle = "",
  countdownSubTitle = "",
  isActive = true,
  imageDesktop = "",
  imageDesktopLink,
  children,
}: Props) => {
  const { deviceInfo } = useRuntime()
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

  return isAvailable && isActive ? (
    
      deviceInfo.mobile
      ? (<div className={style.countdown_container}>
        <div className={style.countdown_content}>
          <div className={style.countdown_title}>{countdownTitle}</div>
          <p className={style.countdown_subTitle}>{countdownSubTitle}</p>
          <Countdown
            hours={timer.hours}
            minutes={timer.minutes}
            seconds={timer.seconds}
          />
        </div>
        <div className={style.countdown_container_shelf}>{children}</div>
      </div>)
      : (
        <div className={style.countdown_container}>
          <div className={style.countdown_content}>
            <div className={style.countdow_column}>
              {
                imageDesktopLink
                ? <Link to={imageDesktopLink}>
                  <img className={style.countdown_image} src={imageDesktop} alt="Image"/>
                </Link>
                : imageDesktop && (
                  <img className={style.countdown_image} src={imageDesktop} alt="Image"/>
                )
              }
            </div>

            <div className={style.countdow_column}>
              <div className={style.countdown_container_shelf}>{children}</div>
            </div>

            <div className={style.countdow_column}>
              <div className={style.countdown_title}>{countdownTitle}</div>
              <p className={style.countdown_subTitle}>{countdownSubTitle}</p>
              <Countdown
                hours={timer.hours}
                minutes={timer.minutes}
                seconds={timer.seconds}
              />
            </div>
          </div>
        </div>
      )
    
  ) : null;
};

ContainerCountdown.schema = schema;
ContainerCountdown.defaultProps = defaultProps;

export default ContainerCountdown;
