// This probably seems like a strange choice, but I wanted to make it offline capable.
const EU_COUNTRIES = new Set([
    'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus',
    'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France',
    'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia',
    'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland',
    'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'
]);

const CountryDemon: { [key: string]: string } = {
    'Austria': 'Austrian',
    'Belgium': 'Belgian',
    'Bulgaria': 'Bulgarian',
    'Croatia': 'Croatian',
    'Cyprus': 'Cypriot',
    'Czech Republic': 'Czech',
    'Denmark': 'Danish',
    'Estonia': 'Estonian',
    'Finland': 'Finnish',
    'France': 'French',
    'Germany': 'German',
    'Greece': 'Greek',
    'Hungary': 'Hungarian',
    'Ireland': 'Irish',
    'Italy': 'Italian',
    'Latvia': 'Latvian',
    'Lithuania': 'Lithuanian',
    'Luxembourg': 'Luxembourgish',
    'Malta': 'Maltese',
    'Netherlands': 'Dutch',
    'Poland': 'Polish',
    'Portugal': 'Portuguese',
    'Romania': 'Romanian',
    'Slovakia': 'Slovak',
    'Slovenia': 'Slovenian',
    'Spain': 'Spanish',
    'Sweden': 'Swedish',
    'Australia': 'Australian',
    'Brazil': 'Brazilian',
    'Canada': 'Canadian',
    'China': 'Chinese',
    'India': 'Indian',
    'Japan': 'Japanese',
    'Mexico': 'Mexican',
    'New Zealand': 'New Zealander',
    'Norway': 'Norwegian',
    'Russia': 'Russian',
    'South Africa': 'South African',
    'South Korea': 'South Korean',
    'Switzerland': 'Swiss',
    'Turkey': 'Turkish',
    'United Kingdom': 'British',
    'United States': 'American',
};

export function isFromEU(countries: string | undefined): boolean {
    if (!countries) return false;
    const countryList = countries.split(',').map(c => c.trim());
    return countryList.length > 0 && EU_COUNTRIES.has(countryList[0]);
}

export function getCountryDemonym(country: string | undefined): string {
    if (!country) return 'N/A';
    const firstCountry = country.split(',')[0].trim();
    return CountryDemon[firstCountry] || firstCountry;
}
