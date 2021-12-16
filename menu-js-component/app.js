const mainMenu = document.getElementById("main-menu");
let mainMenuLink;
let dropdown;
let dropdownLink;
let slideout;
let hoverMask = document.getElementById("hover-mask");

const displaySubmenus = e => {
    let mainLinkPosition = {};

    // get position of main menu item
    mainMenuLink = e.target;
    if(mainMenuLink && mainMenuLink.nodeName == "A") {
        // if a dropdown - and slideout - have been opened previously, close them when a new mainMenuLink is hovered
        closeAllSubmenus();

        mainLinkPosition.top = e.target.offsetTop;
        mainLinkPosition.left = e.target.offsetLeft;
        
        // select and display relevant dropdown html element, position it under the main menu item
        dropdown = document.getElementById("submenu-" + mainMenuLink.id);
        if(dropdown) {
            dropdown.style.display = "block";
            dropdown.style.left = (mainLinkPosition.left - 26) + "px";
            hoverMask.style.display = "block";
        }
    }

    // call event on dropdown links if dropdown exists
    if(dropdown) {
        dropdown.addEventListener("mouseover", event => {
            let dropdownPosition = {};
            dropdownLink = event.target;
            // if a slideout has been opened previously, close it when a new dropdownLink is hovered
            if(dropdownLink && dropdownLink.nodeName == "A") {
                if (slideout) {
                    slideout.style.display = "none";
                }
                dropdownPosition.top = e.target.offsetTop;
                dropdownPosition.left = e.target.offsetLeft;

                // select and display relevant slideout html element, position it next to the dropdown menu
                slideout = document.getElementById("submenu-" + dropdownLink.id);
                if (slideout) {
                    slideout.style.display = "block";
                    slideout.style.left = (dropdownPosition.left + 234) + "px";
                    slideout.style.top = (dropdownPosition.top + 18) + "px";
                    hoverMask.style.display = "block";
                    slideout.addEventListener("mouseover", keepDropdownDisplayed);
                }   
            }
        });
    }
}

const keepDropdownDisplayed = () => {
    dropdown.style.display = "block";
    hoverMask.style.display = "block";
}

const closeAllSubmenus = () => {
    if (dropdown) {
        dropdown.style.display = "none";
        if (slideout) {
            slideout.style.display = "none";
        }
        hoverMask.style.display = "none";
    }
}

// Call displaySubmenus function on Top Menu Bar
mainMenu.addEventListener("mouseover", displaySubmenus);

// if hover leaves any of the submenus, hide all dropdowns and slideouts
hoverMask.addEventListener("mouseover", closeAllSubmenus);
