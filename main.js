
fetch('./annunci.json')
    .then((response) => response.json())
    .then((data) => {


        // elementi catturati
        let radiowrapper = document.querySelector('#radiowrapper');
        let cardswrapper = document.querySelector('#cardswrapper');
        let inputMinPrice = document.querySelector('#inputMinPrice');
        let inputMaxPrice = document.querySelector('#inputMaxPrice');
        let applyPrice = document.querySelector('#applyPrice');
        let checkboxbrands = document.querySelector('#checkboxbrands');
        let subtotale = document.querySelector('.subtotale');
        let imgnew;







        // funzione setradios


        function setRadios() {
            let categories = data.map((annuncio) => annuncio.category)

            let uniqueCategories = Array.from(new Set(categories));

            uniqueCategories.forEach((el) => {
                let div = document.createElement('div');
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

        let prova = 0;



        function showCards(array) {

            cardswrapper.innerHTML = '';
            array.forEach((annuncio) => {
                prova++
                let div = document.createElement('div')
                div.classList.add('col-md-3', 'col-12', 'mx-3', 'mb-2');
                div.innerHTML = `
            <div id='${prova}' class="card cardGenerata" >
            <div class="card-body d-flex justify-content-between align-items-center py-1">
                            <p class="card-text fw-semibold m-2 prezzo"> € ${annuncio.price} </p>
                            <i class="fa-regular fa-heart"></i>
                        </div>
                        <img src="${annuncio.img[0].url}" class="imgDefault position-relative" alt="...">
                        <div id='${annuncio.id}' class="col-12 bannerFoto">
                        <div class="d-flex catturafoto ">
                        
                        </div>
                    </div>
                        <div class="card-body d-flex justify-content-between">

                            <div class="col-8">
                                <h6 class="card-text fw-semibold">${annuncio.brand}</h6>
                                <h6>${annuncio.name}</h6>

                            </div>
                            <div class="col-1">
                                <i id='${annuncio.id}' class="fa-solid fa-cart-shopping shopping"></i>
                            </div>
                        </div>
                        </div>
            `
                cardswrapper.appendChild(div)
            })


            document.querySelectorAll('.shopping').forEach((shop) => {
                shop.addEventListener('click', () => {
                    let index = shop.id;
                    let annuncio = data.find(el => el.id == index)
                    cartarray.push(annuncio)
                    // console.log(cartarray);

                    let total = cartarray.map(el => el.price).reduce((acc, n) => acc + n, 0).toFixed(2)
                    // console.log(total);

                    subtotale.innerHTML = `
                <h5>€ ${total}</h5>`;

                    cardShop.innerHTML = '';
                    cartarray.forEach(el => {
                        // console.log(el);
                        let div = document.createElement('div');
                        div.classList.add('cardina');
                        div.innerHTML = `
                    <img class="img-fluid" src="${el.img[0].url}" alt="">
                    <h6 class='fw-bold'>${el.brand}</h6>
                    <h6>${el.name}</h6>
                `
                        cardShop.appendChild(div);

                    })
                });
            });




            let bannerFoto = document.querySelectorAll('.bannerFoto');

            let cardGenerata = document.querySelectorAll('.cardGenerata');

            let imgDefault = document.querySelectorAll('.imgDefault');
            // console.log(imgDefault);





            // entrando in cardGenerata, deve scattare l'evento. Trovo l'indice della card hoverata con l'evento mouseover tramite index=card.id(card adesso é un par formale). Mi creo la var annuncio, in cui salvo come valore il find di tutto l'oggetto (il json) e mi ritorna un singolo oggetto dato dal confronto fra l'indice della card hoverata e l'indice della card findata.

            // trovato l'oggetto, in quanto pieno ed esistente, gli mettiamo una condizione per entrare nella fascia bianca e, per ognuna di esse, confronta tramite if, che, se l'id della cardgenerata e hoverata, sia uguale all'id della fascia bianca (ABBIAMO DATO UN ID IN FASE DI COSTRUZIONE DI ESSA, annuncio.id), vai  a costruire l'elemento


            cardGenerata.forEach((card) => {
                console.dir(card);
                
                let index = card.id-1;


                card.addEventListener('mouseenter', () => {
                    console.log(index);
                    
                    // let annuncio = data.find(el => el.id == index)
                    // console.log(annuncio);


                    // if (annuncio) {
                        // bannerFoto.forEach(element => {
                            // if (card.id == element.id) {
                                bannerFoto[index].classList.add('d-block')

                                // console.log(index)
                                // console.log(data[index].img[1].url);
                                bannerFoto[index].innerHTML = `
                                    <img id='${index}' class='imgxx img1' src=${data[index].img[0].url}>
                                    <img id='${index}' class='imgxx img2' src=${data[index].img[1].url}>
                                    `

                                    let img1 = document.querySelectorAll('.img1');
                                    img1.forEach(el => {
                                        el.addEventListener('click', () => {
                                            imgDefault[index].src = data[index].img[0].url;
                                        })
                                    })

                                    let img2 = document.querySelectorAll('.img2');
                                    img2.forEach(el => {
    
                                        el.addEventListener('click', () => {
                                            imgDefault[index].src = data[index].img[1].url;
                                        })
                                    })
                            // }
                        // })



                    // }
                    // fuori dall'if

                })
                // fuori mouseenter

            })

            cardGenerata.forEach(el => {
                // el.addEventListener('mouseleave', () => {
                //     bannerFoto.forEach(element => {
                //         if (el.id == element.id) {
                //             element.classList.remove('d-block')
                //         }
                //     })
                // })
                let index = el.id -1;
                el.addEventListener('mouseleave', () => {
                    bannerFoto[index].classList.remove('d-block');
                })
            })

          


            // console.log(cardswrapper);
        }
        showCards(data)


        // funzione filterbycategory

        function filterByCategory(array) {

            let checked = Array.from(radios).find((button) => button.checked);
            // console.log(checked);
            let categoria = checked.id


            if (categoria == 'all') {
                return array

            } else {
                let filtered = array.filter((annuncio) => annuncio.category == categoria);
                return filtered

            }


        }


        // evento click sui radios

        radios.forEach((button) => {
            button.addEventListener('click', () => {
                globalFilter()
            })
        })


        // funzione setCheckbox + filterByColor

        function setCheckbox() {
            let colors = data.map((annuncio) => annuncio.color)

            let uniqueColors = Array.from(new Set(colors));

            uniqueColors.forEach((el) => {
                let div = document.createElement('div');
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


            if (filtered.length == 0) {
                cardswrapper.innerHTML = `<p>Nessun prodotto trovato</p>`
            } else {
                showCards(filtered)

            }
        }



        // evento cattura inputPrice

        applyPrice.addEventListener('click', () => {
            if (inputMinPrice.value != '' && inputMaxPrice.value != '') {
                setInputPrice(data);
            } else if (inputMinPrice.value == '' && inputMaxPrice.value != '') {
                setInputPrice(data);
            }
            else {
                console.log('ciao');
            }
        })


        // funzione setBrands

        function setBrand() {
            let brand = data.map((annuncio) => annuncio.brand)

            let uniqueBrand = Array.from(new Set(brand));


            uniqueBrand.forEach((el) => {
                let div = document.createElement('div');
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



        // filtro per parola


function filterByWord(array) {
    let filtered = array.filter( (annuncio)=> annuncio.name.toLowerCase().includes(inputsearchbar.value.toLowerCase())  )
    return filtered
    
}


inputsearchbar.addEventListener('input', ()=> {
    globalFilter(inputsearchbar.value);
})


        // filtro globale

        function globalFilter() {
            let filteredByCategory = filterByCategory(data);
            let filteredByBrand = filterByBrand(filteredByCategory);
            let filteredByColor = filterByColor(filteredByBrand);
            let filteredByWord = filterByWord(filteredByColor)

            showCards(filteredByWord)
        }

        globalFilter()


        // funzione per aggiunta al carrello



        let prezzo = document.querySelectorAll('.prezzo')

        let cardShop = document.querySelector('.cardShop');

        let cartarray = [];











    })




    



let inputsearchbar=document.querySelector('.input-search-bar')
let searchBarContainerEl = document.querySelector(".search-bar-container");
let button = document.querySelector(".btnSearch");
let magnifierEl = document.querySelector(".magnifier");


magnifierEl.addEventListener("click", () => {
    searchBarContainerEl.classList.toggle("start");
    magnifierEl.classList.toggle("fa-magnifying-glass");
    magnifierEl.classList.toggle("fa-xmark");
    button.classList.toggle("d-none");
    setTimeout(function () {
        button.classList.toggle("opacity-0");
    }, 300);
});