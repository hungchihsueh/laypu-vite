document.addEventListener("mousemove", (e) => {
    if (e.pageX > window.innerWidth * 0.8) {
        console.log("right")
    } else if (e.pageX < window.innerWidth * 0.2) {
        console.log("left")
    }
})