
fetch('./annunci.json')
.then( (response)=> response.json() )
.then( (data)=>{
    

// elementi catturati
let radiowrapper = document.querySelector('#radiowrapper');
let cardswrapper = document.querySelector('#cardswrapper');


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

    console.log(uniqueCategories);
}
setRadios()


// funzione showcards


    function showCards() {
        data.forEach((annuncio)=>{
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
                                <i class="fa-solid fa-cart-shopping"></i>
                            </div>
                        </div>
                        </div>
            `
            cardswrapper.appendChild(div)
        })
    }
showCards()

let prova = data[22].img[0].url;

console.log(prova);

})