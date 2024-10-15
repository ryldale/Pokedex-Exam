const getCapturedPokemons = () => {
  const capturedPokemons = [];

  for (let i = 0; i < localStorage.length; i++) {
    const pokemonName = localStorage.key(i);

    if (pokemonName && localStorage.getItem(pokemonName)) {
      const pokemonData = localStorage.getItem(pokemonName);

      try {
        const { date, nickname, url, weight, stats, abilities, sprite } =
          JSON.parse(pokemonData || "");

        if (date && nickname && url && weight && sprite !== undefined) {
          capturedPokemons.push({
            name: pokemonName,
            date,
            nickname,
            url,
            weight,
            stats,
            abilities,
            sprite
          });
        }
      } catch (error) {
        console.error(`Error parsing JSON for ${pokemonName}:`, error);
        continue;
      }
    }
  }

  return capturedPokemons;
};

export default getCapturedPokemons;
