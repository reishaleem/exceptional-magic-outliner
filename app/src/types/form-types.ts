export interface MagicSystemDetailsFields {
    name: string;
    hardnessRating: number;
    type: string[];
    description: string;
}

export interface MagicSystemDetailsFieldsErrors {
    name: string;
    type: string;
    hardnessRating: string;
    description: string;
}

export interface CreateOutlineFields {
    name: string;
    type: string;
}

export interface EditPageFields {
    body: string;
}

export interface EditNoteFields {
    body: string;
}

export interface EditOutlineFields {
    body: string;
}
