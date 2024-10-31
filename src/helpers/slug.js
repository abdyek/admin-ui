const turkishMap = {
  'ç': 'c',
  'Ç': 'C',
  'ğ': 'g',
  'Ğ': 'G',
  'ş': 's',
  'Ş': 'S',
  'ü': 'u',
  'Ü': 'U',
  'ö': 'o',
  'Ö': 'O',
  'ı': 'i',
  'İ': 'I'
};

function textToSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/[çÇğĞşŞüÜöÖıİ]/g, match => turkishMap[match])
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function isValidSlug(slug) {
  if (slug == "") {
    return true
  }
  const pattern = /^[a-z0-9]+(-[a-z0-9]+)*$/
  return pattern.test(slug);
}

export { textToSlug, isValidSlug }
