const tables = document.querySelectorAll('.ontario-table-div');
const scrollerDiv = document.querySelectorAll('.ontario-table-scroll--div');
const scrollerWrapper = document.querySelectorAll('.ontario-table-scroll--wrapper');
let ro = new ResizeObserver((entries) => {
	tables.forEach((element, index) => {
		applyScrollbar(index);
	});
});

tables.forEach((element, index) => {
	applyScrollbar(index);
	ro.observe(document.querySelectorAll('table')[index]);

	tables[index].addEventListener('scroll', (event) => {
		applyScrollbar(index);

		scrollerWrapper[index].scrollLeft = tables[index].scrollLeft;
	});

	scrollerWrapper[index].addEventListener('scroll', (event) => {
		applyScrollbar(index);

		tables[index].scrollLeft = scrollerWrapper[index].scrollLeft;
	});
});

function applyScrollbar(index) {
	scrollerDiv[index].style.visibility = 'visible';
	scrollerDiv[index].style.height = '20px';
	scrollerDiv[index].style.width = `${tables[index].scrollWidth}px`;
}
