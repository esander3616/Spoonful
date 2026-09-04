export type User = {
    _id: string;
    email: string;
};

export type Ingredient = {name: string; quantity: string};
export type Instruction = {step: number, description: string};

export type Recipe = {
    _id: string;
    title: string;
    description?: string;
    image?: string;
    ingredients: Ingredient[];
    instructions: Instruction[];
    tags:string[];
    ownerId: string;
};