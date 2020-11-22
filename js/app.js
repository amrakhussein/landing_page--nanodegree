/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
let sections = document.querySelectorAll('section');
let fragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// build dynamic navigation: nav item for every section  
let startNavigation = () => {
    let createLinkElement = (id, navName) => `<a class="menu__link" data-id="${id}">${navName}</a>`
    for (let section of sections) {
        let getSectionId = section.getAttribute("id");
            let getText = section.getAttribute("data-nav");
            // create a new list element
            let newLi = document.createElement("li");
            newLi.innerHTML = createLinkElement(getSectionId, getText);
            console.log("new li", newLi)
            fragment.appendChild(newLi); // appending the new list to fragment for performance
        }
        let ul = document.querySelector("#navbar__list");
    ul.appendChild(fragment);
}


// activating the class when intersecting target area
function observingArea() {
    let options = {
        root: null, // relative to viewport
        threshold:0 ,
        rootMargin: "-400px 0px -400px 0px"
    } 

    let observer = new IntersectionObserver((entries) => {
    for (let entry of entries) {
        let areaIntersecting = entry.isIntersecting
        areaIntersecting ? entry.target.classList.add("active") :
        entry.target.classList.remove("active")
     }
    }, options);


sections.forEach(section => observer.observe(section));

}

// scroll into targeting sections using ID
let scrollIntoSection = e => {
    if (e.target.nodeName === "A") {
        let getSectionId = e.target.getAttribute("data-id");
        const section = document.getElementById(getSectionId);
        section.scrollIntoView({behavior: "smooth"});
    }
}

let ul = document.getElementById("navbar__list");
ul.addEventListener("click", (e) => scrollIntoSection(e));


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// start navigation
startNavigation()

// observe sections
observingArea()