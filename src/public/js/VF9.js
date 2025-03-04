$(document).ready(() => {
    if (window.innerWidth >= 1200) {
        // 📌 Hiệu ứng logo và hero section
        let heroTimeline = gsap.timeline({ paused: true });

        // Ẩn trước tất cả các dòng chữ
        gsap.set("#tl1-logo, #tl1-heading, #tl1-specs", { opacity: 0 });

        heroTimeline.set("#tl1-logo", { x: 0, yPercent: 120 });
        heroTimeline.set("#tl1-heading", { x: 0, y: "-50vh" });

        heroTimeline
            .to("#tl1-logo", { duration: 0.6, delay: 1, opacity: 1 })
            .to("#tl1-hero-img img", { duration: 0.8, scale: 1.1 }, "<")
            .to("#tl1-hero-img", { duration: 0.1 }, ">")
            .add(() => { $("#tl1-hero-img").addClass("dim"); })
            .to("#tl1-logo", { duration: 0.8, delay: 0.6, x: 0, yPercent: 0, opacity: 0.2 }, ">")
            .to("#tl1-heading", { duration: 0.8, opacity: 1, x: 0, y: 0 }, "<")
            .to("#tl1-specs", { duration: 0.8, delay: 0.2, opacity: 1 }, ">")
            .to("#tl1-hero-img img", { duration: 0.8, delay: 0.2, scale: 1 }, "<");

        // 📌 Kích hoạt khi cuộn tới
        ScrollTrigger.create({
            trigger: "#tl1-hero-img",
            start: "top 80%",
            onEnter: () => heroTimeline.play(),
        });

        // 📌 Hiệu ứng background
        gsap.timeline({
            scrollTrigger: {
                trigger: ".section-version",
                start: "top center",
                scrub: true
            }
        }).to(".section-version .bg", { height: "100%", duration: 1.5 });

        // 📌 Xe di chuyển
        gsap.set(".section-version .car-animate img", { left: "150%" });
        gsap.timeline({
            scrollTrigger: {
                trigger: ".section-version",
                start: "top center",
                scrub: true
            }
        }).to(".section-version .car-animate img", { duration: 1.5, left: "50%" });

        // 📌 Swiper xuất hiện
        gsap.set(".swiper-wrapper", { opacity: 0, y: 100 });
        gsap.timeline({
            scrollTrigger: {
                trigger: ".swiper-wrapper",
                start: "top 80%",
                end: "top 50%",
                scrub: true
            }
        }).to(".swiper-wrapper", { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" });
    }

    // 📌 AOS
    AOS.init({ once: true });
});
