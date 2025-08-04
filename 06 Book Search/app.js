

 function debounce(func, wait) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }

async function searchBooks(query){
  const booksContainer = document.getElementById('books');
      const loading = document.getElementById('loading');
      const error = document.getElementById('error');


      //Clear previous content
      booksContainer.innerHTML = '';
      error.style.display = 'none';
      loading.style.display = 'block';


      //Validate input

      if(!query)
      {
           loading.style.display = 'none';
        error.style.display = 'block';
        error.textContent = 'Please enter a search term';
        return;
      }

      try{
        const response = await fetch(`http://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        if(!response.ok)  throw new Error('Failed to fetch Books');
        const data = await response.json();

        if(data.docs.length===0)
        {
             loading.style.display = 'none';
          error.style.display = 'block';
          error.textContent = 'No books found';
          return;
        }


        //render up to 10 books
        data.docs.slice(0,10).forEach(book =>{
            const card = document.createElement('div');
            card.className = 'book-card';
            card.innerHTML =   `
            <h3>${book.title || 'Untitled'}</h3>
            <p><strong>Author:</strong> ${book.author_name?.[0] || 'Unknown'}</p>`;
            booksContainer.appendChild(card);
        })
      }

      catch (err) {
        error.style.display = 'block';
        error.textContent = err.message;
      } finally {
        loading.style.display = 'none';
      }
}

const debouncedSearch = debounce(searchBooks, 500);

    document.getElementById('searchInput').addEventListener('input', (event)=>{
        const query = event.target.value.trim();
        if(query){
            debouncedSearch(query);
        }

        else {
            document.getElementById('books').innerHTML = ``;
            document.getElementById('error').style.display = 'none';
        }
    })


