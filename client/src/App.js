import React, { useState, useEffect, useCallback } from "react";
import AddLink from "./components/AddLink";
import LinkList from "./components/LinkList";
import "./App.css";
import { fetchList } from "./helpers/requests";

function App() {
  const [list, setList] = useState([{ name: "No data yet..." }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sortItems = (listToSort) => {
    return listToSort.sort((a, b) => {
      if (a.isRead && !b.isRead) {
        return 1; // a comes before b
      } else if (!a.isRead && b.isRead) {
        return -1; // b comes before a
      } else {
        return 0; // no change in order
      }
    });
  };

  const updateListItem = (updatedItem, itemId) => {
    console.log(updatedItem);
    setList((prevList) =>
      sortItems(
        prevList.map((item) => {
          var tmp = Object.assign({}, item);
          if (tmp.id === itemId) {
            tmp.isRead = updatedItem;
          }
          return tmp;
        })
      )
    );
  };

  const fetchLinkList = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchList();

      const transformedList = data.map((listData) => {
        return {
          id: listData._id,
          name: listData.name,
          link: listData.link,
          isRead: listData.isRead,
        };
      });

      setList(sortItems(transformedList));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchLinkList();
  }, [fetchLinkList]);

  const handleItemDeletion = (id) => {
    setList((prevList) => sortItems(prevList.filter((item) => item.id !== id)));
  };

  async function addListItemHandler(link) {
    const json_str = JSON.stringify(link);
    await fetch("/links", {
      method: "POST",
      body: json_str,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((new_data) => setList((prevList) => [...prevList, new_data]));

    console.log(list);
  }

  let content = <p>Found no links.</p>;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (list.length > 0) {
    content = (
      <LinkList
        links={list}
        onUpdate={updateListItem}
        onDeleteItem={handleItemDeletion}
      />
    );
  }

  return (
    <div className="w-full md:mx-0 px-4 grid place-items-center bg-gradient-to-tr from-violet-500 to-fuchsia-400">
      <h1 className="text-2xl text-gray-700 font-mono">READING LIST</h1>
      <div className="container">
        <section>
          <AddLink onAddLink={addListItemHandler} />
        </section>
        <section>
          <button onClick={fetchLinkList}>Fetch Links</button>
        </section>
      </div>
      <section className="items-list">{content}</section>
    </div>
  );
}

export default App;
