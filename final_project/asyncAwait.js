const axios = require("axios").default;

async function getBooks() {
    let url = "https://dewaelonter-5000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/";
    const result = await axios.get(url);
    console.log(result.data);
}

async function getBookByISBN(isbn) {
    let url = `https://dewaelonter-5000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/${isbn}`;
    try {
        const result = await axios.get(url);
        console.log('Data fetched successfully:', result.data);
    } catch (error) {
        console.error('Error fetching data:', error.response.data.message);
    }
}

async function getBookByAuthor(author) {
    let url = `https://dewaelonter-5000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/${author}`;
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}

async function getBookByTitle(title) {
    let url = `https://dewaelonter-5000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/title/${title}`;
    return new Promise((resolve, reject) =>{
        fetch(url)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(e => reject(e))
    })
}



getBooks();
getBookByISBN(10);
getBookByAuthor("Hans%20Christian%20Andersen").then(data => {
    console.log('Data fetched successfully:', data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
getBookByTitle("Pride%20and%20Prejudice").then(data => {
    console.log('Data fetched successfully:', data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
