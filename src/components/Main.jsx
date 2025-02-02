import React from 'react'
import { useState } from 'react'
import IngredientsList from './IngredientsList'
import ClaudeRecipe from './ClaudeRecipe'
export default function Main() {
    const [ingredients, setIngredients] = useState([])
    const [recipeShown, setRecipeShown] = useState(false)

    const ingredientsListItem = ingredients.map(ingredient => {
        return (
            <li key={ingredient}>{ingredient}</li>)
    })

    function addIngredient(formData) {
        const newIngredients = formData.get("ingredient")
        setIngredients(prevIngredients =>
            [...prevIngredients, newIngredients])


    }

    function showRecipe() {
        setRecipeShown(true)
    }
    return (
        <>
            <main>
                <form action={addIngredient} className='add-ingredient-form'>
                    <input
                        type='text' placeholder='e.g. oregano'
                        aria-label='Add ingredient'
                        name='ingredient'
                    />
                    <button>Add Ingredient</button>
                </form>
                {ingredients.length > 0 && <IngredientsList
                    ingredientsListItem={ingredientsListItem}
                    ingredients={ingredients.length}
                    showRecipe={showRecipe}
                />
                }
                {recipeShown && <ClaudeRecipe />
                }

            </main >
        </>
    )
}
