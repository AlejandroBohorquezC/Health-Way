export interface IRecipeList {
    hits: Hits[] | undefined;
}

export interface Hits {
    recipe: Recipe
}

interface Recipe {
    label: string;
    image: string;
    dietLabels: string[];
    healthLabels: string[];
    cautions: string[];
    ingredientLines: string[];
    calories: number;
    totalNutrients: {
        [key: string]: {
        label: string;
        quantity: number;
        unit: string;
        };
    };
}