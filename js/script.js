'use strict';

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const clickedElementAttribute = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const article = document.querySelector(clickedElementAttribute);

    /* [DONE] add class 'active' to the correct article */
    article.classList.add('active');

}

function generateTitleLinks(customSelector = ''){

    /* [DONE] remove contents of titleList */
    const titlesList = document.querySelector(optTitleListSelector);
    titlesList.innerHTML ='';

    /* [DONE] for each article */
    const articles = [...document.querySelectorAll(optArticleSelector + customSelector)];
    console.log(optArticleSelector + customSelector);

    articles.forEach(article => {

        /* [DONE] get the article id */
        const articleId = article.id;

        /* [DONE] find the title element */
        const title =  article.querySelector(optTitleSelector);

        /* [DONE] get the title from the title element */
        const titleInnerText = title.textContent;

        /* [DONE] create HTML of the link */
        const linkHTML = `<li><a href="#${articleId}"><span>${titleInnerText}</span></a></li>`;

        /* [DONE] insert link into titleList */
        titlesList.insertAdjacentHTML('beforeend', linkHTML);
    });

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();

function generateTags(){
    /* find all articles */
    const articles = [...document.querySelectorAll(optArticleSelector)];

    /* START LOOP: for every article: */
    articles.forEach(article => {
        /* find tags wrapper */
        const tagsList = article.querySelector(optArticleTagsSelector);

        /* make html variable with empty string */
        tagsList.innerHTML = '';

        /* get tags from data-tags attribute */
        const articleDataTags = article.dataset['tags'];

        /* split tags into array */
        const articleTagsArray = articleDataTags.split(' ');

        /* START LOOP: for each tag */
        for(let dataTag of articleTagsArray) {
            /* generate HTML of the link */
            const link = document.createElement('a');
            link.setAttribute('href', `#tag-${dataTag}`);

            /* add generated code to html variable */
            link.textContent = dataTag;

            const listItem = document.createElement('li');
            listItem.appendChild(link);

            /* insert HTML of all the links into the tags wrapper */
            tagsList.insertAdjacentElement('beforeend', listItem);
        }
    });
}

generateTags();

function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeLinks = [...document.querySelectorAll('a.active')];

    /* START LOOP: for each active tag link */
    activeLinks.forEach(activeLink => {
        /* remove class active */
        activeLink.classList.remove('active');
        /* END LOOP: for each active tag link */
    });

    /* find all tag links with "href" attribute equal to the "href" constant */
    const links = document.querySelectorAll(`a[href="${href}"]`);

    /* START LOOP: for each found tag link */
    links.forEach(link => {
        /* add class active */
        link.classList.add('active');
        /* END LOOP: for each found tag link */
    });

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-tags~="${tag}"]`);
}

function addClickListenersToTags(){
    /* find all links to tags */
    const links = [...document.querySelectorAll('a[href^="#tag-"]')];

    /* START LOOP: for each link */
    links.forEach(link => {
        /* add tagClickHandler as event listener for that link */
        link.addEventListener('click', tagClickHandler);
    });
}

addClickListenersToTags();

function generateAuthors() {
    const articles = document.querySelectorAll(optArticleSelector);

    articles.forEach(article => {
        const author = article.dataset['author'];
        const autorElement = article.querySelector(optArticleAuthorSelector);

        autorElement.innerHTML = `<a href="#">${author}</a>`;
    });
}

generateAuthors();

function authorClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;
    const author = clickedElement.textContent;
    const selector = `[data-author="${author}"]`;

    generateTitleLinks(selector);
}

function addClickListenersToAuthors() {
    const authors = document.querySelectorAll(optArticleAuthorSelector);

    authors.forEach(author => {
        author.addEventListener('click', authorClickHandler);
    });
}

addClickListenersToAuthors();