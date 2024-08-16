import pino from "pino";
import dayjs from "dayjs";

export const log = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:standard", // human-readable time
      ignore: "pid,hostname", // do not display pid and hostname
    },
  },
  base: null,
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
