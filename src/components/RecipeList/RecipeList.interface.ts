export interface IRecipeList {
    hits: Hits[];
}

export interface Hits {
    recipe: Recipe
}

export interface Recipe {
    uri: string;
    label: string;
    image: string;
    images: {
        [key: string]: {
        url: string;
        };
    };
    dietLabels: string[];
    healthLabels: string[];
    cautions: string[];
    ingredientLines: string[];
    calories: number;
    cuisineType?: string[];
    url?: string; // Source URL of the recipe
    totalNutrients: {
        [key: string]: {
        label: string;
        quantity: number;
        unit: string;
        };
    };
}