$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    $('a[href^="#"]').on('click', function (e) {
        const target = $(this).attr('href');
        if (!target || target === '#' || !$(target).length) return;
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(target).offset().top,
        }, 500, 'linear');
    });

    $('#contact-form').submit(function (event) {
        event.preventDefault();
        const data = new FormData(this);
        const body = [
            'Name: ' + (data.get('name') || ''),
            'Email: ' + (data.get('email') || ''),
            'Phone: ' + (data.get('phone') || ''),
            '',
            data.get('message') || ''
        ].join('\n');
        window.location.href = 'mailto:jitennakum.ja@gmail.com?subject='
            + encodeURIComponent('Portfolio message from ' + (data.get('name') || 'site'))
            + '&body=' + encodeURIComponent(body);
    });
});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
        document.title = 'Portfolio | Jiten Nakum';
    } else {
        document.title = 'Come Back To Portfolio';
    }
});

if (document.querySelector('.typing-text')) {
    new Typed('.typing-text', {
        strings: ['Flutter apps', 'mobile apps', 'app design', 'WhatsApp', 'Cursor'],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reel video, .portrait video').forEach(function (video) {
        video.removeAttribute('autoplay');
        video.pause();
    });
}

VanillaTilt.init(document.querySelectorAll('.tilt'), { max: 15 });

const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

srtop.reveal('.home .content h2', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });
srtop.reveal('.education .box', { interval: 200 });
srtop.reveal('.work .box', { interval: 200 });
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });
srtop.reveal('.contact .container', { delay: 400 });
