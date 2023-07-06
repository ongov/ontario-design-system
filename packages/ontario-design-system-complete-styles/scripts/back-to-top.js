window.addEventListener('scroll', function () {
	let scroll = document.getElementById('actual-btt-button');
	scroll.classList.toggle('active', window.scrollY > 200);
});

function scrollToTop() {
	window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}
