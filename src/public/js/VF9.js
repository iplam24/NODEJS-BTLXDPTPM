$(document).ready(() => {
    if (window.innerWidth >= 1200) {
        gsap.registerPlugin(ScrollTrigger);

        let section = $(".section-hero"); // Chọn section chứa hiệu ứng
        let isAnimating = false; // Trạng thái hiệu ứng

        // Ẩn trước các phần tử
        gsap.set("#tl1-logo, #tl1-heading, #tl1-specs", { opacity: 0 });
        gsap.set("#tl1-logo", { x: 0, yPercent: 120 });
        gsap.set("#tl1-heading", { x: 0, y: "-50vh" });

        let timeline = gsap.timeline({
            paused: true,
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=100%", // Kéo dài hiệu ứng theo chiều cao section
                scrub: true,
                pin: true, // Giữ cố định section khi đang chạy hiệu ứng
                onEnter: () => isAnimating = true,
                onLeave: () => isAnimating = false,
                onEnterBack: () => isAnimating = true,
                onLeaveBack: () => isAnimating = false
            }
        });

        // Định nghĩa animation theo cuộn
        timeline
            .to("#tl1-logo", { duration: 0.6, opacity: 1, yPercent: 0 })
            .to("#tl1-hero-img img", { duration: 0.8, scale: 1.1 }, "<")
            .add(() => $("#tl1-hero-img").addClass("dim"))
            .to("#tl1-logo", { duration: 0.8, opacity: 0.2 }, ">")
            .to("#tl1-heading", { duration: 0.8, opacity: 1, y: 0 }, "<")
            .to("#tl1-specs", { duration: 0.8, opacity: 1 }, ">")
            .to("#tl1-hero-img img", { duration: 0.8, scale: 1 }, "<");

        // 📌 Các hiệu ứng khác theo cuộn
        gsap.timeline({
            scrollTrigger: {
                trigger: ".section-version",
                start: "top center",
                scrub: true
            }
        }).to(".section-version .bg", { height: "100%", duration: 1.5 });

        gsap.set(".section-version .car-animate img", { left: "150%" });
        gsap.timeline({
            scrollTrigger: {
                trigger: ".section-version",
                start: "top center",
                scrub: true
            }
        }).to(".section-version .car-animate img", { duration: 1.5, left: "50%" });

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

    // 📌 Khởi tạo AOS (Animation On Scroll)
    AOS.init({ once: true });
});
document.addEventListener("DOMContentLoaded", function () {
    const versions = document.querySelectorAll(".VF9-icon");

    versions.forEach((version) => {
        version.addEventListener("click", function () {
            versions.forEach((v) => v.classList.remove("active")); // Xóa active khỏi tất cả
            this.classList.add("active"); // Thêm active vào mục được chọn
        });
    });
});
