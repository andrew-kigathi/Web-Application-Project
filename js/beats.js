// BEATS.JS - Audio Library, Search, Player & Download Engine

document.addEventListener("DOMContentLoaded", () => {
    // 1. BEATS DATA
    const libraryData = {
        "Trap Beats": [
            { title: "Midnight Run", bpm: 142, key: "C# minor", file: "audio/beats/trap/trap-1.mp3" },
            { title: "Heavy Crown", bpm: 130, key: "F minor", file: "audio/beats/trap/trap-2.mp3" },
            { title: "Atlanta Nights", bpm: 145, key: "E minor", file: "audio/beats/trap/trap-3.mp3" },
            { title: "808 Mafia Vibes", bpm: 138, key: "D minor", file: "audio/beats/trap/trap-4.mp3" }
        ],
        "Vibe Beats": [
            { title: "Coffee Shop Rain", bpm: 82, key: "G major", file: "audio/beats/vibe/vibe-1.mp3" },
            { title: "Late Study Session", bpm: 78, key: "A minor", file: "audio/beats/vibe/vibe-2.mp3" },
            { title: "Vinyl Memories", bpm: 85, key: "C major", file: "audio/beats/vibe/vibe-3.mp3" },
            { title: "Sunset Drive", bpm: 90, key: "F major", file: "audio/beats/vibe/vibe-4.mp3" }
        ],
        "Rage Beats": [
            { title: "Smooth Transitions", bpm: 95, key: "Eb minor", file: "audio/beats/rage/rage-1.mp3" },
            { title: "Late Night Text", bpm: 100, key: "Bb minor", file: "audio/beats/rage/rage-2.mp3" },
            { title: "Summer Fling", bpm: 110, key: "Ab major", file: "audio/beats/rage/rage-3.mp3" }
        ],
        "Ethereal Beats": [
            { title: "London Fog", bpm: 144, key: "F# minor", file: "audio/beats/ethereal/ethereal-1.mp3" },
            { title: "Sliding 808s", bpm: 142, key: "C minor", file: "audio/beats/ethereal/ethereal-2.mp3" },
            { title: "Brooklyn Aggression", bpm: 140, key: "G minor", file: "audio/beats/ethereal/ethereal-3.mp3" }
        ],

        "Guitar Beats": [
            { title: "London Fog", bpm: 144, key: "F# minor", file: "audio/beats/guitar/guitar-1.mp3" },
            { title: "Sliding 808s", bpm: 142, key: "C minor", file: "audio/beats/guitar/guitar-2.mp3" },
            { title: "Brooklyn Aggression", bpm: 140, key: "G minor", file: "audio/beats/guitar/guitar-3.mp3" }
        ],

        "Old School": [
            { title: "London Fog", bpm: 144, key: "F# minor", file: "audio/beats/old-school/os-1.mp3" },
            { title: "Sliding 808s", bpm: 142, key: "C minor", file: "audio/beats/old-school/os-2.mp3" },
            { title: "Brooklyn Aggression", bpm: 140, key: "G minor", file: "audio/beats/old-school/os-3.mp3" }
        ],
    };

const container = document.getElementById('library-container');

    Object.entries(libraryData).forEach(([catName, tracks]) => {
        const section = document.createElement('section');
        section.className = 'category-section';
        section.innerHTML = `<h2 class="category-header">${catName}</h2>`;
        
        tracks.forEach(track => {
            const row = document.createElement('div');
            row.className = 'track-row';
            row.innerHTML = `
                <button class="play-btn" onclick="playAudio('${track.file}', this)">▶</button>
                <div class="track-info">
                    <span class="track-title">${track.title}</span>
                    <span class="track-sub">${track.bpm} BPM | ${track.key}</span>
                </div>
                <div class="waveform-box"></div>
                <a href="${track.file}" class="download-link">Download</a>
            `;
            section.appendChild(row);
        });
        container.appendChild(section);
    });

    // Simple Search
    const searchInput = document.getElementById('sound-search');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.track-row').forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? 'flex' : 'none';
        });
    });
});

// Audio Logic
let currentAudio = new Audio();
let currentTrack = "";

window.playAudio = function(src, btn) {
    if (currentTrack === src) {
        if (currentAudio.paused) { currentAudio.play(); btn.textContent = '⏸'; }
        else { currentAudio.pause(); btn.textContent = '▶'; }
    } else {
        currentTrack = src;
        currentAudio.src = src;
        currentAudio.play();
        document.querySelectorAll('.play-btn').forEach(b => b.textContent = '▶');
        btn.textContent = '⏸';
    }
}