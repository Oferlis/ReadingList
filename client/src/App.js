import React, {useState, useEffect, useCallback} from "react";
import AddLink from "./components/AddLink";
import LinkList from "./components/LinkList";
import "./App.css";

function App() {
  const [list, setList] = useState([{name: "wow"}]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  const fetchLinkList = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/links/");
      if (!response.ok) {
        throw new Error('Could not fetch data :(')
      }
      const data = await response.json();

      const transformedList = data.map((listData) => {
        return {
          id: listData._id,
          name: listData.name,
          link: listData.link
        }
      })
      
      setList(transformedList)
      console.log(transformedList)
    }
    catch (error) {
      setError(error.message);
    }
    setIsLoading(false)
  }, []);

  useEffect(() => {
    fetchLinkList();
  }, [fetchLinkList])

  async function addListItemHandler(link) {
    const json_str = JSON.stringify(link)
    console.log(json_str)
    const response = await fetch('/links', {
      method: 'POST',
      body: json_str,
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!response.ok) {
      throw new Error('Could not POST data :(')
    }
  }

  let content = <p>Found no links.</p>;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (list.length > 0) {
    content = <LinkList links={list} />
  }

  return (
    <React.Fragment>
      <section>
        <AddLink onAddLink={addListItemHandler} />
      </section>
      <section>
        <button onClick={fetchLinkList}>Fetch Links</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;