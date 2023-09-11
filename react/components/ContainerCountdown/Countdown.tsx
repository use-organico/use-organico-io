import React from "react";
import style from "./styles.css";

interface Props {
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = ({ hours, minutes, seconds }: Props) => {
  return (
    <div className={style.countdown}>
      <div className={style.countdown_item}>
        <span className={style.countdown_item_number}>{hours}</span>
        <span className={style.countdown_item_division}>:</span>
      </div>
      <div className={style.countdown_item}>
        <span className={style.countdown_item_number}>{minutes}</span>
        <span className={style.countdown_item_division}>:</span>
      </div>
      <div className={style.countdown_item}>
        <span className={style.countdown_item_number}>{seconds}</span>
      </div>
    </div>
  );
};

export default Countdown;
