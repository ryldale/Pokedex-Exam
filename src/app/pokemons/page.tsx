import dynamic from "next/dynamic";

const PokemonPage = dynamic(() => import("@/modules/pokemon/pages/page"));

const Page = () => {
  return <PokemonPage />;
};

export default Page;
