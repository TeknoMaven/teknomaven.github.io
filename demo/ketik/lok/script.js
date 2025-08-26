// Default Requirements and Documents
const defaultRequirements = [
    "Disarankan jurusan Multimedia",
    "Level Pekerjaan : Mahasiswa",
    "Jenis kelamin : Semua Jenis Kelamin",
    "Tidak ada syarat tinggi Laki-Laki",
    "Tidak ada syarat tinggi Perempuan",
    "Boleh buta warna, Boleh berkaca mata",
    "Tidak ada batas usia",
    "Penempatan di Gg. Iii, Tahunan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55167, Kota Yogyakarta, Di Yogyakarta",
    "Batas Pendaftaran 30 November 2024",
    "Pendaftaran online : Tersedia",
    "Tipe lowongan : Umum",
    "Membutuhkan data nilai : Tidak",
    "Membutuhkan kelengkapan scan dokumen : Tidak"
];

const defaultDocuments = [
    "Surat Lamaran Kerja",
    "Daftar Riwayat Hidup (CV)",
    "Fotocopy KTP",
    "Fotocopy Ijazah & Transkrip Nilai",
    "Pas Foto 4x6 berwarna (2 lembar)",
    "Fotocopy SKCK",
    "Fotocopy Kartu Keluarga",
    "Fotocopy NPWP",
    "Surat Keterangan Sehat",
    "Fotocopy Paklaring/Surat Pengalaman Kerja (jika ada)"
];

// Initialize form on page load
window.addEventListener('load', function() {
    setupEventListeners();
    setDefaultValues();
    modifySelectElements();
    initializeForm();
    setupRealtimePreview();
});

// Function to initialize form
function initializeForm() {
    initializeRequirements();
    initializeDocuments();
    updatePreview();
}

// Function to generate form status checklist
function generateFormStatusPreview(formData) {
    const { company, jobSpecifics, jobInfo, requirements, documents, platforms } = formData;
    
    // Check required fields status
    const requiredStatus = {
        companyName: !!company.name,
        companyDescription: !!company.description,
        position: !!jobInfo.position,
        jobDescription: !!jobInfo.description,
        location: !!jobInfo.location,
        deadline: !!jobInfo.deadline
    };

    // Check optional fields status
    const optionalStatus = {
        companyInfo: !!(company.category || company.website || company.type || company.scale),
        jobSpecifics: !!(jobSpecifics.suggestedMajor || jobSpecifics.level || jobSpecifics.gender),
        additionalJobInfo: !!(jobInfo.workDays || jobInfo.dressCode),
        requirements: requirements.length > 0,
        documents: documents.length > 0,
        platforms: Object.values(platforms).some(p => p.active)
    };

    // Count completed required fields
    const requiredCompleted = Object.values(requiredStatus).filter(Boolean).length;
    const totalRequired = Object.keys(requiredStatus).length;

    // Generate HTML for the preview
    return `
    <div class="preview-content">
        <div class="status-section">
            <h3>Field Wajib</h3>
            <div class="status-list">
                <div class="status-item ${requiredStatus.companyName ? 'completed' : ''}">
                    ${requiredStatus.companyName ? '✓' : '○'} Nama Perusahaan
                </div>
                <div class="status-item ${requiredStatus.companyDescription ? 'completed' : ''}">
                    ${requiredStatus.companyDescription ? '✓' : '○'} Deskripsi Perusahaan
                </div>
                <div class="status-item ${requiredStatus.position ? 'completed' : ''}">
                    ${requiredStatus.position ? '✓' : '○'} Posisi
                </div>
                <div class="status-item ${requiredStatus.jobDescription ? 'completed' : ''}">
                    ${requiredStatus.jobDescription ? '✓' : '○'} Deskripsi Pekerjaan
                </div>
                <div class="status-item ${requiredStatus.location ? 'completed' : ''}">
                    ${requiredStatus.location ? '✓' : '○'} Lokasi
                </div>
                <div class="status-item ${requiredStatus.deadline ? 'completed' : ''}">
                    ${requiredStatus.deadline ? '✓' : '○'} Batas Pendaftaran
                </div>
            </div>
        </div>

        <div class="status-section">
            <h3>Informasi Tambahan</h3>
            <div class="status-list">
                <div class="status-item ${optionalStatus.companyInfo ? 'completed' : ''}">
                    ${optionalStatus.companyInfo ? '✓' : '○'} Info Perusahaan
                </div>
                <div class="status-item ${optionalStatus.jobSpecifics ? 'completed' : ''}">
                    ${optionalStatus.jobSpecifics ? '✓' : '○'} Spesifikasi Lowongan
                </div>
                <div class="status-item ${optionalStatus.additionalJobInfo ? 'completed' : ''}">
                    ${optionalStatus.additionalJobInfo ? '✓' : '○'} Info Tambahan
                </div>
                <div class="status-item ${optionalStatus.requirements ? 'completed' : ''}">
                    ${optionalStatus.requirements ? '✓' : '○'} Persyaratan
                </div>
                <div class="status-item ${optionalStatus.documents ? 'completed' : ''}">
                    ${optionalStatus.documents ? '✓' : '○'} Dokumen
                </div>
                <div class="status-item ${optionalStatus.platforms ? 'completed' : ''}">
                    ${optionalStatus.platforms ? '✓' : '○'} Platform Pendaftaran
                </div>
            </div>
        </div>
                <div class="completion-status">
            <div class="progress-bar">
                <div class="progress" style="width: ${(requiredCompleted/totalRequired) * 100}%"></div>
            </div>
            <p class="completion-text">
                ${requiredCompleted} dari ${totalRequired} field wajib terisi 
                (${Math.round((requiredCompleted/totalRequired) * 100)}%)
            </p>
        </div>
    </div>
    `;
}

// Function to update preview in sidebar
function updatePreview() {
    const formData = getFormData();
    const previewHtml = generateFormStatusPreview(formData);
    const previewContainer = document.getElementById('previewContainer');
    if (previewContainer) {
        previewContainer.innerHTML = previewHtml;
    }
}

// Set up event listeners for realtime preview
function setupRealtimePreview() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    document.getElementById('requirementsList').addEventListener('input', updatePreview);
    document.getElementById('documentsList').addEventListener('input', updatePreview);
}

// Setup Event Listeners
function setupEventListeners() {
    // Platform toggles
    document.getElementById('platformOnline')?.addEventListener('change', function() {
        document.getElementById('onlineDetails').style.display = this.checked ? 'block' : 'none';
        updatePreview();
    });

    document.getElementById('platformEmail')?.addEventListener('change', function() {
        document.getElementById('emailDetails').style.display = this.checked ? 'block' : 'none';
        updatePreview();
    });

    document.getElementById('platformPost')?.addEventListener('change', function() {
        document.getElementById('postDetails').style.display = this.checked ? 'block' : 'none';
        updatePreview();
    });

    document.getElementById('platformWalkin')?.addEventListener('change', function() {
        document.getElementById('walkinDetails').style.display = this.checked ? 'block' : 'none';
        updatePreview();
    });
}

// Modify select elements to include custom option
function modifySelectElements() {
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        // Add "Custom" option at the end
        const customOption = document.createElement('option');
        customOption.value = 'custom';
        customOption.text = '-- Custom --';
        select.add(customOption);

        // Add change event listener
        select.addEventListener('change', function() {
            if (this.value === 'custom') {
                const customValue = prompt('Masukkan nilai custom:');
                if (customValue) {
                    addCustomOption(this, customValue);
                    this.value = customValue;
                    updatePreview();
                } else {
                    this.value = this.options[0].value;
                }
            }
            updatePreview();
        });
    });
}

// Function to add custom option
function addCustomOption(selectElement, value) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value + ' (Custom)';
    selectElement.add(option);
}

// Set Default Values
function setDefaultValues() {
    document.getElementById('workDays').value = "Senin - Jumat";
    document.getElementById('companyScale').value = "50 - 200 Karyawan";
    
    // Set minimum date for deadline to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('deadline').min = today;
}

// Initialize Requirements List
function initializeRequirements() {
    const requirementsList = document.getElementById('requirementsList');
    requirementsList.innerHTML = '';
    defaultRequirements.forEach(req => {
        const div = document.createElement('div');
        div.className = 'requirement-item';
        div.innerHTML = `
            <input type="text" value="${req}" class="requirement-input">
            <button type="button" class="remove-btn" onclick="removeItem(this)">Hapus</button>
        `;
        requirementsList.appendChild(div);
    });
}

// Initialize Documents List
function initializeDocuments() {
    const documentsList = document.getElementById('documentsList');
    documentsList.innerHTML = '';
    defaultDocuments.forEach(doc => {
        const div = document.createElement('div');
        div.className = 'document-item';
        div.innerHTML = `
            <input type="text" value="${doc}" class="document-input">
            <button type="button" class="remove-btn" onclick="removeItem(this)">Hapus</button>
        `;
        documentsList.appendChild(div);
    });
}

// Add new requirement field
function addRequirement() {
    const requirementsList = document.getElementById('requirementsList');
    const div = document.createElement('div');
    div.className = 'requirement-item';
    div.innerHTML = `
        <input type="text" placeholder="Masukkan persyaratan" class="requirement-input">
        <button type="button" class="remove-btn" onclick="removeItem(this)">Hapus</button>
    `;
    requirementsList.appendChild(div);
    updatePreview();
}

// Add new document field
function addDocument() {
    const documentsList = document.getElementById('documentsList');
    const div = document.createElement('div');
    div.className = 'document-item';
    div.innerHTML = `
        <input type="text" placeholder="Masukkan berkas yang dilampirkan" class="document-input">
        <button type="button" class="remove-btn" onclick="removeItem(this)">Hapus</button>
    `;
    documentsList.appendChild(div);
    updatePreview();
}

// Remove an item
function removeItem(button) {
    button.parentElement.remove();
    updatePreview();
}

// Form validation
function validateForm() {
    const requiredFields = [
        'companyName',
        'companyDescription',
        'position',
        'jobDescription',
        'location',
        'deadline'
    ];

    let isValid = true;
    let firstInvalidField = null;

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field?.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
            if (!firstInvalidField) firstInvalidField = field;
        } else {
            field.style.borderColor = '#ddd';
        }
    });

    if (!isValid) {
        firstInvalidField?.focus();
        alert('Mohon lengkapi semua field yang wajib diisi');
        return false;
    }

    return true;
}

// Function to gather all form data
function getFormData() {
    return {
        company: {
            name: document.getElementById('companyName')?.value || '',
            description: document.getElementById('companyDescription')?.value || '',
            category: document.getElementById('companyCategory')?.value || '',
            website: document.getElementById('website')?.value || '',
            type: document.getElementById('companyType')?.value || '',
            scale: document.getElementById('companyScale')?.value || ''
        },
        jobSpecifics: {
            suggestedMajor: document.getElementById('suggestedMajor')?.value || '',
            level: document.getElementById('jobLevel')?.value || '',
            gender: document.getElementById('gender')?.value || ''
        },
        jobInfo: {
            position: document.getElementById('position')?.value || '',
            description: document.getElementById('jobDescription')?.value || '',
            location: document.getElementById('location')?.value || '',
            deadline: document.getElementById('deadline')?.value || '',
            workDays: document.getElementById('workDays')?.value || '',
            dressCode: document.getElementById('dressCode')?.value || ''
        },
        requirements: Array.from(document.querySelectorAll('.requirement-input'))
            .map(input => input.value.trim())
            .filter(value => value),
        documents: Array.from(document.querySelectorAll('.document-input'))
            .map(input => input.value.trim())
            .filter(value => value),
        platforms: {
            online: {
                active: document.getElementById('platformOnline')?.checked || false,
                link: document.getElementById('onlineLink')?.value || '',
                description: document.getElementById('onlineDescription')?.value || ''
            },
            email: {
                active: document.getElementById('platformEmail')?.checked || false,
                address: document.getElementById('emailAddress')?.value || '',
                description: document.getElementById('emailDescription')?.value || ''
            },
            post: {
                active: document.getElementById('platformPost')?.checked || false,
                address: document.getElementById('postAddress')?.value || '',
                description: document.getElementById('postDescription')?.value || ''
            },
            walkin: {
                active: document.getElementById('platformWalkin')?.checked || false,
                address: document.getElementById('walkinAddress')?.value || '',
                schedule: document.getElementById('walkinSchedule')?.value || '',
                description: document.getElementById('walkinDescription')?.value || ''
            }
        }
    };
}

// Generate HTML Template
// Generate HTML Template (continued)
function generateHTMLTemplate(formData) {
    const { company, jobSpecifics, jobInfo, requirements, documents, platforms } = formData;
    
    let html = `
    <div class="artikel-lowongan">
        <div class="job-post">
            <h1>Info Lowongan Kerja ${company.name} Terbaru</h1>
            
            <div class="company-profile">
                <h2>Tentang Perusahaan</h2>
                <p>${company.description}</p>
            </div>

            <div class="job-details">
                <h2>Informasi Lowongan</h2>
                <h3>Posisi: ${jobInfo.position}</h3>
                
                <h3>Spesifikasi:</h3>
                <ul>
                    <li>Jurusan: ${jobSpecifics.suggestedMajor}</li>
                    <li>Level: ${jobSpecifics.level}</li>
                    <li>Jenis Kelamin: ${jobSpecifics.gender}</li>
                </ul>

                <h3>Persyaratan:</h3>
                <ul>
                    ${requirements.map(req => `<li>${req}</li>`).join('\n                    ')}
                </ul>

                <h3>Berkas Yang Dilampirkan:</h3>
                <ul>
                    ${documents.map(doc => `<li>${doc}</li>`).join('\n                    ')}
                </ul>

                <h3>Deskripsi Pekerjaan:</h3>
                <div class="job-description">
                    ${jobInfo.description.split('\n').map(desc => `<p>${desc}</p>`).join('\n                    ')}
                </div>
            </div>`;

    // Add platform information
    if (Object.values(platforms).some(p => p.active)) {
        html += `
            <div class="application-process">
                <h2>Cara Pendaftaran:</h2>`;

        if (platforms.online.active) {
            html += `
                <div class="platform-section">
                    <h3>Pendaftaran Online:</h3>
                    <p><strong>Link:</strong> <a href="${platforms.online.link}">${platforms.online.link}</a></p>
                    <p>${platforms.online.description}</p>
                </div>`;
        }

        if (platforms.email.active) {
            html += `
                <div class="platform-section">
                    <h3>Pendaftaran Via Email:</h3>
                    <p><strong>Email:</strong> ${platforms.email.address}</p>
                    <p>${platforms.email.description}</p>
                </div>`;
        }

        if (platforms.post.active) {
            html += `
                <div class="platform-section">
                    <h3>Pendaftaran Via Pos:</h3>
                    <p><strong>Alamat:</strong></p>
                    <p>${platforms.post.address}</p>
                    <p>${platforms.post.description}</p>
                </div>`;
        }

        if (platforms.walkin.active) {
            html += `
                <div class="platform-section">
                    <h3>Pendaftaran Langsung (Walk-in):</h3>
                    <p><strong>Alamat:</strong></p>
                    <p>${platforms.walkin.address}</p>
                    <p><strong>Jadwal:</strong> ${platforms.walkin.schedule}</p>
                    <p>${platforms.walkin.description}</p>
                </div>`;
        }

        html += `
            </div>`;
    }

    html += `
            <div class="company-info">
                <h2>Informasi Tambahan</h2>
                <ul>
                    <li><strong>Kategori:</strong> ${company.category}</li>
                    <li><strong>Website:</strong> ${company.website}</li>
                    <li><strong>Jenis Perusahaan:</strong> ${company.type}</li>
                    <li><strong>Skala Perusahaan:</strong> ${company.scale}</li>
                    <li><strong>Hari Kerja:</strong> ${jobInfo.workDays}</li>
                    <li><strong>Gaya Berpakaian:</strong> ${jobInfo.dressCode}</li>
                    <li><strong>Batas Pendaftaran:</strong> ${jobInfo.deadline}</li>
                    <li><strong>Lokasi:</strong> ${jobInfo.location}</li>
                </ul>
            </div>
        </div>
    </div>`;

    return html;
}

// Generate HTML
function generateHtml() {
    if (!validateForm()) return;
    
    const formData = getFormData();
    const html = generateHTMLTemplate(formData);
    
    const generatedHtmlElement = document.getElementById('generatedHtml');
    generatedHtmlElement.style.display = 'block';
    generatedHtmlElement.textContent = html;
    
    document.querySelector('.copy-btn').style.display = 'block';
}

// Copy HTML to clipboard
function copyHtml() {
    const htmlContent = document.getElementById('generatedHtml').textContent;
    navigator.clipboard.writeText(htmlContent)
        .then(() => alert('HTML berhasil disalin!'))
        .catch(err => alert('Gagal menyalin HTML: ' + err));
}