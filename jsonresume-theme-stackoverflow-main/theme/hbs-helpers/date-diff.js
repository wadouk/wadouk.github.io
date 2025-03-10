import { intervalToDuration,  formatDuration, parseISO, interval, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale'

const dateDiff = (d1, d2) => {
  let parseISO2 = d2 === 'now' ? new Date() : parseISO(d2);
  let parseISO1 = parseISO(d1);
  let {years, months} = intervalToDuration(interval(parseISO1, parseISO2));
  let f = formatDuration({years, months: (months + 1)}, {locale: fr})
  return `(${f})`
}

export { dateDiff };
