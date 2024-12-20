// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// const iconWrappers = document.querySelectorAll('.icon-wrapper');
// const iconsSelector = document.querySelectorAll('.icon');
// const imagesSelector = document.querySelectorAll('.section-reveal');
// const radius = 200;
// const totalIcons = iconsSelector.length;

// // Initialize images
// gsap.set(imagesSelector, { opacity: 0 });

// // Function to calculate icon positions based on progress
// function setIconPositions(progress) {
//     iconWrappers.forEach((wrapper, index) => {
//         const startAngledeg = -90;
//         const startAngle = startAngledeg * (Math.PI / 180);
//         const arcLength = Math.PI;
//         const angle = startAngle + (index / (totalIcons - 1)) * arcLength - progress * arcLength;

//         const x = Math.cos(angle) * radius;
//         const y = Math.sin(angle) * radius;

//         gsap.set(wrapper, {
//             x: x,
//             y: y,
//             rotation: 0,
//         });
//     });
// }

// // Function to calculate target progress for centering an icon
// function getTargetProgressForIndex(index) {
//     return index / (totalIcons - 1);
// }

// // Define background colors
// const bgGrads = ["#ef4444", "#eab308", "#4d7c0f", "#0891b2", "#7c3aed", "#4ade80"];

// // Function to update visible image
// function updateVisibleImage(closestIndex) {
//     if (closestIndex !== -1) {
//         // Hide all images and reset backgrounds
//         imagesSelector.forEach((image, idx) => {
//             gsap.to(image, { 
//                 opacity: 0, 
//                 backgroundColor: 'transparent',
//                 duration: 0.3 
//             });
//         });
        
//         // Show active image with background
//         gsap.to(imagesSelector[closestIndex], { 
//             opacity: 1, 
//             backgroundColor: bgGrads[closestIndex],
//             duration: 0.3 
//         });
//     }
// }

// // Set initial positions
// setIconPositions(0);

// // Create the scroll trigger animation
// gsap.to({}, {
//     scrollTrigger: {
//         trigger: '#animation-section',
//         start: 'top top',
//         end: 'bottom bottom',
//         scrub: 1,
//         onUpdate: (self) => {
//             setIconPositions(self.progress);

//             let closestIndex = -1;
//             let minDistance = Infinity;

//             iconsSelector.forEach((icon, index) => {
//                 const rect = icon.getBoundingClientRect();
//                 const centerX = rect.left + rect.width / 2;
//                 const centerY = rect.top + rect.height / 2;
//                 const distanceToCenter = Math.sqrt(
//                     (window.innerWidth / 2 - centerX) ** 2 + 
//                     (window.innerHeight / 2 - centerY) ** 2
//                 );

//                 if (distanceToCenter < minDistance) {
//                     minDistance = distanceToCenter;
//                     closestIndex = index;
//                 }
//             });

//             updateVisibleImage(closestIndex);
//         },
//     },
// });

// // Initial animation for icons appearing
// gsap.from(iconsSelector, {
//     scale: 0,
//     opacity: 0,
//     duration: 1,
//     stagger: 0.1,
//     ease: 'back.out(1.7)',
// });

// // Add click handlers to icons
// iconsSelector.forEach((icon, index) => {
//     // Hover animations
//     icon.addEventListener('mouseenter', () => {
//         gsap.to(icon, { scale: 1.1, duration: 0.3, ease: 'back.out' });
//     });
    
//     icon.addEventListener('mouseleave', () => {
//         gsap.to(icon, { scale: 1, duration: 0.3, ease: 'back.out' });
//     });

//     // Click to center animation
//     icon.addEventListener('click', () => {
//         const targetProgress = getTargetProgressForIndex(index);
//         const section = document.querySelector('#animation-section');
//         const scrollAmount = targetProgress * (section.offsetHeight - window.innerHeight);
        
//         gsap.to(window, {
//             duration: 1,
//             scrollTo: {
//                 y: scrollAmount,
//                 autoKill: false
//             },
//             ease: "power2.inOut"
//         });
//     });
// });