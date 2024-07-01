window.onload = function() {
    fetch('airtable.json')
        .then(response => response.json())
        .then(data => {
            const carousel = document.getElementById('carousel');
            const records = data.records.filter(record => record.fields.picture);


            records.forEach((record, index) => {
                const url = record.fields.picture[0].url;
                const name = record.fields['Name'] || 'No Name';  // Assuming the field name is '使用者名稱'

                // Create img element
                const img = document.createElement('img');
                img.src = url;
                if (index === 0) img.classList.add('active');
                carousel.appendChild(img);

                // Create caption element
                const caption = document.createElement('div');
                caption.className = 'caption';
                if (index === 0) caption.classList.add('active');
                caption.textContent = name;
                carousel.appendChild(caption);
            });

            let currentIndex = 0;
            const images = document.querySelectorAll('#carousel img');
            const captions = document.querySelectorAll('#carousel .caption');
            const totalImages = images.length;

            setInterval(() => {
                images[currentIndex].classList.remove('active');
                captions[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % totalImages;
                images[currentIndex].classList.add('active');
                captions[currentIndex].classList.add('active');
            }, 3000); // Change image every 3 seconds
        })
        .catch(error => console.error('Error fetching JSON data:', error));
};
