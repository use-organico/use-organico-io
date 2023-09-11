export interface Counter {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Props {
  countdownTitle: string;
  countdownSubTitle: string;
  countdownDate: string;
  countdownHour: string;
  imageDesktop: string;
  imageDesktopLink: string;
  isActive: boolean;
  children: any;
}
