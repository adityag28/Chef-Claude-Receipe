import React, { useState } from 'react';
import IngredientsList from './IngredientsList';
import ClaudeRecipe from './ClaudeRecipe';
import { getRecipeFromMistral } from "../ai.js";

export default function Main() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        setRecipe(recipeMarkdown);
    }

    function addIngredient(event) {
        event.preventDefault(); // Prevent form reload
        const formData = new FormData(event.target);
        const newIngredient = formData.get("ingredient").trim();

        if (newIngredient) { // Ensure ingredient is not empty
            setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
        }

        event.target.reset(); // Clear input after adding an ingredient
    }

    return (
        <main>
            <form onSubmit={addIngredient} className='add-ingredient-form'>
                <input
                    type='text'
                    placeholder='e.g. oregano'
                    aria-label='Add ingredient'
                    name='ingredient'
                />
                <button type='submit'>Add Ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            )}

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    );
}
