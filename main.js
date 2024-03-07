
fetch('./annunci.json')
.then( (response)=> response.json() )
.then( (data)=>{
    

// elementi catturati
let radiowrapper = document.querySelector('#radiowrapper');
let cardswrapper = document.querySelector('#cardswrapper');
let inputMinPrice = document.querySelector('#inputMinPrice');
let inputMaxPrice = document.querySelector('#inputMaxPrice');
let applyPrice = document.querySelector('#applyPrice');
let checkboxbrands = document.querySelector('#checkboxbrands');
let shop = document.querySelectorAll('#shop');




// funzione setradios


function setRadios() {
    let categories = data.map((annuncio)=> annuncio.category)

    let uniqueCategories = Array.from(new Set(categories));

    uniqueCategories.forEach( (el) =>{
        let div= document.createElement('div');
        div.classList.add('form-check', 'p-0')
        div.innerHTML = `
        <input class="form-check-input" type="radio" name="categories" id="${el}">
        <label class="form-check-label" for="${el}">
          ${el}
        </label>
        `
        radiowrapper.appendChild(div)
    })

}
setRadios()
let radios = document.querySelectorAll('.form-check-input');
// console.log(radios);

// funzione showcards


    function showCards(array) {

        cardswrapper.innerHTML='';
        array.forEach((annuncio)=>{
            let div=document.createElement('div')
            div.classList.add('col-md-3', 'col-12', 'mx-3', 'mb-2');
            div.innerHTML=`
            <div class="card" >
            <div class="card-body d-flex justify-content-between align-items-center py-1">
                            <p class="card-text fw-semibold m-2"> € ${annuncio.price} </p>
                            <i class="fa-regular fa-heart"></i>
                        </div>
                        <img src="${annuncio.img[0].url}" class="imgSize" alt="...">
                        <div class="card-body d-flex justify-content-between">
                            <div class="col-8">
                                <h6 class="card-text fw-semibold">${annuncio.brand}</h6>
                                <h6>${annuncio.name}</h6>

                            </div>
                            <div class="col-1">
                                <i id='shop' class="fa-solid fa-cart-shopping"></i>
                            </div>
                        </div>
                        </div>
            `
            cardswrapper.appendChild(div)
            // cardswrapper.innerHTML += div;
        })
        // console.log(cardswrapper);
    }
showCards(data)


// funzione filterbycategory

function filterByCategory(array){
        
    let checked = Array.from(radios).find( (button)=> button.checked);
    // console.log(checked);
    let categoria = checked.id


    if (categoria == 'all') {
        return array

    }else{
        let filtered = array.filter( (annuncio)=> annuncio.category == categoria);
        return filtered
        
    }
    

}


// evento click sui radios

radios.forEach((button)=>{
    button.addEventListener('click', ()=>{
        globalFilter()
    })
})


// funzione setCheckbox + filterByColor

function setCheckbox() {
    let colors = data.map((annuncio)=> annuncio.color)

    let uniqueColors = Array.from(new Set(colors));

    uniqueColors.forEach( (el) =>{
        let div= document.createElement('div');
        div.classList.add('form-check', 'p-0')
        div.innerHTML = `
        <input class="form-check-input ora" type="checkbox" value="${el}" id="flexCheck${el}">
        <label class="form-check-label" for="flexCheck${el}">
            ${el}
        </label>
        `
        checkboxcolors.appendChild(div)
    })

}
setCheckbox()





function filterByColor(array) {
    let checked2 = document.querySelectorAll('.ora:checked');
    let colors = Array.from(checked2).map((checkbox) => checkbox.value);


    if (colors.includes('all')) {
        return array;
    } else {
        let filtered = array.filter((annuncio) => colors.includes(annuncio.color));
        return filtered;
    }
}


document.querySelectorAll('.ora').forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        globalFilter();
    });
});



// funzione setInputPrice

function setInputPrice(array) {
    
    let filtered = array.filter(el => el.price >= +inputMinPrice.value && el.price <= +inputMaxPrice.value);
    

    if (filtered.length == 0 ) {
        cardswrapper.innerHTML= `<p>Nessun prodotto trovato</p>`
    } else{
    showCards(filtered)

    }



}



// evento cattura inputPrice

applyPrice.addEventListener('click', ()=>{
if (inputMinPrice.value != '' && inputMaxPrice.value != '') {
        setInputPrice(data);
    }else if(inputMinPrice.value == '' && inputMaxPrice.value != ''){
        setInputPrice(data);
    }
    else{
        console.log('ciao');
    }
})


// funzione setBrands

function setBrand() {
    let brand = data.map((annuncio)=> annuncio.brand)

    let uniqueBrand = Array.from(new Set(brand));
    

    uniqueBrand.forEach( (el) =>{
        let div= document.createElement('div');
        div.classList.add('form-check', 'p-0')
        div.innerHTML = `
        <input class="form-check-input brand" type="checkbox" value="${el}" id="flexCheck${el}">
        <label class="form-check-label" for="flexCheck${el}">
            ${el}
        </label>
        `
        checkboxbrands.appendChild(div)
    })

}
setBrand()


function filterByBrand(array) {
    let checked3 = document.querySelectorAll('.brand:checked');
    let brands = Array.from(checked3).map((checkbox) => checkbox.value);
    // console.log(brands);



    if (brands.includes('all')) {
        return array;
    } else {
        let filtered = array.filter((annuncio) => brands.includes(annuncio.brand));
        return filtered;
    }
}


document.querySelectorAll('.brand').forEach((checkbox2) => {
    checkbox2.addEventListener('click', () => {
        globalFilter();
    });
});



// filtro globale

function globalFilter() {
    let filteredByCategory = filterByCategory(data);
    let filteredByBrand= filterByBrand(filteredByCategory);
    let filteredByColor = filterByColor(filteredByBrand);
    
    showCards(filteredByColor)
}

globalFilter()







})






let searchBarContainerEl = document.querySelector(".search-bar-container");
let button = document.querySelector(".btnSearch");
let magnifierEl = document.querySelector(".magnifier");


    magnifierEl.addEventListener("click", () => {
        searchBarContainerEl.classList.toggle("start");
        magnifierEl.classList.toggle("fa-magnifying-glass");
        magnifierEl.classList.toggle("fa-xmark");
        button.classList.toggle("d-none");
        setTimeout(function() {
        button.classList.toggle("opacity-0");
        }, 300);
    });