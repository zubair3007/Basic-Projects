  document.addEventListener('DOMContentLoaded', () => {

        let currentPage = 1;
    const postsPerPage = 10;
    let isLoading = false;

    // Fetch posts from JSONPlaceholder API
    async function fetchPosts(page) {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postsPerPage}`
        );
        return await response.json();
      } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
      }
    }

    // Fetch comments for a specific post
    async function fetchComments(postId) {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        return await response.json();
      } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
      }
    }

    // Render posts to the DOM
    async function renderPosts(page) {
      isLoading = true;
      document.getElementById('loading').style.display = 'block';
      const posts = await fetchPosts(page);
      const postList = document.getElementById('postList');

      posts.forEach(async post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          <div class="comments" id="comments-${post.id}"></div>
        `;
        postList.appendChild(postElement);

        // Add click event to toggle comments
        postElement.addEventListener('click', async () => {
          const commentsContainer = document.getElementById(`comments-${post.id}`);
          if (commentsContainer.innerHTML === '') {
            const comments = await fetchComments(post.id);
            comments.forEach(comment => {
              const commentElement = document.createElement('div');
              commentElement.className = 'comment';
              commentElement.innerHTML = `
                <strong>${comment.name}</strong> (${comment.email})<br>
                ${comment.body}
              `;
              commentsContainer.appendChild(commentElement);
            });
            commentsContainer.style.display = 'block';
          } else {
            commentsContainer.style.display =
              commentsContainer.style.display === 'block' ? 'none' : 'block';
          }
        });
      });

      isLoading = false;
      document.getElementById('loading').style.display = 'none';
    }

    // Infinite scroll handler
    function handleScroll() {
      if (isLoading) return;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        currentPage++;
        renderPosts(currentPage);
      }
    }

    // Initialize with first page of posts
    renderPosts(currentPage);

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
  })
  
  
  