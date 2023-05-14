export async function deleteLink(linkId) {
    console.log("click!", linkId)
    
    const link = `/links/${linkId}`
    console.log(link)
    if (window.confirm("Do you want to delete the link?")) {
        const response = await fetch(link, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            },
        }).then(() => {
            window.location.reload()
        })
        if (!response.ok) {
            throw new Error('Could not DELETE link :(')
        }
    }
}

export async function fetchList() {
    const response = await fetch("/links/");
      if (!response.ok) {
        throw new Error('Could not fetch data :(')
      }
      return await response.json();

}


