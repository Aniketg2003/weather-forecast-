// Your NewsAPI API key
const apiKey = '5c9180119fdb4204bf2cd3e6f0ecf325';  // Replace with your actual API key

// Function to fetch top headlines from NewsAPI
function getWeatherNews() {
  const url = `https://newsapi.org/v2/everything?q=weather&apiKey=${apiKey}`;

  // Clear previous articles and error message
  const newsResult = document.getElementById('news-result');
  const errorMessage = document.getElementById('error-message');
  newsResult.innerHTML = '';
  errorMessage.textContent = '';

  // Fetch news data from the NewsAPI
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok' && data.articles.length > 0) {
        // Display the articles
        data.articles.forEach(article => {
          const articleDiv = document.createElement('div');
          articleDiv.classList.add('article');

          const articleTitle = document.createElement('h3');
          articleTitle.textContent = article.title;

          const articleDescription = document.createElement('p');
          articleDescription.textContent = article.description;

          const articleLink = document.createElement('a');
          articleLink.href = article.url;
          articleLink.textContent = 'Read more...';
          articleLink.target = '_blank'; // Open link in a new tab

          articleDiv.appendChild(articleTitle);
          articleDiv.appendChild(articleDescription);
          articleDiv.appendChild(articleLink);

          newsResult.appendChild(articleDiv);
        });
      } else {
        errorMessage.textContent = 'No weather news found or an error occurred.';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      errorMessage.textContent = 'An error occurred. Please try again later.';
    });
}

// Call getWeatherNews to load weather-related news articles when the page loads
window.onload = getWeatherNews;