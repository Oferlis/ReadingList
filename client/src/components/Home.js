import { useState, useCallback, useEffect, useContext } from "react";
import AddLink from "./AddLink";
import LinkList from "./LinkList";
import { addLink, getLinks, updateLink, deleteLink } from "../api/api";
import { UserContext } from "../context/userContext";
import sortItems from "../helpers/sorters";
import SearchBar from "./SearchBar";

export const Home = () => {
  const [list, setList] = useState([{ name: "No data yet..." }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const unreadLinksNum = list.filter((item) => item.isRead === false).length;

  const updateListItem = (updatedItem, itemId) => {
    updateLink(itemId, updatedItem);

    setList((prevList) =>
      sortItems(
        prevList.map((item) => {
          var tmp = Object.assign({}, item);
          if (tmp._id === itemId) {
            tmp.isRead = updatedItem;
          }
          return tmp;
        })
      )
    );
  };

  const addListItem = async (link) => {
    const data = await addLink(link);
    const newList = sortItems(data);
    setList(newList);
  };

  const deleteListItem = async (linkID) => {
    console.log(linkID);
    const result = await deleteLink(linkID);
    if (result === true) {
      const newList = list.filter((item) => item._id !== linkID);
      setList(newList);
    }
  };

  const fetchLinkList = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getLinks();

      const transformedList = data.map((listData) => {
        return {
          _id: listData._id,
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
  }, [setList]);

  useEffect(() => {
    fetchLinkList();
  }, [fetchLinkList]);

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
        onDelete={deleteListItem}
      />
    );
  }

  return (
    <div>
      <h1>READING LIST</h1>
      <h2>Hey {user.firstName} what's on your mind today?</h2>
      <h2>You got {unreadLinksNum} unread link(s)</h2>
      <SearchBar />
      <div className="container">
        <section>
          <AddLink onAddLink={addListItem} onFetchLinks={fetchLinkList} />
        </section>
      </div>
      <section className="items-list">{content}</section>
    </div>
  );
};
