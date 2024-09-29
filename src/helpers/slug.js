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
  const pattern = /^[a-z]+(-[a-z]+)*$/;
  return pattern.test(slug);
}

export { textToSlug, isValidSlug }
