export interface penguin {
    id:          number;
    nickname:    string;
    description: string;
    species_id:  number;
    island:      string;
    gender:      "Male" | "Female";
    weight:      number;
    height:      number;
    year:        number;
    image:       string;
    assigned_to: string | null
}