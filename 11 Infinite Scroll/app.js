document.addEventListener('DOMContentLoaded',()=>{
        const postList = document.getElementById('postList');
  const loading = document.getElementById('loading');
  const paginationControls = document.getElementById('paginationControls');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const infiniteScrollBtn = document.getElementById('infiniteScrollBtn');
  const paginationBtn = document.getElementById('paginationBtn');


let currentPage  =1;
const postsPerPage  =10;
let isLoading= false;
let mode = localStorage.getItem('scrollMode') || 'infinite';

    if(mode=== 'pagination'){
    infiniteScrollBtn.classList.remove('active');
    paginationBtn.classList.add('active');
    paginationControls.style.display = 'flex';

    }

    else{
     infiniteScrollBtn.classList.add('active');
    paginationBtn.classList.remove('active');
    paginationControls.style.display = 'none';

    }


    async function fetchPosts(page)
    {
         try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postsPerPage}`);
        return await response.json();

        
        }

        catch (error){
            console.log('Error fetching posts', error)
            return [];
        }
    }


        async function renderPosts(page = 1, append=true)
            {
            if(isLoading) return;
            isLoading = true;
            loading.classList.add('active');
                            const posts = await(fetchPosts(page));
                if(!append) postList.innerHTML =``;
            posts.forEach(post =>{
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML =`
            <h2>${post.title}</h2>
            <p>${post.body}</p>`;

            postList.appendChild(postElement);
                 });
         isLoading = false;
         loading.classList.remove('active');
        prevBtn.disabled = currentPage===1;
        nextBtn.disabled =posts.length < postsPerPage;
    }


         function throttle(func, limit)

        {
            let lastCall = 0;
            return function(...args)
            {
                const now = Date.now();
                if(now - lastCall >= limit)
                {
                    lastCall = now;
                    return func(this, args);
                }
                
            }
        }

        function handleScroll()
        {
            if(mode!=='infinite' || isLoading)return;
            const {scrollTop, scrollHeight, clientHeight}  = document.documentElement;
            if(scrollTop + clientHeight >= scrollHeight  -5)
            {
                currentPage++;
                renderPosts(currentPage);
            }
        }

        const throttledHandleScroll  = throttle(handleScroll, 200)


        function handlePrev() {
         if (currentPage > 1) {
          currentPage--;
         renderPosts(currentPage, false);
        }
        }

    function handleNext() {
    currentPage++;
    renderPosts(currentPage, false);
    }

    function setMode(newMode)
    {
        mode  = newMode;
        localStorage.setItem('scrollMode', mode)
        currentPage = 1;
        postList.innerHTML =``;

        if(mode === 'pagination')
            {
                infiniteScrollBtn.classList.remove('active');
             paginationBtn.classList.add('active');
             paginationControls.style.display = 'flex';
                window.removeEventListener('scroll', throttledHandleScroll);
                renderPosts(currentPage, false);

                    }

            else{
              infiniteScrollBtn.classList.add('active');
                paginationBtn.classList.remove('active');
                paginationControls.style.display = 'none';
                window.addEventListener('scroll', throttledHandleScroll);
                renderPosts(currentPage);
         }

        }


        infiniteScrollBtn.addEventListener('click', ()=> setMode('infinite'));
        paginationBtn.addEventListener('click', ()=> setMode('pagination'));
        prevBtn.addEventListener('click', handlePrev);
        nextBtn.addEventListener('click', handleNext);

        window.addEventListener('scroll', throttledHandleScroll);
        renderPosts(currentPage);

        });

