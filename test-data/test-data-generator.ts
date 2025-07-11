import { faker } from '@faker-js/faker';

// Creates random data
export function generateContactData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const birthdate = faker.date.birthdate({ min: 18, max: 80, mode: 'age' }).toISOString().split('T')[0]; // YYYY-MM-DD
  const email = faker.internet.email({
    firstName,
    lastName,
    provider: 'example.com',
    allowSpecialCharacters: false,
  });
  const phone = faker.string.numeric(10);
  const street1 = faker.location.streetAddress();
  const street2 = faker.location.secondaryAddress();
  const city = faker.location.city();
  const stateProvince = faker.location.state();
  const postalCode = faker.location.zipCode();
  const country = shortenCountryName(faker.location.country());
  const password = faker.internet.password({ length: 12 });

  return {
    firstName,
    lastName,
    birthdate,
    email,
    phone,
    street1,
    street2,
    city,
    stateProvince,
    postalCode,
    country,
    password,
  };

  // Shorten Country names that exceeds to 40 Characters
  function shortenCountryName(country: string) {
    let trimmedCountry = country.length > 40
      ? country.split(' ').slice(0, 2).join(' ')
      : country;
   return trimmedCountry;
  }
}