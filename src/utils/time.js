import moment, {Moment} from "moment";

export function formatTime(time: any) {
  if (typeof time === "string") {
    time = parseInt(time);
  }
  let momentTime: Moment = moment(time);
  let diff = moment().diff(momentTime);
  if (diff < 60 * 1000) {
    return `${(diff / 1000).toFixed()}秒前`;
  }
  if (diff < 60 * 60 * 1000) {
    return `${(diff / 1000 / 60).toFixed()}分钟前`;
  }
  if (diff < 24 * 60 * 60 * 1000) {
    return `${(diff / 60 / 1000 / 60).toFixed()}小时前`;
  }

  return momentTime.format("YYYY年M月D日");
}
