export async function deleteLink(linkId) {
  const link = `/links/${linkId}`;
  if (window.confirm("Do you want to delete the link?")) {
    const response = await fetch(link, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Could not DELETE link :(");
    }
  }
}

export async function fetchList() {
  const response = await fetch("/links/");
  if (!response.ok) {
    throw new Error("Could not fetch data :(");
  }
  return await response.json();
}

export async function markLinkAsRead(linkId, isRead) {
  const read = {
    isRead: !isRead,
  };
  const link = `/links/${linkId}`;
  await fetch(link, {
    method: "PATCH",
    body: JSON.stringify(read),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Could not mark link as read :(");
    }
    // else {
    //     window.location.reload()
    // }
  });
}
