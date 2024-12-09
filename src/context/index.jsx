import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null)
  const [favoritesList, setFavoritesList] = useState([])

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();

      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  }
  function handleAddToFavorites(getCurrentItem) {
    let copyList = [...favoritesList]
    const index = copyList.findIndex(item => item.id === getCurrentItem.id)

    if (index === -1) {
      copyList.push(getCurrentItem)
    } else {
      copyList.splice(index)
    }
    setFavoritesList(copyList);
  }
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        recipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        favoritesList,
        setFavoritesList,
        handleAddToFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
