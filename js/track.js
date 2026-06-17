// ==========================================
// TRACKS.JS - Search filtering & Track Buttons
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Real-Time Search Logic ---
    const searchInput = document.getElementById('sound-search');
    const trackItems = document.querySelectorAll('.track-item');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();

            trackItems.forEach(track => {
                // Read all the text inside the track item
                const trackText = track.textContent.toLowerCase();

                // Show or hide based on the search query
                if (trackText.includes(query)) {
                    track.style.display = 'flex';
                } else {
                    track.style.display = 'none';
                }
            });
        });
    }

    // --- 2. Button Visual Feedback ---
    // Makes the play/download buttons flash green briefly when clicked
    const actionButtons = document.querySelectorAll('.icon-btn');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Stop it from jumping to the top of the page
            
            const originalBg = btn.style.backgroundColor;
            btn.style.backgroundColor = '#22c55e'; // Flash vibrant green
            
            // Revert back to original color after 200 milliseconds
            setTimeout(() => {
                btn.style.backgroundColor = originalBg;
            }, 200);
        });
    });
});