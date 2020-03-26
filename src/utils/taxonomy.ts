/**
 * Parse and read subject id for given string
 * @param  {String} id
 * @return {String}
 */
export function getSubjectId(id: string) {
  return id.substring(0, id.indexOf('-'));
}

/**
 * Parse and read course id for given string
 * @param  {String} id
 * @return {String}
 */
export function getCourseId(id: string) {
  const ids = id.split('-');
  return `${ids[0]}-${ids[1]}`;
}

/**
 * Parse and read domain id for given string
 * @param  {String} id
 * @return {String}
 */
export function getDomainId(id: string) {
  const ids = id.split('-');
  return `${ids[0]}-${ids[1]}-${ids[2]}`;
}
