'use strict';

// put your own value below!
const apiKey = '5tcZc0IjvHd315xZuc3tRWF02xpcFWslbOcgTmca'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length & i < maxResults; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].fullName}</a></h3>
      <p>${responseJson.data[i].description}</p>
      <img src='${responseJson.data[i].images[0].url}' alt='${responseJson.data[i].images[0].title}' width="200">
      </li><hr>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(query, stateCode='', maxResults=10) {
  const params = {
    q: query,
    stateCode: stateCode,
    integer: maxResults,
    api_key: apiKey,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const stateCode = $('#js-park-state').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, stateCode, maxResults);
  });
}

$(watchForm);