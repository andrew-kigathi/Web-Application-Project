document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Real-Time Search Filtering ---
    const searchInput = document.getElementById('sound-search');
    const soundCards = document.querySelectorAll('.sound-card-dark, .sound-card-wave');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();

            soundCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                // If query matches card info, display block; otherwise, hide it
                card.style.display = cardText.includes(query) ? 'flex' : 'none';
            });
        });
    }

    // --- 2. Horizontal Carousel Scroll Navigation ---
    const sections = document.querySelectorAll('.category-section');

    sections.forEach(section => {
        const leftBtn = section.querySelector('.left-btn');
        const rightBtn = section.querySelector('.right-btn');
        const track = section.querySelector('.carousel-track');
        
        const scrollAmount = 300; // Matches card width + gap layout styling

        if (leftBtn && rightBtn && track) {
            leftBtn.addEventListener('click', () => {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });

            rightBtn.addEventListener('click', () => {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    });

    // --- 3. Global Audio Handling Engine (Play/Pause State Machine) ---
    let globalAudio = new Audio(); // Central architecture instance for single-stream playback
    let activePlayBtn = null;     // Reference container to calculate button updates

    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Bubble up to capture local card parameters
            const card = btn.closest('.sound-card-dark, .sound-card-wave');
            const audioUrl = card.getAttribute('data-audio');

            if (!audioUrl) {
                console.warn("Audio track source missing from node properties.");
                return;
            }

            // CASE A: Direct click event context matching an active audio thread
            if (activePlayBtn === btn) {
                if (!globalAudio.paused) {
                    globalAudio.pause();
                    btn.textContent = '▶'; // Toggle to standard initialization icon
                } else {
                    globalAudio.play();
                    btn.textContent = '⏸'; // Transition to standard suspension icon
                }
                return;
            }

            // CASE B: Change stream focus context assignment
            if (activePlayBtn) {
                activePlayBtn.textContent = '▶'; // Instantly normalize previous track UI state
            }

            globalAudio.src = audioUrl;
            globalAudio.play()
                .then(() => {
                    btn.textContent = '⏸'; // Update target icon to pause state lines
                    activePlayBtn = btn;   // Reassign tracking coordinates
                })
                .catch(err => console.error("Playback target unresolvable or missing assets:", err));
        });
    });

    // Lifecycle listener checking for complete track iterations
    globalAudio.addEventListener('ended', () => {
        if (activePlayBtn) {
            activePlayBtn.textContent = '▶';
            activePlayBtn = null;
        }
    });
});