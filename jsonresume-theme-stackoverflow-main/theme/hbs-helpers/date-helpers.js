import { format, parseISO } from 'date-fns';

const dateHelpers = (d, f) => {
  return format((parseISO(d)), f)
}

export { dateHelpers };
