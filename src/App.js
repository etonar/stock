import { useEffect, useState } from 'react';

// icons
import { FaSearch } from 'react-icons/fa';

// component
import SingleItem from './single-image';

//URLS
const mainURL = 'https://api.unsplash.com/photos/';
const searchURL = 'https://api.unsplash.com/search/photos/';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const clientID = '?client_id=f7N-c7ynV9x6FAE3c1mP35-_1uRQeFNKMYlRro55XGA';

  const getData = async () => {
    setLoading(true);

    let url;
    if (query) {
      url = `${searchURL}${clientID}&page=${page}&query=${query}`;
    } else {
      url = `${mainURL}${clientID}&page=${page}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    setData((oldData) => {
      if (query && page === 1) {
        return data.results;
      } else if (query) {
        return [...oldData, ...data.results];
      } else {
        return [...oldData, ...data];
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
       

        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener('scroll', event);
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    getData();
  };

  return (
    <div className="container">
      <form
        className="form"
        onSubmit={(e) => {
          handlSubmit(e);
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <FaSearch />
        </div>
      </form>

      <section className="images-container">
        {data.map((item) => {
          return <SingleItem key={item.id} {...item} />;
        })}
      </section>
      {loading && <h1 className="loading">loading...</h1>}
    </div>
  );
}

export default App;
