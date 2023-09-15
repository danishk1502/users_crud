export const YUP_VALIDATION = {
  UUID: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi,
  PHONE_NUMBER: /^[0-9\.\+\/]+$/,
  EMAIL: /^(?!.*@[^,]*,)/,
  NUMBER_NPI_EIN: /^(?=.*?[1-9])[0-9()]+$/,
  WEB_URL:
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
  COUNTRY_CODE: /^[+]{1}(\\d{1,3}|\d{1,3})$/,
  POSTAL_ZIP_CODE: /^([0-9]{4,5})(?:[-\s]*([0-9]{4}))?$/,
  PHONE_NUMBER_WITH_COUNTRY_CODE: /^([+]\d{1})?\d{10}$/,
  FAX_NUMBER_WITH_COUNTRY_CODE: /^\+\d{1,3}?\d{1,14}$/,
  REMOVE_COUNTRY_CODE: /^\+1/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\-$*.{}?"!@#%&\/\\,><':;|_~`^\]\[\)\(])\S{8,}$/,
  specialChars: /[`\[\]]/,
};
