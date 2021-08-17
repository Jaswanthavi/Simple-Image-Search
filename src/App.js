import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("king");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const client_id = process.env.REACT_APP_Client_Id;
   console.log(client_id);
  const fetchImageUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}`;

  const fetchImages = () => {
    axios
      .get(fetchImageUrl, {
        headers: {},
      })
      .then((response) => {
        setData([...data, ...response.data.results]);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    setPage(page + 1);
    console.log(page);
  };
  const searchImages = (e) => {
    if (e.keyCode === 13) {
      setQuery(e.target.value);
      setData([]);
      console.log(query);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [query]);

  return (
    
    <div className="App flex">
      
      <input
        type="text"
        onKeyDown={(e) => searchImages(e)}
        placeholder="search for images 🔎"
        
      />

      <InfiniteScroll
        dataLength={data.length}
        next={fetchImages}
        hasMore={hasMore}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="main flex">
          {data.map((data, key) => (
            <div className="container" key={key}>
              <img
                src={data.urls.small}
                className="image"
                alt={data.alt_description}
              />

            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;