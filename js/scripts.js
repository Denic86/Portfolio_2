// Custom Scripts
// swiper
const swiper = new Swiper('.testimonials__swiper', {

	slidesPerView: 1.1,
	pagination: {
		el: '.pagination-testimonials__point',
		clickable: true,
	},
	hideOnClick: true,
});
// Custom scripts

// header
let headerMenuM = document.querySelector(".header__menu-m")
let header = document.querySelector(".header")
let headerNav = document.querySelector(".header__navigation")
let mainBody = document.querySelector(".main__body")
let winWidth = window.innerWidth;
console.log(winWidth)
let winWidth_2 = document.documentElement.clientWidth
header.addEventListener("click", function(e) {
	let target = e.target
	if (target.closest(".header__menu-m")){
		headerMenuM.classList.toggle("-active");
		headerNav.classList.toggle("-active");
		mainBody.classList.toggle('-locked');
		if (headerMenuM.classList.contains("-active") && mainBody.classList.contains('-locked')){
			winWidth = window.innerWidth;
			if (((window.innerWidth < 768) || (window.innerHeight < 768)) && ((window.innerWidth > 768) || (window.innerHeight > 768))) {
				window.addEventListener('resize', checkWinWidth)
				
			}
		} else {
			window.removeEventListener('resize', checkWinWidth)
		}
	}
	if (target.classList.contains('header__link')){
		closeMenu()
	}
	
});
// scroll header
if ((window.innerWidth > 768) || (window.innerHeight > 768)){
	window.addEventListener("scroll", function() {
		if (document.documentElement.clientWidth > 768) {
			if (window.scrollY > 10) {
				header.classList.add('-header-padding');
			} else {
				header.classList.remove('-header-padding');
			}
		}
	});
};
// close menu
function checkWinWidth() {
	console.log('check')
	let winWidthNew = window.innerWidth;
	if (!(winWidthNew === winWidth)) {
		winWidth = winWidthNew;
		if (headerMenuM.classList.contains("-active")){
		closeMenu()
		}
		window.removeEventListener('resize', checkWinWidth)
	}
	
}
function closeMenu() {
	headerMenuM.classList.remove("-active");
	headerNav.classList.remove("-active");
	mainBody.classList.remove('-locked');
}
let delay = 800;
// right padding
let rp = document.querySelectorAll('.-rp')
function rightPadding() {
	let winWidth = window.innerWidth;
	let winWidth_2 = document.documentElement.clientWidth
	if (winWidth != winWidth_2) {
		mainBody.style.paddingRight = winWidth - winWidth_2 + "px"
	}
}
function removeRightPadding() {
	if (mainBody.style.paddingRight) {
		mainBody.style.paddingRight = ""
	}
}


// text-slider
let textSlider = document.querySelectorAll('.text-slider');
if (textSlider.length > 0){
	textSlider.forEach(element => {
		const textSliderNumber = element.querySelector('.text-slider__number')
		element.addEventListener("click", function(e) {
			let target = e.target
			if (target.classList.contains("text-slider__name")){
				let textSliderNameActive = element.querySelector(".text-slider__name.-active");
				let textSliderSubnameActive = element.querySelector(".text-slider__subname.-active");
					if ((textSliderNameActive) && (!(textSliderNameActive == target))){
						textSliderNameActive.classList.remove("-active");
						target.classList.add("-active");
						textSliderSubnameActive.classList.remove("-active");
							let textSliderName = element.querySelectorAll(".text-slider__name")
							let arrTSN = Array.from(textSliderName)
							let indexTSName = arrTSN.findIndex(item => item.classList.contains("-active"))
							let textSliderSubname = element.querySelectorAll(".text-slider__subname")
							textSliderSubname[indexTSName].classList.add("-active");
						if (textSliderNumber) {
							if (indexTSName + 1 < 10){
								textSliderNumber.innerHTML = "0" + (indexTSName + 1)
							} else {
								textSliderNumber.innerHTML = indexTSName + 1
							}
						}
						if (element.hasAttribute('data-textSlider')){
							
							checkSlider(indexTSName, element.getAttribute('data-textSlider'))
						}
					}
			}
			if (target.classList.contains('arrow')){
				let textSliderNameActive = element.querySelector(".text-slider__name.-active")
				let textSliderSubnameActive = element.querySelector(".text-slider__subname.-active")
				let textSliderName = element.querySelectorAll(".text-slider__name")
				let textSliderSubname = element.querySelectorAll(".text-slider__subname")
				let arrTSN = Array.from(textSliderName)
				let indexTSName = arrTSN.findIndex(item => item.classList.contains("-active"))
					if ((target.classList.contains('arrows__next')) && (indexTSName !== (textSliderName.length - 1))){
						textSliderNameActive.classList.remove("-active");
						textSliderSubnameActive.classList.remove("-active");
						textSliderName[indexTSName + 1].classList.add("-active");
						textSliderSubname[indexTSName + 1].classList.add("-active");
							if (textSliderNumber) {
								if (indexTSName + 1 < 9) {
									textSliderNumber.innerHTML = "0" + (indexTSName + 2);
								} else (
									textSliderNumber.innerHTML = indexTSName + 2
								);
							}
					} else if ((target.classList.contains('arrows__prev')) && (indexTSName !== 0)){
						textSliderNameActive.classList.remove("-active");
						textSliderSubnameActive.classList.remove("-active");
						textSliderName[indexTSName - 1].classList.add("-active");
						textSliderSubname[indexTSName - 1].classList.add("-active");
							if (textSliderNumber) {
								if (indexTSName + 1 <= 10) {
									textSliderNumber.innerHTML = "0" + (indexTSName)
								} else (
									textSliderNumber.innerHTML = indexTSName
								);
							}
					}
				if (element.hasAttribute('data-textSlider')){
					indexTSName = arrTSN.findIndex(item => item.classList.contains("-active"))
					checkSlider(indexTSName, element.getAttribute('data-textSlider'))
				}
				
			}
		});
	});
}

function checkSlider(index, number){
	let sliderAbout = document.querySelectorAll('.slider-about');
	sliderAbout.forEach(element => {
			if (element.dataset.slider == number ){
				if (getComputedStyle(element.closest('.pic-about')).display !== "none" ) {
					element.querySelector('.slider-about__foto').style.top = -100 * index + "%"
				}
		}
		
	});
	
}

// filter

let filter = document.querySelectorAll('.-filter');
if (filter.length > 0) {
	filter.forEach(element => {
		let filterBlock = element.querySelector('.filter__block');
		// const filterBtn = element.querySelectorAll('.filter__btn');
		let filterCard = element.getElementsByClassName("-filter__card")
		let filterCardNothing = element.querySelector('.-filter__card-nothing');
		let x = undefined;
		filterBlock.addEventListener("click", function(e) {
			let el = e.target;
			if (el.closest(".filter__btn")){
				if (!(el.classList.contains("-active"))) {
					
					if (filterCardNothing){
					filterCardNothing.style.display = "none"
					x = 0;
					}
					let filterBtnA = element.querySelector('.filter__btn.-active');
					filterBtnA.classList.remove("-active");
					el.classList.add("-active");
					filterBtnA = element.querySelector('.filter__btn.-active');
					let dFilter = filterBtnA.dataset.filter;
					
					
					for (let index = 0; index < filterCard.length; index++) {
						const item = filterCard[index];
						dGoods = item.dataset.goods
						
						if (!(dGoods == dFilter) && (!(dFilter == "all"))) {
							item.style.display = "none"
							if (filterCardNothing) {
							x++
							}
						} else if (dGoods == dFilter) {
							item.style.display = "block"
						} else if (dFilter == "all"){
							item.style.display = "block"
						}
						
					}
					if (filterCardNothing) {
					if (x === filterCard.length){

						filterCardNothing.style.display = "block"
					}
					x = 0;
				}
				};
			};
		});
	});
};

// popup
let popupLink = document.querySelectorAll('.-popup-link')
if (popupLink.length > 0) {

	popupLink.forEach(element => {
		let hrefAttrPopup = element.getAttribute('href');
		let popup = document.querySelector(`${hrefAttrPopup}`);
		// popup.addEventListener("click", popupOpen);
		if (popup) {
			element.addEventListener("click", function (e) {
				popupOpen(popup)
				e.defaultPrevented;
			});
		}
	});
};
function popupOpen(item) {
	let popupActive = document.querySelector('.popup.-active');
	if (popupActive){
		popupActive.classList.remove(".-active")
	}
	if (headerMenuM.classList.contains("-active")){
		closeMenu()
	}
	if (!(mainBody.classList.contains('-locked'))) {
		setTimeout(rightPadding(), 800)
		mainBody.classList.add('-locked')
	}
	item.classList.add("-active")
	popupClose(item);
}

function popupClose(item) {
	item.addEventListener("click", function(e) {
		let el = e.target
		if ((el.closest(".-close")) || (!(el.closest(".popup__block")))){
			item.classList.remove("-active")
			setTimeout(removeRightPadding(), delay)
			
			mainBody.classList.remove('-locked')
		}
	});
};
