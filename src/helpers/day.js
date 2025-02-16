import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

function rawToRelative(raw) {
  dayjs.extend(relativeTime)
  return dayjs().to(dayjs(raw))
}

export {
  rawToRelative,
}
