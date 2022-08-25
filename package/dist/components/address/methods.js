const getUnabbreviated = (field, address) => {
  const abbrFields = {
    region: "localizedRegionName",
    countryCode: "localizedCountryName"
  };
  const unabbreviatedField = abbrFields[field];
  return unabbreviatedField && address[unabbreviatedField];
};
export {
  getUnabbreviated
};
