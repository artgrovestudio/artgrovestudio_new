// JS

window.onload = function () {
  var loader = $('.loader');
  var logo = $('.nav .logo');
  var tl = new TimelineMax();

  tl.to(loader, 1, {opacity: "0", ease:Power2.easeInOut}, 2)
  .to(loader, 0, {zIndex: "-99999"})
  .to(logo, 1, {left: "0", transform: "translateX(0)", ease:Power4.easeInOut}, 2)
}
