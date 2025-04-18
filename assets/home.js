window.onload = () => {
    const compter = document.querySelector(".home_accuracy-count");
    animatecompter(compter, 8000);
}
function animatecompter(compter, duration) {
    let startValue = 0;
    let endValue = 100;
    let increment = endValue / (duration / 100); 
    let currentValue = startValue;

    const interval = setInterval(() => {
        if (currentValue < endValue) {
            currentValue += increment;
            currentValue = Math.min(Math.floor(currentValue), endValue); 
            compter.innerText = currentValue + "%";
        } else {
            clearInterval(interval);
        }
    }, 100);

    const comptWpm = document.querySelector(".home_wpm-count");
    animateCounter(comptWpm, 70, 8000);
    
    function animateCounter(element, targetValue, duration) {
        let currentValue = 0;
        const steps = Math.floor(duration / 100); 
        const increment = targetValue / steps;
    
        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(interval);
            }
    
            element.innerText = `${Math.floor(currentValue)}`;
        }, 100);
    }
}

 

    