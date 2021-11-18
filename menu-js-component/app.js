// To Do 
// How to make sure the dropdown stays open when mose moved out from the main and hovers the dropdown

// hide dropdown if neither the main li nor the dropdown is hovered

const mainMenu = document.getElementById("main-menu");
let positionObj = {};
let mainMenuLink;
let subMenu;
let hoverMask = document.getElementById("hover-mask");

let mainLinkHovered = false;
let dropDownHovered = false;


const displayDropdown = function(e) {
    // if a submenu has been opened previously, close it
    if (subMenu) {
        subMenu.style.display = "none";
        hoverMask.style.display = "none";
    }
    
    //  toggle hover state indicators
    mainLinkHovered = true;
    dropDownHovered = false;

    // get position of main menu item
    mainMenuLink = e.target;
    if(mainMenuLink && mainMenuLink.nodeName == "A") {
        positionObj.top = e.target.offsetTop;
        positionObj.left = e.target.offsetLeft;
    }
 
    // select and display relevant submenu html element, position it under the main menu item
    subMenu = document.getElementById("submenu-" + mainMenuLink.id);
    subMenu.style.display = "block";
    subMenu.style.left = (positionObj.left - 26) + "px";
    hoverMask.style.display = "block";

    // run events on submenu and hovered main link after they are defined
    runSubMenuEvents();
    runMouseLeaveEvents();  
}

const hoverDropDown = function(e) {
    dropDownHovered = true;
}

const unhoverDropDown = function(e) {
    dropDownHovered = false;
    subMenu.style.display = "none";
    hoverMask.style.display = "none";
}

const unhoverMainLink = function () {
    mainLinkHovered = false;  
}

const runSubMenuEvents = function () {
    subMenu.addEventListener("mouseover", hoverDropDown);
    subMenu.addEventListener("mouseleave", unhoverDropDown);
}

const runMouseLeaveEvents = function () {
    mainMenuLink.addEventListener("mouseleave", unhoverMainLink);
}

// Call displayDropdown function on Top Menu Bar
mainMenu.addEventListener("mouseover", displayDropdown);

