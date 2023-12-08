/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const peopleContext = createContext();

export function PeopleProvider({ children }) {
  const [data, setData] = useState();
  const [dataReset, setDataReset] = useState();
  const [loading, setLoading] = useState(true);
  const [filterData] = useState();
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(`https://swapi.dev/api/people/?page=${page}`);

  const searchPeople = (element) => {
    setLoading(true);
    setUrl(`https://swapi.dev/api/people/?search=${element}`);
  };
  const restSearch = () => {
    setLoading(true);
    setUrl("https://swapi.dev/api/people/?page=1");
  };

  const handlePrevious = () => {
    setPage(page - 1);
    setLoading(true);
  };
  const handleNext = () => {
    setPage(page + 1);
    setLoading(true);
  };
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        setData(json.results);
        setDataReset(json.results);
      })
      .catch((err) => console.log(err));
  }, [page, url]);

  return (
    <peopleContext.Provider
      value={{
        data,
        loading,
        searchPeople,
        restSearch,
        dataReset,
        filterData,
        handlePrevious,
        handleNext,
        page,
      }}
    >
      {children}
    </peopleContext.Provider>
  );
}

export default PeopleProvider;
