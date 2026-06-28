document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById('upload-form');

    // ==========================================
    // 1. AUTHENTICATION CHECK
    // ==========================================
    // Check if the browser storage has a logged-in flag
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn || isLoggedIn !== 'true') {
        // User is NOT logged in. Overwrite the form with a locked message.
        uploadForm.innerHTML = `
            <div class="text-center py-5">
                <div style="font-size: 4rem; margin-bottom: 20px;">🔒</div>
                <h2 class="mb-3" style="color: #b542ff;">Authentication Required</h2>
                <p class="text-secondary mb-4 fs-5">You must be logged in to upload and share your sounds with the community.</p>
                <a href="login.html" class="btn custom-btn px-5 py-3 fw-bold fs-5">Go to Login Page</a>
            </div>
        `;
        return; // Stop the rest of the script so the drag-and-drop logic doesn't throw errors
    }

    // ==========================================
    // 2. UPLOAD LOGIC (Only runs if logged in)
    // ==========================================
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    const fileDisplay = document.getElementById('file-display');
    const fileError = document.getElementById('file-error');
    const submitBtn = document.getElementById('submit-btn');

    let currentFile = null;

    // Trigger hidden file input when "Browse Files" is clicked
    browseBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle Drag & Drop Visuals
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    // Handle File Selection via Browse
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            handleFile(this.files[0]);
        }
    });

    // Validate and Process File
    function handleFile(file) {
        fileDisplay.style.display = 'none';
        fileError.style.display = 'none';
        submitBtn.disabled = true;

        const fileName = file.name.toLowerCase();
        if (!fileName.endsWith('.wav') && !fileName.endsWith('.mp3')) {
            fileError.textContent = "Error: Only .WAV and .MP3 files are allowed.";
            fileError.style.display = 'block';
            currentFile = null;
            return;
        }

        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
            fileError.textContent = "Error: File size must be under 50MB.";
            fileError.style.display = 'block';
            currentFile = null;
            return;
        }

        currentFile = file;
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
        fileDisplay.textContent = `Selected: ${file.name} (${sizeInMB} MB)`;
        fileDisplay.style.display = 'block';
        submitBtn.disabled = false;
    }

    // Handle Form Submission
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentFile) return;

        const title = document.getElementById('track-title').value;
        
        submitBtn.disabled = true;
        submitBtn.textContent = "Uploading...";

        setTimeout(() => {
            alert(`Success! "${title}" has been processed.`);
            uploadForm.reset();
            fileDisplay.style.display = 'none';
            currentFile = null;
            submitBtn.textContent = "Upload Track";
        }, 1500);
    });
});