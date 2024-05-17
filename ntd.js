// Initialize an empty array to store URLs of displayed images
let displayedImages = [];

document.getElementById('text-input').addEventListener('input', function() {
    const query = this.value;
    if (query.length > 0) {
        fetchImages(query);
    }
});

async function fetchImages(query) {
    const apiKey = 'AIzaSyAEOxUET_NlRd5suNKpZH2uLP06h64fgKo';
    const cx = '3648b7bde7d7b4713';
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&searchType=image&key=${apiKey}&num=6`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items) {
            // Filter out images that have already been displayed
            const newImages = data.items.filter(image => !displayedImages.includes(image.link));
            displayImages(newImages);
        } else {
            console.error('No images found');
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function displayImages(images) {
    const container = document.getElementById('image-container');

    images.slice(0, 6).forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image.link;
        img.className = 'random-image';

        // Set dimensions to cover the screen
        img.style.width = '100vw';
        img.style.height = '100vh';

        // Set position to cover the screen
        img.style.position = 'fixed';
        img.style.top = '0';
        img.style.left = '0';
        
        container.appendChild(img);

        // Add the URL of the displayed image to the array
        displayedImages.push(image.link);

        // Remove the image after a delay
        setTimeout(() => {
            container.removeChild(img);
            // Remove the URL from the array after removing the image
            displayedImages = displayedImages.filter(url => url !== image.link);
        }, 3000); // 3000 milliseconds (3 seconds) delay before removing the image
    });
}
tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        // Remove active class from all tabs and contents
        tabs.forEach(item => item.parentElement.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        this.parentElement.classList.add('active');
        target.classList.add('active');

        
    });
});
