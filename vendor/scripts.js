/**
* Template Name: Regna
* Updated: Jan 09 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/regna-bootstrap-onepage-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
  
      if (!header.classList.contains('header-scrolled')) {
        offset -= 20
      }
  
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
        } else {
          selectHeader.classList.remove('header-scrolled')
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  
    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
      let portfolioContainer = select('.portfolio-container');
      if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });
  
        let portfolioFilters = select('#portfolio-flters li', true);
  
        on('click', '#portfolio-flters li', function(e) {
          e.preventDefault();
          portfolioFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');
  
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          portfolioIsotope.on('arrangeComplete', function() {
            AOS.refresh()
          });
        }, true);
      }
  
    });
  
    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox'
    });
  
    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    });
  
    /**
     * Initiate Pure Counter 
     */
    new PureCounter();
  
  })()



//Slide

(function($) {
  $.fn.rotator = function(options) {
     const settings = $.extend(
        {
           targetTag: "div",
           activeClass: "rotator__slide--active",
           userClassName: "",
           slideClass: "rotator__slide-",
           autoSwitch: true,
           autoSwitchSpeed: 2000,
           pauseOnHover: true,
           addProperty: function() {}
        },
        options
     );

     let _timer = null;

     const _rotator = this,
        slides = _rotator.find(`> ${settings.targetTag}`),
        _length = slides.length;

     const _methods = {
        addId: function($target, $index) {
           $target
              .data("id", $index)
              .attr("class", settings.userClassName)
              .addClass(`${settings.slideClass}${$index}`);

           $index === 0 && $target.addClass(settings.activeClass);
           settings.addProperty.call($target, _length);
        },
        onStart: function() {
           slides.each(function(i) {
              const _this = $(this),
                 _index = _this.index();

              _methods.addId(_this, _index);
           });
        },
        actionSwitch: function() {
           slides.on("click", function() {
              const _this = $(this);

              if (!_this.hasClass(settings.activeClass)) {
                 let start = 0;

                 _methods.addId(_this, start);

                 _methods.switchOnNext(_this, start);
                 _methods.switchOnPrev(_this, _length);
              }
           });
        },
        switchOnNext: function($target, $startVal) {
           $target.nextAll().each(function() {
              const _this = $(this);
              $startVal++;

              _methods.addId(_this, $startVal);
           });
        },
        switchOnPrev: function($target) {
           $target.prevAll().each(function(i) {
              const _this = $(this);
              let _num = Math.abs(i - _length + 1);

              _methods.addId(_this, _num);
           });
        },
        autoSwitch: function() {
           slides.each(function() {
              const _this = $(this);
              let switchId = _this.data("id") - 1;
              if (switchId < 0) {
                 switchId = Math.abs(_length + switchId);
              }

              _methods.addId(_this, switchId);
           });
        },
        autoSwitchInit: () => {
           _timer = setTimeout(function tick() {
              _methods.autoSwitch();

              _timer = setTimeout(tick, settings.autoSwitchSpeed);
           }, settings.autoSwitchSpeed);
        }
     };

     _methods.onStart();
     _methods.actionSwitch();

     if (settings.autoSwitch) {
        _methods.autoSwitchInit();
     }

     if (settings.pauseOnHover && settings.autoSwitch) {
        _rotator.on("mouseenter", function() {
           clearTimeout(_timer);
        });
        _rotator.on("mouseleave", function() {
           _methods.autoSwitchInit();
        });
     }
  }; //.fn end
})(jQuery);

$("[data-rotator]").rotator({
  // autoSwitch: false,
  addProperty: function(length) {
     const slide = this,
        id = slide.data("id"),
        zIndex = length - id;

     slide.css({ "z-index": zIndex });
     id >= 2 && slide.addClass("rotator__slide-common");
  }
});