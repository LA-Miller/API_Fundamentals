const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; //URL to the API
const key = 'U2RkvXmbPiuJ4ffKM0K5VIicbTfLJJ1H'; // allows us to have access to the API
let url; // declaring url as variable

// SEARCH FORM
const searchTerm = document.querySelector('.search'); //pulling the search class from the HTML and assigning it to a variable
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form'); // tag
const submitBtn = document.querySelector('.submit');

// RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

nav.style.display = 'none';

let pageNumber = 0; //declares variable and assigns a value
// console.log('PageNumber:', pageNumber);
let displayNav = false; // declares variable: false

//RESULTS SECTION
const section = document.querySelector('section');



searchForm.addEventListener('submit', fetchResults); //gets results when the submit button is clicked
nextBtn.addEventListener('click', nextPage); // runs nextPage function when nextBtn is clicked
previousBtn.addEventListener('click', previousPage); //runs previousPage function when previousBtn is clicked

// function to fetch our results
function fetchResults(e) {
    // console.log(e);
    e.preventDefault(); //stops the submit action so the data stays in our console instead of refreshing the page

    url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}`; //! creating a url ?
    // console.log('URL:', url);

    // if there is a start date inputted
    if (startDate.value !== '') {
        // console.log(startDate.value)
        url += '&begin_date=' + startDate.value; //changes our url to include a start date
        // console.log('URL:', url);
    }

    // if there is an end date inputted
    if (endDate.value !== '') {
        // console.log(endDate.value)
        url += '&end_date=' + endDate.value; //changes our url to include an end date
        // console.log('URL:', url);
    }

    // promise
    // if url is fetched
    fetch(url)
        .then(function (result) { //perform result function
            console.log(result)
            return result.json(); //returns result in json form
        })
        .then(function (json) { //runs json function if first .then is successful
            console.log(json);
            displayResults(json); //runs result function with json as its parameter
        })
}

// function that displays results from the json 
function displayResults(json) {
    console.log('Display Results', json); //logs our json to the console
    // console.log(json.response.docs);

    // gets rid of our results when we do a different search so the results don't pile up on each other
    while (section.firstChild) { // ! while section has a first child
        section.removeChild(section.firstChild); //removes existing child
    }

    let articles = json.response.docs; // declares articles variable as an array and navigates the json object w/ .notation
    // console.log(articles);

    // if the articles array is empty
    if (articles.length === 0) {
        console.log('No results'); //logs 'no results'
    } else { //if it is filled
        for (let i = 0; i < articles.length; i++) { //loops through each part of the articles array
            // console.log(i);
            // creates variables and gives the variables an HTML element
            let article = document.createElement('article');
            let heading = document.createElement('h2');
            let link = document.createElement('a');
            let img = document.createElement('img');
            let para = document.createElement('p');
            let clearfix = document.createElement('div');

            // assigns current with whatever part of the articles array the loop is on
            let current = articles[i];
            console.log('Current:', current);


            link.href = current.web_url; // link = anchor tag we declared earlier, href returns the url of each index of the articles object by getting into the web_url key
            link.textContent = current.headline.main; // assigns the text in our link to the words that are in current.headline.main

            para.textContent = 'Keywords: '; // if there are keywords, displays them in a <p> tag

            // loops through each index in current.keywords
            for (let j = 0; j < current.keywords.length; j++) {
                // span is like a div,a but is an inline container and div is a block-level container
                let span = document.createElement('span'); // creates a span element and assigns span to it
                //!what is textContent
                span.textContent += current.keywords[j].value + ' '; // takes the value from the value key in current.keywords and assigns it to the span
                para.appendChild(span); //adds the keyword to the end of the para tag
            }

            //if there is something in the multimedia array
            if (current.multimedia.length > 0) {
                img.src = 'http://www.nytimes.com/' + current.multimedia[0].url; //finds the url of the image 
                img.alt = current.headline.main; //if the image doesn't show up, it will show the headline instead
            }

            clearfix.setAttribute('class', 'clearfix'); // creates a div with a class of clearfix

            heading.appendChild(link); // appends all the variables
            article.appendChild(heading);
            article.appendChild(img);
            article.appendChild(para);
            article.appendChild(clearfix);
            section.appendChild(article);
        }
    }

    if (articles.length === 10) {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }
}

// let maxPage = (articles.length / 10) + 1;
// when nextPage button is clicked, this function runs
function nextPage(e) {
    if (pageNumber < maxPage) {
        // console.log('Next button clicked');
        pageNumber++; //goes to next page
    } else {
        return;
    }

    fetchResults(e); //fetches results for next page
    console.log('Page Number:', pageNumber); //console logs the page number
}

// when previousPage button is clicked this function runs
function previousPage(e) {
    // console.log('Previous button clicked');
    if (pageNumber > 0) { //if PageNumber is greater than 0
        pageNumber--; //goes to previous page
    } else { // doesn't work if on page 0
        return;
    }

    fetchResults(e); //fetches results of the new page
    console.log('Page:', pageNumber); //console logs the page number
}