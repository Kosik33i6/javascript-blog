'use strict';

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

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks(){

    /* [DONE] remove contents of titleList */
    const titlesList = document.querySelector(optTitleListSelector);
    titlesList.innerHTML ='';

    /* [DONE] for each article */
    const articles = [...document.querySelectorAll(optArticleSelector)];

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