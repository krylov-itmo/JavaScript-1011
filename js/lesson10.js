'use strict';
let titleElems = document.querySelectorAll(".article p:first-child");

for (let elem of titleElems){
    elem.addEventListener("click", openDescription);
}

function openDescription() {
    for (let e of document.getElementsByClassName("article")) {
    	e.lastElementChild === this.nextElementSibling ? this.nextElementSibling.classList.toggle("open") : e.lastElementChild.classList.remove("open"); 
    }
}



let playobj = {
                cat: "Кот",
                book: "Книга",
                car: "Машина"
            };


function generateField(n) {
	if (n < 3) return
    let container = document.createElement("div");
    container.style.width = '40vw';
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    let size = 40/n; //'vw'
    for (let i = 0; i < n * n; i++) {
        let innerDiv = document.createElement("div");
        innerDiv.setAttribute("id",i);
        innerDiv.style.border = '1px solid black';
        innerDiv.style.width = innerDiv.style.height = size + 'vw';
        container.append(innerDiv);
    }
    document.getElementById("game-field").append(container);
    for (let prise of Object.keys(playobj)) {
		document.getElementById(Math.floor(Math.random()*(n*n))).setAttribute("data-prise",prise);
	}
/*	for (let elem of document.getElementById("game-field").firstChild.children) {
		elem.addEventListener("click",showPresent);
		
	}*/
}
generateField(3);

let game = document.getElementById("game-field").firstChild;
game.addEventListener("click",showPresent);

let cnt = 3;
document.getElementById("game-field")
function showPresent(e) {
	let clickElem = e.target;
	let presentValue = clickElem.dataset.prise;
	if (presentValue) {
		clickElem.innerText = "Ваш подарок: "+playobj[presentValue];
		game.removeEventListener("click",showPresent)
	}
	else {
		cnt--;
		
		if (cnt > 0) {
			clickElem.innerText = "Попыток: "+cnt;
		}
		else { 
		  clickElem.innerText = "У вас неосталось попыток";
		  game.removeEventListener("click",showPresent);

		}
	}
}



 let goods = [
            {
                title: "Пианино",
                price: 3000,
                count: 25
            },
            {
                title: "Гитара",
                price: 1200,
                count: 40
            },
            {
                title: "Барабаны",
                price: 2700,
                count: 12
            },
            {
                title: "Флейта",
                price: 900,
                count: 50
            },
            {
                title: "Арфа",
                price: 3400,
                count: 5
            }
        ];




function sortByParam(sortBy,arrObj) {
	if (sortBy === "title")	return arrObj.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
	return arrObj.sort((a, b) => a[sortBy] - b[sortBy]);
}


function genTable(arr) {
	let row = tbl.createTHead();
	for (let i in arr[0]) {
		let th = document.createElement("th");		
		th.innerText = i;
		th.setAttribute("data-col",i);
		row.append(th);
	}
	for (let obj of arr) {
		row = tbl.insertRow();
		for (let prop in obj) {
			let cell = row.insertCell();
			cell.innerText = obj[prop];
		}
	}
	
	return tbl;
}


function sortTable(e) {
	let clickTh = e.target.dataset.col;
	for (let i of sortByParam(clickTh,goods)) {
		document.getElementById('table').lastChild.remove();
		for (let obj of goods) {
			let row = tbl.insertRow();
			for (let prop in obj) {
				let cell = row.insertCell();
				cell.innerText = obj[prop];
			}
		}
	}
}

let tbl = document.createElement("table");
tbl.setAttribute("border", "1px");
tbl.setAttribute("id","table");
let tblsection = document.querySelector(".three");
tblsection.append(genTable(goods));

for (let a of document.getElementsByTagName("th")) {
	a.addEventListener("click",sortTable)
}



let checkbox = document.querySelector("div:last-child input[type=checkbox]");
checkbox.addEventListener("change", function() {
    if (this.checked) {
        document.querySelector("div:last-child input[type=checkbox]").parentElement.parentElement.lastElementChild.disabled = false;
    } else {
        document.querySelector("div:last-child input[type=checkbox]").parentElement.parentElement.lastElementChild.disabled = true;
    }  
});



let form = document.forms.form;


form.addEventListener("submit", takeForm);
function takeForm(event) {
    event.preventDefault(); // отменяет отправку данных на сервер
    console.log("коммент: " + this.elements.comment.value);
    console.log("author: " + this.elements.author.value);
    let comment = document.getElementById("comments");
    let span = document.createElement("span");
    span.innerText = this.elements.author.value;
    let p = document.createElement("p")
    p.innerText = this.elements.comment.value;
    comment.append(span);
    comment.append(p);
 } 




let books = [
            { author: 'Пушкин', title: 'Пир во время чумы', pageCount: 5, count: 10},
            { author: 'Гоголь', title: 'Мертвые души', pageCount: 470, count: 0},
            { author: 'Лермонтов', title: 'Тамань', pageCount: 190, count: 6},
            { author: 'Гончаров', title: 'Обломов', pageCount: 610, count: 2},
            { author: 'Лермонтов', title: 'Герой Нашего Времени', pageCount: 191, count: 17},
            { author: 'Пушкин', title: 'Руслан и Людмила', pageCount: 50, count: 0},
            { author: 'Лермонтов', title: 'Бородино', pageCount: 2, count: 5},
        ];

/*function moreVal(e) {
	e.preventDefault();
	if (this.target.value == "+") return this.nextElementSibling()

}*/

function generateBooksCard(sectionForBooks) {
    for (let book of books) {
   	
        let card = document.createElement("div");
        card.style.border = '1px solid #333';
        let title = document.createElement("span");
        title.innerText = `Название: ${book.title} | `;
        let info = document.createElement("div");
        let author = document.createElement("span");
        author.innerText = `автор: ${book.author}  | `;
        let pages = document.createElement("span");
        pages.setAttribute("class", "marginright");
        pages.innerText =`количество страниц: ${book.pageCount} | `;
        let form = document.createElement("form");
		let btnplus = document.createElement("input");
		btnplus.setAttribute("type","button");
		btnplus.setAttribute("value","+");
		let btnminus = document.createElement("input");
		btnminus.setAttribute("type","button");
		btnminus.setAttribute("value","-");
		let inputData = document.createElement("input");
		inputData.setAttribute("type","text");
		inputData.value = book.count;
/*		let setVal = document.createElement("input")
		setVal.setAttribute("type","button");
		setVal.setAttribute("value","Установить вручную");*/
		if (!book.count) {
			btnminus.setAttribute("disabled", true);
			btnplus.setAttribute("disabled", true);
		}
		else {
			document.querySelectorAll("input[value='+']")
		}
		form.append(btnplus);
		form.append(inputData);
		form.append(btnminus);
/*		form.append(setVal);*/
        card.append(author);
        card.append(title);
        card.append(pages);
        card.append(form);
        sectionForBooks.append(card);
    }




    for (let btn of document.querySelectorAll("input[value='+']")) {
    	btn.addEventListener("click", function() {
    		console.log(++this.parentElement.children[1].value);
    	});
    }
    for (let btn of document.querySelectorAll("input[value='-']")) {
    	btn.addEventListener("click", function() {
    		if (this.parentElement.children[1].value > 0) {
    		console.log(--this.parentElement.children[1].value);
    	}	
    	});
    }

/*    for (let btn of document.querySelectorAll("input[value='Установить вручную']")) {
    	btn.addEventListener("click", function() {
    		if (this.parentElement.children[1].value )
    	});
    }*/
}
generateBooksCard(document.getElementsByClassName("six")[0]);
