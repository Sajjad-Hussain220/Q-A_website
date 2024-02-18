window.onscroll = function() {
    // Get the navbar element
    var navbar = document.getElementById("nave_button");

    // Get the button element
    var searchButton = document.querySelector(".serach_nav");

    // Check if the user has scrolled down enough to make the navbar sticky
    if (window.pageYOffset >= navbar.offsetTop) {
        // If scrolled down, display the search button
        searchButton.style.display = "inline-block";
    } else {
        // If at the top, hide the search button
        searchButton.style.display = "none";
    }
};

// Handle window resize for responsiveness
window.onresize = function() {
    var searchButton = document.querySelector(".serach_nav");

    // Display the search button if the window width is greater than a certain threshold (e.g., 600px)
    if (window.innerWidth > 600) {
        searchButton.style.display = "inline-block";
    } else {
        searchButton.style.display = "none";
    }
};



