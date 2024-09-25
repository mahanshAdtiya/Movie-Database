const BASE_URL = 'https://www.omdbapi.com/?apikey=d0afcd37';

const list = (props) => {
  return {
    data: [
      {
        title: props['Title'],
        type: props['Type'],
        key: props['imdbID'],
        keys: props['imdbID'],
        poster: props['Poster'],
        fav: 'nofav',
      },
    ],
  };
};

export const fetchmovie = async (props) => {
  let url = `${BASE_URL}&s=${props.name}&page=${props.page}`;
  const response = await fetch(url);
  const result = await response.json();

  const final = result['Search'].map(list);
  console.log(url)
  return final;
};


