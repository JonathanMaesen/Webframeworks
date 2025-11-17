# Tussentijdse Toets (20pt)

## Belangrijke informatie:

**Tips:**

- Styling telt niet mee. Bouw eerst correcte functionaliteit. Verspil geen tijd aan het namaken van de voorbeeldapp.
- Het doel is een volledig werkende React-app. Focus op logica, werking en correcte implementatie van de oefeningen.
- De toets bevat drie oefeningen en een routergedeelte. Deze onderdelen staan los van elkaar. Als routing niet lukt, mag je elke oefening als apart component tonen in App.tsx.
- Breekt een stuk code, isoleer het. Zet het in commentaar en noteer kort wat er fout loopt. Zonder uitleg verlies je punten.
- Je kan niet meer dan 20/20 halen. Bonuspunten kunnen enkel gebruikt worden om puntenverlies door fouten te compenseren.

**Boetesysteem:**
- node_modules in de zip: -1 punt
- Applicatie start niet op: -2 punten

**Bonuspunten** 

(deze punten kan je enkel verdienen als je een volledige oefening hebt afgewerkt)

- Gebruik van aparte componenten met properties en callbacks: +1 punt
- Gebruik van custom hooks: +1 punt
- Gebruik van context: +1 punt

## De router (2pt)

- Maak drie verschillende paginas aan met React Router met de volgende paden:
  - `/` moet doorverwijzen naar `/oefening1`.
  - `/oefening1` moet de oefening uit opdracht 1 bevatten.
  - `/oefening2` moet de oefening uit opdracht 2 bevatten.
  - `/oefening3` moet de oefening uit opdracht 3 bevatten.
- Elke oefening pagina moet een eigen component zijn in de map `src/pages`. Je kan de componenten al aanmaken zodat je deze later kan invullen met de oefeningen.
- Maak een `Header`, `Navbar` en `Footer` component aan die op elke pagina zichtbaar zijn. Gebruik hiervoor een `Layout` component.
- Zorgt ervoor dat de `Navbar` links bevat naar de drie oefening paginas. De link van de huidige pagina moet een active stijl hebben met een andere kleur.

## De oefeningen

### Oefening 1 (6pt)

**Live Demo:** https://duckies-nine.vercel.app/oefening1

- Installeer de [Rainbow Colors Array TS](https://www.npmjs.com/package/rainbow-colors-array-ts) package in je project.
- Gebruik deze package om een lijst van 100 gekleurde vierkanten weer te geven elk met zijn eigen kleur.
- Zorg ervoor als je op een vierkant klikt, dat de hex waarde van die kleur wordt toegevoegd aan een lijst van geselecteerde kleuren (tip: gebruik een state array).
- Toon deze lijst van geselecteerde kleuren boven/naast de gekleurde vierkanten.
- Als je op een kleur in de lijst van geselecteerde kleuren klikt, moet de kleur worden geselecteerd aan de hand van een border. (tip: hou de geselecteerde index bij in een state).
- Voeg een delete knop toe die de geselecteerde kleur uit de lijst van geselecteerde kleuren verwijdert.
 
### Oefening 2 (6pt)

**Live Demo:** https://duckies-nine.vercel.app/oefening2

#### De lijst

- Maak een bestand `types.ts` aan met de volgende interfaces:

```typescript
export interface Duckie {
    id: string;
    name: string;
    type: string;
    description: string;
    price: number;
    colorPalette: string[];
    materialBlend: string;
    accessories: string[];
    mood: string;
    waterBehavior: string;
    soundProfile: string;
    signatureMove: string;
    image: string;
}
```

- Gebruik een `fetch` request om de duckies data op te halen van de volgende API endpoint: `https://raw.githubusercontent.com/similonap/json/refs/heads/master/duckies/duckies.json`. 
- Voorzie error handling voor de fetch request (200 status code aftoetsen en catch blok).
- Voorzie loading state terwijl de data wordt opgehaald.
- Zorg ervoor dat de `useEffect` hook de fetch request 1x uitvoert bij de initiële render van de component.
- Toon een lijst van images van alle duckies.
- Voorzie `Link` elementen voor elke duckie image die naar een detail pagina van die specifieke duckie linkt (bijv. `/oefening2/:id`). Let op dat de id van de ducky geen getallen zijn maar strings (bijv. `oefening2/aurora-alpinist`)

#### De detail pagina

- Maak een route aan voor de duckie detail pagina met het pad `/oefening2/:id`.
- Haal de id parameter op uit de URL met de `useParams` hook.
- Gebruik deze id om een fetch request uit te voeren naar dezelfde API endpoint als in de lijst pagina.
- Zoek in de opgehaalde data naar de duckie met de overeenkomende id.
- Toon alle details van de duckie op de detail pagina.
- Voeg een "Back to Duckies" link toe die terug navigeert naar de lijst pagina.

### Oefening 3 (6pt)

**Live Demo:** https://duckies-nine.vercel.app/oefening3

- Maak een `counter` state aan in de component met een initiële waarde van 0.
- Zorg dat de waarde van de counter wordt weergegeven op de pagina.
- Maak een interval aan die elke seconde de counter met 1 verhoogt.
- Als de teller 100 bereikt, moet de teller terug naar 0 gezet worden.
- Voeg een `Start` en `Stop` knop toe om de interval te starten en stoppen.
- Voeg een `Reset` knop toe om de counter terug naar 0 te zetten.
- Voeg een progress bar toe die de voortgang van de counter toont van 0 tot 100.

```
<progress value={counter} max={100} style={{ width: '100%', accentColor: color }}></progress>
```

- De kleur van de progress bar moet afhankelijk zijn van de huidige waarde van de counter:
  - 0-50: groen
  - 51-75: oranje
  - 76-100: rood

- Zorg dat je de bovenstaande kleuren kan instellen via een color picker input (`<input type="color" />`) voor elke range (0-50, 51-75, 76-100).