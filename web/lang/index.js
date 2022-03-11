import de from './de.json'

// TODO lazy-load these from media or static later
const strings = { de }

export default async ({ $http, $config }, locale) => {
  const localeStrings = Object.keys(strings)
    .filter((key) => strings[key] != '')
    .reduce((localeStrings, key) => ({ ...localeStrings, [key]: strings[key] }), {})
  return Object.assign({}, localeStrings)
}
