'use strict';

const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author, .list.authors li',
    tagsListSelector: '.tags.list',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
    authorsListSelector: '.list.authors',
};

// const optArticleSelector = '.post',
//     optTitleSelector = '.post-title',
//     optTitleListSelector = '.titles',
//     optArticleTagsSelector = '.post-tags .list',
//     optArticleAuthorSelector = '.post-author, .list.authors li',
//     optTagsListSelector = '.tags.list',
//     optCloudClassCount = 5,
//     optCloudClassPrefix = 'tag-size-',
//     optAuthorsListSelector = '.list.authors';
// optAuthorsInListSelector = '.list.authors li';


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
    const titlesList = document.querySelector(opt.titleListSelector);
    titlesList.innerHTML ='';

    /* [DONE] for each article */
    const articles = [...document.querySelectorAll(opt.articleSelector + customSelector)];

    articles.forEach(article => {

        /* [DONE] get the article id */
        const articleId = article.id;

        /* [DONE] find the title element */
        const title =  article.querySelector(opt.titleSelector);

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

function calculateTagsParams(tags) {
    const tagsValueArray = Object.values(tags);
    const params = {
        max: Math.max(...tagsValueArray),
        min: Math.min(...tagsValueArray),
    };

    return params;
}

function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opt.cloudClassCount - 1) + 1 );

    // console.log('count: ', count);
    // console.log('normalizedCount: ', normalizedCount);
    // console.log('normalizedMax: ', normalizedMax);
    // console.log('percentage: ', percentage);
    // console.log('classNumber: ', classNumber);

    return opt.CloudClassPrefix + classNumber;
}

function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = [...document.querySelectorAll(opt.articleSelector)];

    /* START LOOP: for every article: */
    articles.forEach(article => {
        /* find tags wrapper */
        const tagsList = article.querySelector(opt.articleTagsSelector);

        /* make html variable with empty string */
        tagsList.innerHTML = '';

        /* get tags from data-tags attribute */
        const articleDataTags = article.dataset['tags'];

        /* split tags into array */
        const articleTagsArray = articleDataTags.split(' ');

        /* START LOOP: for each tag */
        for(let dataTag of articleTagsArray) {
            /* generate HTML of the link */
            const linkHTML = document.createElement('a');
            linkHTML.setAttribute('href', `#tag-${dataTag}`);

            /* add generated code to html variable */
            linkHTML.textContent = dataTag;

            const listItem = document.createElement('li');
            listItem.appendChild(linkHTML);

            /* [NEW] check if this link is NOT already in allTags */
            if(!allTags.hasOwnProperty(dataTag)) {
                /* [NEW] add tag to allTags object */
                allTags[dataTag] = 1;
            } else {
                allTags[dataTag]++;
            }

            /* insert HTML of all the links into the tags wrapper */
            tagsList.insertAdjacentElement('beforeend', listItem);

            /* END LOOP: for each tag */
        }
    });
    /* END LOOP: for every article: */

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opt.tagsListSelector);
    const tagsParams = calculateTagsParams(allTags);

    let allTagsHtml ='';

    for(let tag in allTags) {
        const tagLinkHtml = `<li><a class="${calculateTagClass(allTags[tag], tagsParams)}" href="#tag-${tag}">${tag}</a></li>`;
        // console.log(allTags[tag]);
        allTagsHtml += tagLinkHtml;
    }

    tagList.insertAdjacentHTML('beforeend', allTagsHtml);
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
    // * find all articles
    const articles = document.querySelectorAll(opt.articleSelector);

    const authors = [];

    // * START LOOP: for each articles
    articles.forEach(article => {
        // * get data-author from articles
        const author = article.dataset['author'];

        if(!authors.includes(author)) {
            authors.push(author);
        }

        //  * find author in article
        const autorElement = article.querySelector(opt.articleAuthorSelector);

        // * add author txt to element
        autorElement.innerHTML = `<a href="#">${author}</a>`;
    });
    //  * END LOOP

    // * find author list
    const authorsList = document.querySelector(opt.authorsListSelector);

    //  * START LOOP: for each authors
    authors.forEach(author => {
        //  * create author html element
        const authorHTML = `<li><a href="#">${author}</a></li>`;

        //  * add author element to list
        authorsList.insertAdjacentHTML('beforeend', authorHTML);
    });
}

generateAuthors();

function authorClickHandler(event) {
    event.preventDefault();
    console.log(this);
    const clickedElement = this;
    const author = clickedElement.textContent;
    const selector = `[data-author="${author}"]`;

    generateTitleLinks(selector);
}

function addClickListenersToAuthors() {
    const authors = [...document.querySelectorAll(opt.articleAuthorSelector)];

    authors.forEach(author => {
        author.addEventListener('click', authorClickHandler);
    });
}

addClickListenersToAuthors();