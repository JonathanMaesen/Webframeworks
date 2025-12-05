const EU_COUNTRIES = new Set([
    'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus',
    'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France',
    'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia',
    'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland',
    'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'
]);

// Create a regex pattern to match any EU country name, case-insensitively, with word boundaries
// Escape special characters in country names for regex safety
const EU_COUNTRIES_REGEX_PATTERN = Array.from(EU_COUNTRIES)
    .map(c => c.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')) // Escape regex special chars
    .join('|');
const EU_REGEX = new RegExp(`\\b(${EU_COUNTRIES_REGEX_PATTERN})\\b`, 'i');

const CountryDemonyms: { [key: string]: string } = {
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

export function isFromEU(countryInfo: string | undefined): boolean {
    if (!countryInfo) return false;
    return EU_REGEX.test(countryInfo);
}

export function getCountryDemonym(country: string | undefined): string {
    if (!country) return 'N/A';
    const firstCountry = country.split(',')[0].trim();
    return CountryDemonyms[firstCountry] || firstCountry;
}
