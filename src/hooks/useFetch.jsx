import { useEffect } from "react";
import { useState } from "react";

export function useFetch() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
      .then((res) => res.json())
      .then((json) => {
        setData(json.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return data;
}

export default useFetch;
