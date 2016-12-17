import ICountry from './interfaces/ICountry';

export const findCountryByName = (countries: ICountry[], name: string): ICountry => {
  for(let country of countries) {
    if(country.name.toLowerCase() == name.toLowerCase()) {
      return country;
    }
  }
}

export const findCountryByCode = (countries: ICountry[], code: string): ICountry => {
  for(let country of countries) {
    if(country.code == code) {
      return country;
    }
  }
}

export const getKeys = (obj: Object): string[] => {
  let keys = [];

  for(let key in obj) {
    keys.push(key);
  }

  return keys;
}