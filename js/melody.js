document.addEventListener("DOMContentLoaded", () => {
    // 1. DATA
    const libraryData = {
        "Rap Melodies": [
            { title: "Dark Trap Bells", bpm: 140, key: "E minor", file: "audio/melodies/rap/rap-1.wav" },
            { title: "Melodic Drill Piano", bpm: 144, key: "C minor", file: "audio/melodies/rap/rap-2.wav" },
            { title: "Atlanta Studio Keys", bpm: 132, key: "F# minor", file: "audio/melodies/rap/rap-3.wav" },
            { title: "Hardcore Bounce Pad", bpm: 130, key: "G# minor", file: "audio/melodies/rap/rap-4.wav" },
            { title: "Smoked Out Synth", bpm: 125, key: "D major", file: "audio/melodies/rap/rap-5.wav" },
            { title: "Rap Title 6", bpm: "000", key: "X minor", file: "audio/melodies/rap/rap-6.wav" },
            { title: "Rap Title 7", bpm: "000", key: "X minor", file: "audio/melodies/rap/rap-7.wav" }
        ],
        "Old School Melodies": [
            { title: "Vinyl Sample Chop", bpm: 88, key: "F minor", file: "audio/melodies/old-school/os-1.wav" },
            { title: "Queensbridge Rhodes", bpm: 92, key: "C minor", file: "audio/melodies/old-school/os-2.wav" },
            { title: "G-Funk Whistle Lead", bpm: 95, key: "A minor", file: "audio/melodies/old-school/os-3.wav" },
            { title: "Soul Horn Quartet", bpm: 86, key: "G major", file: "audio/melodies/old-school/os-4.wav" },
            { title: "Crate Digger Keys", bpm: 90, key: "D minor", file: "audio/melodies/old-school/os-5.wav" },
            { title: "Old School Title 6", bpm: "000", key: "X minor", file: "audio/melodies/old-school/os-6.wav" },
            { title: "Old School Title 7", bpm: "000", key: "X minor", file: "audio/melodies/old-school/os-7.wav" }
        ],
        "Guitar Melodies": [
            { title: "Sad Acoustic Plucks", bpm: 130, key: "A minor", file: "audio/melodies/guitar/guitar-1.wav" },
            { title: "Spanish Nylon Roll", bpm: 120, key: "D minor", file: "audio/melodies/guitar/guitar-2.wav" },
            { title: "Reverb Indie Strum", bpm: 118, key: "G major", file: "audio/melodies/guitar/guitar-3.wav" },
            { title: "Trap Guitar Lick", bpm: 140, key: "E minor", file: "audio/melodies/guitar/guitar-4.wav" },
            { title: "Heavy Distorted Riff", bpm: 150, key: "C minor", file: "audio/melodies/guitar/guitar-5.wav" },
            { title: "Guitar Title 6", bpm: "000", key: "X minor", file: "audio/melodies/guitar/guitar-6.wav" },
            { title: "Guitar Title 7", bpm: "000", key: "X minor", file: "audio/melodies/guitar/guitar-7.wav" }
        ],
        "Rage Melodies": [
            { title: "Hyperpop Saw Lead", bpm: 155, key: "C# minor", file: "audio/melodies/rage/rage-1.wav" },
            { title: "Opium Chords", bpm: 160, key: "E minor", file: "audio/melodies/rage/rage-2.wav" },
            { title: "Synthetic Victory", bpm: 152, key: "F major", file: "audio/melodies/rage/rage-3.wav" },
            { title: "Cyber Overdrive", bpm: 158, key: "A minor", file: "audio/melodies/rage/rage-4.wav" },
            { title: "Vamp Attack Pads", bpm: 145, key: "D minor", file: "audio/melodies/rage/rage-5.wav" },
            { title: "Rage Title 6", bpm: "000", key: "X minor", file: "audio/melodies/rage/rage-6.wav" },
            { title: "Rage Title 7", bpm: "000", key: "X minor", file: "audio/melodies/rage/rage-7.wav" }
        ],
        "Ethereal Melodies": [
            { title: "Floating Pad Harmony", bpm: 120, key: "E minor", file: "audio/melodies/ethereal/ethereal-1.wav" },
            { title: "Cloud 9 Ambient Pluck", bpm: 115, key: "C major", file: "audio/melodies/ethereal/ethereal-2.wav" },
            { title: "Celestial Arp Sequence", bpm: 125, key: "F major", file: "audio/melodies/ethereal/ethereal-3.wav" },
            { title: "Dreamscapes Texture", bpm: 110, key: "A minor", file: "audio/melodies/ethereal/ethereal-4.wav" },
            { title: "Star Map Chimes", bpm: 135, key: "G# minor", file: "audio/melodies/ethereal/ethereal-5.wav" },
            { title: "Ethereal Title 6", bpm: "000", key: "X minor", file: "audio/melodies/ethereal/ethereal-6.wav" },
            { title: "Ethereal Title 7", bpm: "000", key: "X minor", file: "audio/melodies/ethereal/ethereal-7.wav" }
        ],
        "Chill Melodies": [
            { title: "Lofi Sunset Keys", bpm: 80, key: "C major", file: "audio/melodies/chill/chill-1.wav" },
            { title: "Lazy Sunday Guitar", bpm: 85, key: "F# minor", file: "audio/melodies/chill/chill-2.wav" },
            { title: "Submerged Electric Piano", bpm: 78, key: "Bb minor", file: "audio/melodies/chill/chill-3.wav" },
            { title: "Cozy Coffee Synth", bpm: 82, key: "G major", file: "audio/melodies/chill/chill-4.wav" },
            { title: "After Hours Ambient", bpm: 75, key: "A minor", file: "audio/melodies/chill/chill-5.wav" },
            { title: "Chill Title 6", bpm: "000", key: "X minor", file: "audio/melodies/chill/chill-6.wav" },
            { title: "Chill Title 7", bpm: "000", key: "X minor", file: "audio/melodies/chill/chill-7.wav" }
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
                    <span class="track-sub">${track.bpm} BPM | ${track.key}</span>
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

// 4. AUDIO PLAYER LOGIC
let currentAudio = new Audio();
function playAudio(src, btn) {
    if (currentAudio.src.includes(src)) {
        currentAudio.paused ? currentAudio.play() : currentAudio.pause();
        btn.textContent = currentAudio.paused ? '▶' : '⏸';
    } else {
        currentAudio.src = src;
        currentAudio.play();
        document.querySelectorAll('.play-btn').forEach(b => b.textContent = '▶');
        btn.textContent = '⏸';
    }
}

// 5. FORCE DOWNLOAD LOGIC
document.addEventListener('click', function(e) {
    const downloadLink = e.target.closest('.download-link');
    
    if (downloadLink) {
        e.preventDefault();
        
        // Find the parent row to extract the display title
        const trackRow = downloadLink.closest('.track-row');
        const trackTitle = trackRow.querySelector('.track-title').textContent.trim();
        
        const fileUrl = downloadLink.getAttribute('href');
        
        // Extract the file extension (e.g., 'wav')
        const extension = fileUrl.split('.').pop();
        const fileName = `${trackTitle}.${extension}`;
        
        // Fetch the file and force the download with the new name
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