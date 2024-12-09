import { useContext } from "react"
import { GlobalContext } from "../../context"
import RecipeItem from "../../components/recipe-item";

const Favorites = () => {
  const { loading, favoritesList, setFavoritesList } = useContext(GlobalContext);
  if (loading) return <div>Loading...Please wait!</div>;
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((recipe) => (
          <RecipeItem recipe={recipe} key={recipe.id} />
        ))
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing to show. Please favorite something
          </p>
        </div>
      )}
    </div>
  );
}
export default Favorites