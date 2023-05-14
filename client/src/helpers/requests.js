export async function deleteLink(linkId) {
    console.log("click!", linkId)
    
    const link = `/links/${linkId}`
    console.log(link)
    const response = await fetch(link, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
    })
    if (!response.ok) {
        throw new Error('Could not DELETE link :(')
    }

    //fetch    
}

export async function fetchList() {
    const response = await fetch("/links/");
      if (!response.ok) {
        throw new Error('Could not fetch data :(')
      }
      return await response.json();

}


