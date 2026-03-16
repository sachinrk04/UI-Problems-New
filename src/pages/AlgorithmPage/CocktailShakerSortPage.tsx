import PageHeader from "@/components/PageHeader";
import CocktailShakerSort from "@/components/AlgorithmsComponents/CocktailShakerSort/CocktailShakerSort";

const CocktailShakerSortPage = () => {
  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader title="Cocktail Shaker Sort" />
      </div>
      <div className="h-[calc(100vh-9.75rem)] overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full flex flex-col p-4">
        <CocktailShakerSort />
      </div>
    </div>
  );
};

export default CocktailShakerSortPage;
