export interface IRecipeList {
    hits: Hits[] | undefined;
}

export interface Hits {
    recipe: Recipe
}

export interface Recipe {
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
    totalNutrients: {
        [key: string]: {
        label: string;
        quantity: number;
        unit: string;
        };
    };
}