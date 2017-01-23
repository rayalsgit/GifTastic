document.addEventListener('DOMContentLoaded', function() {

    // declare an array to store animal types
    var animals = ["cat", "dog", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "cincilla",
        "hedgehog", "hermitcrab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"
    ];

    //animal button click handler to fetch gifs and load them onto screen with necessary data-attribs
    function btnHandler() {
        // get animal name from buttton
        var ans = this.innerHTML;

        // url to fetch gifs using animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            ans + "&api_key=dc6zaTOxFJmzC&limit=10";

        // using plain js and ajax to get the gifs
        var xhttp, results, i;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // if ajax call was successful
            if (this.readyState == 4 && this.status == 200) {
                // get image div
                var imagesdiv = document.getElementById("img_div");

                //clear images div
                while (imagesdiv.hasChildNodes())
                    imagesdiv.removeChild(imagesdiv.lastChild);

                // get images array
                results = JSON.parse(this.responseText).data;

                // loop thru each image
                for (i = 0; i < results.length; i++) {
                    //create a parent div to store img and rating
                    var gifdiv = document.createElement("DIV");
                    gifdiv.setAttribute("class", "gdiv");

                    // get rating for img
                    var rating = results[i].rating;
                    // create <p> to show rating
                    var p = document.createElement("P");
                    p.innerHTML = "Rating: " + rating.toUpperCase();
                    // add to parent div
                    gifdiv.appendChild(p);

                    // create an img elemt to show the gif 
                    var img = document.createElement("IMG");
                    // setting src
                    img.setAttribute("src", results[i].images.fixed_width.url);
                    // data attrib to save states- still or animated
                    img.setAttribute("data-state", "animate");
                    //store img srcs for still and animated pics in the data attribs.
                    img.setAttribute("data-animate", results[i].images.fixed_width.url);
                    img.setAttribute("data-still", results[i].images.fixed_width_still.url);
                    // add handler for img click to simulate pause/start
                    img.addEventListener("click", imgHandler);
                    // add rating and image to parent div
                    gifdiv.appendChild(img);
                    imagesdiv.appendChild(gifdiv);

                }

            }

        };
        // make ajax call
        xhttp.open("GET", queryURL, true);
        xhttp.send();
        // prevent bubbling
        return false;

    };

    // handler for image click to pause or restart gif
    function imgHandler() {
        // get current state of image
        var state = this.getAttribute("data-state");
        // if it is still make it animated
        if (state === "still") {
            this.setAttribute("data-state", "animate");
            var animSrc = this.getAttribute("data-animate");
            this.setAttribute("src", animSrc);
        } else // make it still
        {
            this.setAttribute("data-state", "still");
            var stillSrc = this.getAttribute("data-still");
            this.setAttribute("src", stillSrc);
        }
        // prevent bubbling
        return false;
    };

    //logic to add a button for each animal in the array
    function addButtons() {
        //get buttons div 
        var btnsdiv = document.getElementById("animal_btns");
        // clear  all buttons on it.
        while (btnsdiv.hasChildNodes())
            btnsdiv.removeChild(btnsdiv.lastChild);

        // add a new button for each animal in array
        for (var i = 0; i < animals.length; i++) {
            var btn = document.createElement("BUTTON");
            btn.innerHTML = animals[i];
            btn.setAttribute("class", "btn btn-default animBtn");
            // attach click event
            btn.addEventListener("click", btnHandler);
            // add to parent div            
            btnsdiv.appendChild(btn);

        }
    };

    //attach event handler for the submit button on form
    document.getElementById("btnSubmit").addEventListener("click", function() {

        //get new animal name from text input
        var newAnimal = document.getElementById("newAnimal").value.trim();
        // clear the input field
        document.getElementById("newAnimal").value = "";
        // add to animals array
        animals.push(newAnimal);
        // add buttons for new animal
        addButtons();
        // prevent bubbling
        return false;

    });

    // on document load, add the default animal buttons
    addButtons();

});
