document.addEventListener("DOMContentLoaded", () => {
    // 1. DRUM DATA
    const libraryData = {
        "Trap Drums": [
            { title: "Metro Bounce Break", bpm: 140, type: "Full Loop", file: "audio/drum loops/trap/trap-1.wav" },
            { title: "Atlanta Hi-Hats", bpm: 144, type: "Top Loop", file: "audio/drum loops/trap/trap-2.wav" },
            { title: "808 Slide Pattern", bpm: 132, type: "808 Loop", file: "audio/drum loops/trap/trap-3.wav" },
        ],

        "Old School Boom Bap": [
            { title: "Dusty Vinyl Break", bpm: 88, type: "Full Break", file: "audio/drum loops/old-school/os-1.wav" },
            { title: "MPC Kick Pattern", bpm: 92, type: "Kick & Snare", file: "audio/drum loops/old-school/os-2.wav" },
            { title: "Swing Hi-Hat Groove", bpm: 95, type: "Top Loop", file: "audio/drum loops/old-school/os-3.wav" },
        ],

        "Rage Drums": [
            { title: "Distorted Cyber Kick", bpm: 155, type: "Kick Loop", file: "audio/drum loops/rage/rage-1.wav" },
            { title: "Opium Fast Hats", bpm: 160, type: "Top Loop", file: "audio/drum loops/rage/rage-2.wav" },
            { title: "Glitch Percussion", bpm: 152, type: "Percussion", file: "audio/drum loops/rage/rage-3.wav" },
        ],

        "Chill & Lo-Fi Drums": [
            { title: "Tape Deck Groove", bpm: 80, type: "Full Loop", file: "audio/drum loops/chill/chill-1.mp3" },
            { title: "Foley Percussion", bpm: 85, type: "Percussion", file: "audio/drum loops/chill/chill-2.mp3" },
            { title: "Lazy Rimshots", bpm: 78, type: "Top Loop", file: "audio/drum loops/chill/chill-3.mp3" },
        ]
    };

    // 2. RENDER LOGIC
    const container = document.getElementById('library-container');

    Object.entries(libraryData).forEach(([catName, tracks]) => {
        const section = document.createElement('section');
        section.className = 'category-section';
        section.innerHTML = `<h2 class="category-header">${catName}</h2>`;
        
        tracks.forEach(track => {
            const row = document.createElement('div');
            row.className = 'track-row';
            let bars = '';
            for(let i=0; i<20; i++) {
                bars += `<div class="wave-bar" style="height:${Math.random() * 25 + 5}px"></div>`;
            }
            row.innerHTML = `
                <button class="play-btn" onclick="playAudio('${track.file}', this)">▶</button>
                <div class="track-info">
                    <span class="track-title">${track.title}</span>
                    <span class="track-sub">${track.bpm} BPM | ${track.type}</span>
                </div>
                <div class="waveform-box">${bars}</div>
                <a href="${track.file}" class="download-link">Download</a>
            `;
            section.appendChild(row);
        });
        container.appendChild(section);
    });

    // 3. SEARCH FUNCTIONALITY
    const searchInput = document.getElementById('sound-search');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        document.querySelectorAll('.category-section').forEach(section => {
            let hasVisibleTracks = false;
            
            section.querySelectorAll('.track-row').forEach(row => {
                const title = row.querySelector('.track-title').textContent.toLowerCase();
                const sub = row.querySelector('.track-sub').textContent.toLowerCase();
                
                if (title.includes(query) || sub.includes(query)) {
                    row.style.display = 'flex';
                    hasVisibleTracks = true;
                } else {
                    row.style.display = 'none';
                }
            });
            
            section.style.display = hasVisibleTracks ? 'block' : 'none';
        });
    });
});

// 4. AUDIO PLAYER LOGIC (FIXED & BULLETPROOF)

let currentAudio = new Audio();
let currentTrack = ""; // This tracks the exact file string, ignoring browser URL changes

// Auto-reset all buttons to 'Play' when a song naturally finishes
currentAudio.addEventListener('ended', () => {
    document.querySelectorAll('.play-btn').forEach(b => b.textContent = '▶');
});

function playAudio(src, btn) {
    // Check if we are clicking the exact same track that is already loaded
    if (currentTrack === src) {
        if (currentAudio.paused) {
            currentAudio.play();
            btn.textContent = '⏸';
        } else {
            currentAudio.pause();
            btn.textContent = '▶';
        }
    } else {
        // We are clicking a brand new track
        currentTrack = src;
        currentAudio.src = src;
        currentAudio.play();
        
        // Reset all other buttons to the play icon
        document.querySelectorAll('.play-btn').forEach(b => b.textContent = '▶');
        
        // Change the button we just clicked to the pause icon
        btn.textContent = '⏸';
    }
}

// 5. FORCE DOWNLOAD LOGIC
document.addEventListener('click', function(e) {
    const downloadLink = e.target.closest('.download-link');
    
    if (downloadLink) {
        e.preventDefault();
        
        const trackRow = downloadLink.closest('.track-row');
        const trackTitle = trackRow.querySelector('.track-title').textContent.trim();
        
        const fileUrl = downloadLink.getAttribute('href');
        const extension = fileUrl.split('.').pop();
        const fileName = `${trackTitle}.${extension}`;
        
        fetch(fileUrl)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = window.URL.createObjectURL(blob);
                const tempLink = document.createElement('a');
                tempLink.style.display = 'none';
                tempLink.href = blobUrl;
                tempLink.download = fileName;
                
                document.body.appendChild(tempLink);
                tempLink.click();
                
                window.URL.revokeObjectURL(blobUrl);
                tempLink.remove();
            })
            .catch(error => {
                console.error("Fetch failed, opening in new tab instead.", error);
                window.open(fileUrl, '_blank');
            });
    }
});