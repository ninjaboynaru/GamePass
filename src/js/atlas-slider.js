const AtlasSlider = new function() {
	const sliderCSSClass = 'js-slider';
	const arrowCSSClass = 'js-slider-arrow';

	const slideCSSClass = 'js-slider-slide';
	const elementCSSClass = 'js-slider-slide-element';

	this.Initialize = function() {
		let sliders = document.getElementsByClassName(sliderCSSClass);
		for (let i = 0; i < sliders.length; i++) {
			let slider = sliders[i];
			let slide = slider.getElementsByClassName(slideCSSClass)[0];

			MoveSlide(slide, 0);

			let arrows = slider.getElementsByClassName(arrowCSSClass);
			if (arrows.length !== 2) {
				continue;
			}

			arrows[0].onclick = SlideLeftEvent;
			arrows[1].onclick = SlideRightEvent;
		}
	};

	function SlideLeftEvent(event) {
		let arrow = event.currentTarget;
		let slider = arrow.parentElement;

		PerformSlide(-1, slider);
	}

	function SlideRightEvent(event) {
		let arrow = event.currentTarget;
		let slider = arrow.parentElement;

		PerformSlide(1, slider);
	}

	/**
	 * Slide a slide in a direction.
	 * Capable of handling slides with any ammount of elements of any size, given that those
	 * elements are sized smaller or equal to the size of the slide.
	 *
	 * @function
	 * @param {int} direction - 1 or -1
	 */
	function PerformSlide(direction, slider) {
		const slide = slider.getElementsByClassName(slideCSSClass)[0];

		const slideElements = slide.getElementsByClassName(elementCSSClass);

		const slideSize = slide.offsetWidth;
		const elementSize = slideElements[0].offsetWidth;
		const elementCount = slideElements.length;

		const elementsPerSlide = slideSize / elementSize;
		const slideOffset = 100 / elementsPerSlide * Math.floor(elementsPerSlide);
		const maxSlideOffset = Math.ceil(elementCount / Math.floor(elementsPerSlide)) * slideOffset - slideOffset;

		const currentSlideOffset = GetSlideOffset(slide);

		(function() {
			let l = console.log;
			l('direction', direction);
			l('slideSize', slideSize);
			l('elementSize', elementSize);
			l('elementCount', elementCount);
			l('elementsPerSlide', elementsPerSlide);
			l('slideOffset', slideOffset);
			l('maxSlideOffset', maxSlideOffset);
			l('currentSlideOffset', currentSlideOffset);
		})();

		if (direction == -1 && FloatsAreEqual(currentSlideOffset, 1)) {
			MoveSlide(slide, maxSlideOffset);
			return;
		} else if (direction == 1 && currentSlideOffset >= maxSlideOffset) {
			MoveSlide(slide, 0);
			return;
		}

		MoveSlide(slide, currentSlideOffset + slideOffset * direction);
	}

	/*	function LegacyPerformSlide(direction, slider) {
		
		const slide = slider.getElementsByClassName(slideCSSClass)[0];
		const lastElement = slide.lastElementChild;

		if (direction == 1 && ElementHorizontalyInside(lastElement, slider) ) {
			MoveSlide(slide, 0);
			ToggleFirstArrow(slider, false);
			return;
		}

		const currentSlideOffset = GetSlideOffset(slide);
		const newSlideOffset = currentSlideOffset - 100 * direction;

		MoveSlide(slide, newSlideOffset);
		ToggleFirstArrow(slider, true);
	}*/

	function MoveSlide(element, offset, clear = false) {
		if (clear) {
			element.style.right = '';
			return;
		}

		element.style.right = `${offset}%`;
	}

	function GetSlideOffset(slide) {
		const leftCSS = slide.style.right;

		if (leftCSS == undefined) {
			return 0;
		}

		const offset = Number.parseFloat(leftCSS);
		if (offset == undefined || Number.isNaN(offset)) {
			return 0;
		}

		return offset;
	}

	function FloatsAreEqual(float1, float2, maxDifference = 0.01) {
		let difference = Math.abs(float1, float2);
		return difference <= maxDifference;
	}

	/**
	 * Checks if an element is compleatly, horizontaly, inside another
	 * Does not account for rotation or the vertical axis
	 * @function
	 */
	/*	function ElementHorizontalyInside(element, container) {
		const elementRect = element.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();

		
		if (elementRect.right <= containerRect.right && elementRect.left >= containerRect.left) {
			return true;
		}
		return false;
	}*/

	/*	function ToggleFirstArrow(slider, toggle = true, clear = false) {
		const firstArrow = slider.getElementsByClassName(arrowCSSClass)[0];
		let visibility = 'visible';

		if (clear == true) {
			visibility = '';
		} else if (toggle == false) {
			visibility = 'hidden';
		}

		firstArrow.style.visibility = visibility;
	}*/
}();

export default AtlasSlider;
