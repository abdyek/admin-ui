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

function textToNumericScreamingSnakeCase(text) {
  return text
    .replace(/[çÇğĞşŞüÜöÖıİ]/g, match => turkishMap[match])
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9_ ]+/g, "")
    .replace(/[-\s]+/g, "_")
    .replace(/_+/g, "_")
    .toUpperCase()
}

export {
  textToNumericScreamingSnakeCase,
  turkishMap,
}
