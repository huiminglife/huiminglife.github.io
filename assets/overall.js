/*
 * jQuery is supposed to have been loaded always. Other external libriries
 * are loaded depending on the page type.
 * */

function layout() {
  let $overlay = $('<div class="overlay hidden">').appendTo('body');
  let $nav = $('.header .links').clone().css('display', 'block');
  $('<nav>').wrapInner($nav).appendTo($overlay);
  let $menu = $('.header .menu');
  $menu.click(() => {
    $overlay.removeClass('hidden');
  });
  $overlay.click(() => {
    $overlay.addClass('hidden');
  });
}

function home() {
  let masonry = new Masonry('.posts', {
    itemSelector: ".post",
    columnWidth: ".post",
    percentPosition: true
  });

  imagesLoaded('.post', () => {
    masonry.layout();
  });
}

function gallery() {
  let $ul = $('img').closest('ul');
  if ($ul.length > 0) {
    $ul.wrap('<div class="gallery">');
    let $g = $ul.closest('.gallery');
    let $overlay = $('<div class="gallery-overlay hidden"></div>').appendTo($g);
    $overlay.click(() => {
      $overlay.addClass('hidden').empty();
    });
    $g.find('img').click(function(e) {
      e.stopPropagation();
      $overlay.removeClass('hidden').append($(this).clone());
    });
  }
}

$(() => {
  layout();
  //pageType is defined globally in _includes/script.html.
  switch (pageType) {
    case 'home':
      home();
      break;
    case 'post':
      gallery();
      break;
  }
});
