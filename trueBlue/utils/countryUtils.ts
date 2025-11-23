const EU_COUNTRIES = new Set([
    'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
    'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
    'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta',
    'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia',
    'Spain', 'Sweden'
]);

export function isFromEU(countries: string | undefined): boolean {
    if (!countries) return false;
    const countryList = countries.split(',').map(c => c.trim());
    return countryList.some(country => EU_COUNTRIES.has(country));
}