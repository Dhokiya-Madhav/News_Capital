
let region;
let category;
let language;
let q = 0;
// Cateogry Section Start
document.getElementById("footer").classList.remove('fixed-bottom');
function datalistFunction() {
    category = document.getElementById("exampleDataList").value;
    if (category == "") {
        category = "BreakingNews";
        document.getElementById("exampleDataList").value = category;
    }

    category = category.toLowerCase();
    provideDisplayProperty(category);
    return true;

}

function provideDisplayProperty(category) {
    var count = 0;
    let cat = ['breakingnews', 'world', 'nation', 'business', 'entertainment', 'health', 'science', 'sports', 'technology', 'custom'];
    cat.forEach(element => {
        if (element.localeCompare(category) == 0) {

            document.getElementById(element).classList.remove('d-none');
        }
        else {
            count++;
            document.getElementById(element).classList.add('d-none');
        }
    });
    if (count == cat.length) {
        q = 1;
        document.getElementById('custom_topic').innerHTML = `${category}&nbsp;<span class="badge badge-success">NEW</span>`;
        document.getElementById('custom').classList.remove('d-none');
    }
    getnews();
}
// Category Section End

// Loading Languages Section Start
let l = ['Arabic', 'German', 'Greek', 'English', 'Spanish', 'French', 'Hebrew', 'Hindi', 'Italian', 'Japanese', 'Malyalam', 'Marathi', 'Dutch', 'Norwegian', 'Protuguese', 'Romanian', 'Russian', 'Swedish', 'Tamil', 'Telugu', 'Ukrainian', 'Chinese'];
let lang_id = ['ar', 'de', 'el', 'en', 'es', 'fr', 'he', 'hi', 'it', 'ja', 'ml', 'mr', 'nl', 'no', 'pt', 'ro', 'ru', 'sv', 'ta', 'te', 'uk', 'zh'];
i = 0;
l.forEach(element => {
    if (element.localeCompare("English") == 0) {
        lan_input = `<br><input type="radio" class="mt-3" name="lang" value="${element}" id="${lang_id[i]}" checked>
    <label style="font-size: 17px;" for="${lang_id[i]}">${element}</label>`;
    }
    else {
        lan_input = `<br><input type="radio" class="mt-3" name="lang" value="${element}" id="${lang_id[i]}">
    <label style="font-size: 17px;" for="${lang_id[i]}">${element}</label>`;
    }
    document.getElementById('display_lang').innerHTML += lan_input;
    i++;
});

// Loading Langauges Section End

// Change Language Section Start
function changelanguage() {
    lang_id.forEach(element => {
        checkele = document.getElementById(element);
        if (checkele.checked) {
            language = element;
            getnews();
        }
    });
}
// Change Language Section End

// Loading Content to generate Country Name:
let c = ['Australia', 'Brazil', 'Canada', 'Switzerland', 'China', 'Germany', 'Egypt', 'Spain', 'France', 'United Kingdom', 'Greece', 'Hong Kong', 'Ireland', 'Israel', 'India', 'Italy', 'Japan', 'Netherland', 'Norway', 'Peru', 'Phillippines', 'Pakistan', 'Portugal', 'Romania', 'Russian Federaion', 'Sweden', 'Singapore', 'Taiwan', 'Ukraine', 'United States'];

let cc = ['au', 'br', 'ca', 'ch', 'cn', 'de', 'eg', 'es', 'fr', 'gb', 'gr', 'hk', 'ie', 'il', 'in', 'it', 'jp', 'nl', 'no', 'pe', 'ph', 'pk', 'pt', 'ro', 'ru', 'se', 'sg', 'tw', 'ua', 'us'];
let s = document.getElementById('inputGroupSelect01');
i = 0;
c.forEach(element => {
    const string = document.createElement('option');
    string.value = cc[i];
    i++;
    const text = document.createTextNode(element);
    string.appendChild(text);
    s.appendChild(string);
});
// End Loading Content to generate Country Name

// Country Section Start
function countrySelected() {
    region = document.getElementById('inputGroupSelect01').value;
    getnews();
}
// Country Section End

// API Request Start
function getnews() {
    let apikey = "15c25390013b589046b1ff0d398bb513";

    let language_getnews = language;
    let category_getnews = category;
    let region_getnews = region;
    let url = `https://gnews.io/api/v4/top-headlines?token=${apikey}`;

    language_getnews = (typeof language_getnews !== 'undefined' ? language_getnews : "en")
    region_getnews = (typeof region_getnews !== 'undefined' ? region_getnews : "")

    if (q == 0) {
        category_getnews = (typeof category_getnews !== 'undefined' ? category_getnews : "")
        url = `https://gnews.io/api/v4/top-headlines?token=${apikey}&lang=${language_getnews}&country=${region_getnews}&topic=${category_getnews}`;
    }
    else {
        category_getnews = (typeof category_getnews !== 'undefined' ? category_getnews : "");
        url = `https://gnews.io/api/v4/top-headlines?token=${apikey}&lang=${language_getnews}&country=${region_getnews}&q=${category_getnews}`;
    }
    console.log("url: " + url);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let articles = json.articles;
            let newhtml = "";
            articles.forEach(element => {
                let time = new Date(element['publishedAt']);
                time = time.toLocaleString();
                let news = `<div class="card col-12 my-3 p-0">
                            <div class="row no-gutters">
                                <div class="col-lg-2 col-md-6 col-sm-12">
                                    <img src="${element['image']}" class="card-img img-fluid img-thumbnail h-100" alt="Error Processing Image">
                                </div>
                                <div class="col-lg-10 col-md-6 col-sm-12">
                                    <div class="card-body">
                                        <h5 class="title h3">${element['title']}</h5>
                                        <p class="card-text" id="content">${element['content']}</p>
                                        <p class="card-text"><small class="text-muted" id="source">${element['source'].name} <a href="${element['source'].url}" target="_blank"> ${element['source'].url}</a></small></p>
                                    </div>
                                    <div class="card-footer row">
                                        <small id="publishedAt" class="text-secondary col-lg col-md col-sm col">${time}</small>
                                        <a href="${element["url"]}" target="_blank" id="url" class="btn btn-outline-primary  col-lg-2 col-md-4 col-sm-6 col-5">Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                        newhtml += news;
                });
                document.getElementById("newsDisplay").innerHTML = newhtml;
                if(newhtml == "")
                {
                    document.getElementById("footer").classList.add('fixed-bottom');
                }
        }
        else {
            console.log("Error");
        }
    };
    xhr.send();
}
getnews();
// API Request End