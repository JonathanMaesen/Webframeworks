const EU_COUNTRIES = new Set([
    'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus',
    'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France',
    'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia',
    'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland',
    'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'
]);

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

    const lowerCountryInfo = countryInfo.toLowerCase();

    for (const country of EU_COUNTRIES) {
        // Check if the lowercase country name is present in the lowercase input string.
        if (lowerCountryInfo.includes(country.toLowerCase())) {
            return true;
        }
    }

    return false;
}

export function getCountryDemonym(country: string | undefined): string {
    if (!country) return 'N/A';
    const firstCountry = country.split(',')[0].trim();
    return CountryDemonyms[firstCountry] || firstCountry;
}
