import { useContext, useState } from "react";
import { peopleContext } from "../src/context/peopleContext";
import "./App.css";

function App() {
  const {
    data,
    loading,
    searchPeople,
    restSearch,
    handleNext,
    handlePrevious,
    page,
  } = useContext(peopleContext);
  const [element, setElement] = useState("");
  const [detail, setDetail] = useState(false);

  const showDetails = () => {
    detail ? setDetail(false) : setDetail(true);
  };
  return (
    <>
      <div>
        <h1>All Star Wars People</h1>
        <label htmlFor="search">Search People</label>
        <input
          type="text"
          name="search"
          value={element}
          onChange={(e) => {
            setElement(e.target.value);
          }}
        />
        {element !== "" && (
          <button
            name="search"
            onClick={() => {
              searchPeople(element);
            }}
          >
            Search
          </button>
        )}
        <button
          onClick={() => {
            restSearch();
          }}
        >
          Reset
        </button>
        {page > 1 && (
          <button onClick={() => handlePrevious()}>Previous Page</button>
        )}
        <button onClick={() => handleNext()}>Next Page</button>
        <div className="pcontainer">
          {loading ? (
            <p>Loading Data...</p>
          ) : (
            data?.map((el) => {
              return (
                <div key={el.created} className="pcontainer__item">
                  <p>Name: {el.name}</p>
                  <p>Height: {el.height}</p>
                  <p>Mass:{el.mass}</p>

                  {detail && (
                    <>
                      <p>Hair color: {el.hair_color}</p>
                      <p>Birth year: {el.birth_year}</p>
                      <p>gender: {el.gender}</p>
                    </>
                  )}
                  <button onClick={() => showDetails()}>Details</button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default App;
