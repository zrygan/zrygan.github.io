document.addEventListener("DOMContentLoaded", function () {
  const blogList = document.getElementById("blog-list");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  let blogPosts = [];
  let currentPosts = [];

  async function fetchBlogPosts() {
    try {
      let allPosts = [];

      for (let i = 1; i <= 9999; i++) {
        const id = i.toString().padStart(4, "0");
        const url = `/pages/blog/zrygan_${id}.html`; // Added .html extension here

        try {
          const response = await fetch(url);
          if (!response.ok) {
            if (i === 1) {
              blogList.innerHTML =
                '<div class="no-results">No knowledge base entries found.</div>';
            }
            break;
          }

          const html = await response.text();

          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");

          const title =
            doc.querySelector(".post-title")?.textContent || `Entry ${id}`;
          const date =
            doc.querySelector(".post-date")?.textContent || "No date";

          const keywordsElement = doc.querySelector(".post-tags");
          const keywords = keywordsElement
            ? keywordsElement.textContent.replace("Keywords:", "").trim()
            : "";

          const firstParagraph =
            doc.querySelector(".content p")?.textContent || "";
          const excerpt = firstParagraph;

          allPosts.push({
            id,
            title,
            date,
            keywords,
            excerpt,
            url: `/pages/blog/zrygan_${id}.html`, // Added .html extension here too
          });
        } catch (error) {
          console.error(`Error fetching entry ${id}:`, error);
          break;
        }
      }

      allPosts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });

      return allPosts;
    } catch (error) {
      console.error("Error fetching knowledge base entries:", error);
      return [];
    }
  }

  function renderBlogPosts(posts) {
    if (posts.length === 0) {
      blogList.innerHTML =
        '<div class="no-results">No knowledge base entries found matching your search.</div>';
      return;
    }

    const html = posts
      .map(
        (post) => `
    <div class="blog-entry">
  <h3 class="blog-title"><a href="${post.url}">${post.title}</a></h3>
  <details class="blog-excerpt">
    <summary>What's this about?</summary>
    <p>${post.excerpt}</p>
  </details>
  <div class="blog-keywords"><em>${post.keywords}</em></div>
</div>
  `
      )
      .join("");

    blogList.innerHTML = html;
  }

  function searchPosts(query) {
    if (!query) {
      currentPosts = [...blogPosts];
      renderBlogPosts(currentPosts);
      return;
    }

    query = query.toLowerCase();

    const filtered = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.keywords.toLowerCase().includes(query) ||
        post.date.toLowerCase().includes(query)
    );

    currentPosts = filtered;
    renderBlogPosts(currentPosts);
  }

  searchButton.addEventListener("click", function () {
    searchPosts(searchInput.value);
  });

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchPosts(searchInput.value);
    }
  });

  (async function init() {
    blogList.innerHTML =
      '<div class="loading">Loading knowledge base entries...</div>';
    blogPosts = await fetchBlogPosts();
    currentPosts = [...blogPosts];
    renderBlogPosts(currentPosts);
  })();
});
