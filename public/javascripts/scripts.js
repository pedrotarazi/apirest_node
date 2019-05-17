const app = document.getElementById('root');
const logo = document.createElement('img');
logo.src = '../images/logo.png';

const container = document.createElement('div');
container.id = 'container1'

//container.setAttribute('class', 'container');
app.appendChild(logo);
app.appendChild(container);

const select_site = document.createElement('select');
select_site.id = 'select_site'
const select_category = document.createElement('select');
select_category.id = 'select_category'

var request = new XMLHttpRequest();
request.open('GET', 'https://api.mercadolibre.com/sites', true);
request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);


    if (request.status >= 200 && request.status < 400) {
        data.forEach(site => {
            //const card = document.createElement('div');
            //if (site.id != 'MPT' && site.id != 'MCU') {
                var option = document.createElement('option');
                option.value = site.id;
                option.text = site.name;
                select_site.appendChild(option);
        });

        select_site.onchange = function () {
                    get_category(select_site.value);
                }

        select_site.onchange = function () {
            get_trends(select_site.value);
        }

        container.appendChild(select_site)
        container.appendChild(select_category)
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = "No funciona!";
        app.appendChild(errorMessage);
    }
}

request.send();

function get_category(site_id) {
    var cat = new window.XMLHttpRequest();
    var select = document.getElementById('select_category')
    cat.open('GET', 'https://api.mercadolibre.com/sites/'+site_id, true);
    cat.onload = function() {
        // Begin accessing JSON data here
        var datac = JSON.parse(this.response);

        var option_sin = document.createElement('option');
        option_sin.value = "";
        option_sin.text = "";
        select.appendChild(option_sin);

        datac.categories.forEach(category => {
            var option = document.createElement('option');
            option.value = category.id;
            option.text = category.name;
            select.appendChild(option)
            /*select.onchange = function () {
                get_trends()
            }*/
        });
        var cont = document.getElementById('container1')
        cont.appendChild(select)
    };
    cat.send()
    return
}

function get_trends(site_id) {
    var trends = new window.XMLHttpRequest();
    var div = document.createElement('div')
    trends.open('GET', 'https://api.mercadolibre.com/trends/'+site_id, true);
    trends.onload = function() {
        // Begin accessing JSON data here
        var datatrends = JSON.parse(this.response);
        //if (request.status >= 200 && request.status < 400) {
        datatrends.forEach(trend => {
            var p = document.createElement('p');
            p.textContent = trend.keyword;
            div.appendChild(p)
        });
        var cont = document.getElementById('container1')
        cont.appendChild(div)
    };
    trends.send()
    return
}
