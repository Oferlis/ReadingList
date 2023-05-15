import React, {useState, useEffect, useCallback} from "react";
import AddLink from "./components/AddLink";
import LinkList from "./components/LinkList";
import "./App.css";
import { fetchList } from "./helpers/requests";

function App() {
  const [list, setList] = useState([{name: "wow"}]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  const fetchLinkList = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchList()

      const transformedList = data.map((listData) => {
        return {
          id: listData._id,
          name: listData.name,
          link: listData.link,
          isRead: listData.isRead,
        }
      }).sort((a,b) => {
        if (a.isRead && !b.isRead) {
          return 0; // a comes before b
        } else if (!a.isRead && b.isRead) {
          return -1; // b comes before a
        } else {
          return 1; // no change in order
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
      <h1>READING LIST</h1>
      <div className="container">
        <section>
          <AddLink onAddLink={addListItemHandler} />
        </section>
        <section>
          <button onClick={fetchLinkList}>Fetch Links</button>
        </section>
      </div>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;