const searchIndex = [
    { title: "Home", url: "home.html", keywords: "home main landing dashboard walchand college engineering sangli excellence legacy 1947" },
    { title: "About Us", url: "about.html", keywords: "about history vision mission director message milestones heritage seth walchand hirachand governance administrative council" },
    { title: "Academics", url: "academics.html", keywords: "academics departments overview undergraduate postgraduate diploma OBE choice based credit system engineering programs" },
    { title: "Admissions", url: "admissions.html", keywords: "admissions btech mtech phd diploma cutoffs fees eligibility apply CAP rounds merit list notifications DTE 6007 aided unaided" },
    { title: "Placements", url: "placements.html", keywords: "placements recruiting tpo companies salary packages statistics internships highest average records hiring partners careers" },
    { title: "Campus Life", url: "campus-life.html", keywords: "campus life hostels sports library facilities gymkhana events infrastructure virtual tour amenities student activities" },
    { title: "Research & Innovation", url: "research.html", keywords: "research innovation patents publications labs funding projects doctoral PhD development R&D research areas" },
    { title: "Student Clubs", url: "clubs.html", keywords: "clubs technical cultural wce acm wlug gdsc rotaract sae art circle dps student activities societies extra-curricular" },
    { title: "Contact Us", url: "contact.html", keywords: "contact address map phone email enquiry location vishrambag sangli helpline directory office timings" },
    { title: "Notices & Announcements", url: "notices.html", keywords: "notices announcements news circulars updates recent events examination results timetables scholarship" },
    
    // Departments
    { title: "Civil Engineering", url: "dept-civil.html", keywords: "civil engineering construction structures survey HOD Dr. S. N. Tande btech mtech pavement environmental" },
    { title: "Mechanical Engineering", url: "dept-mech.html", keywords: "mechanical engineering robotics thermodynamics manufacturing CAD HOD Dr. S. U. Sapkal btech mtech thermal production design" },
    { title: "Electrical Engineering", url: "dept-elec.html", keywords: "electrical engineering power systems control machines HOD Dr. D. R. Patil btech mtech energy transmission" },
    { title: "Computer Science & Engineering", url: "dept-cse.html", keywords: "computer science engineering CSE software programming algorithms HOD Dr. A. R. Surve btech mtech coding data structures" },
    { title: "Information Technology", url: "dept-it.html", keywords: "information technology IT cloud computing cyber security networking HOD Dr. R. R. Rathod btech mtech software development" },
    { title: "Electronics Engineering", url: "dept-elec-comm.html", keywords: "electronics engineering communication VLSI embedded systems HOD Dr. A. A. Agashe btech mtech signals digital" },
    { title: "AI & Machine Learning", url: "dept-aiml.html", keywords: "artificial intelligence machine learning AI ML data science automation HOD Dr. N. V. Dharwadkar btech mtech neural networks" },
    { title: "Robotics & Automation", url: "dept-robotics.html", keywords: "robotics automation industry 4.0 mechatronics sensors HOD Dr. S. B. Chavan btech mechatronics control" }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Search Modal HTML and CSS into the DOM
    if (!document.getElementById('wce-search-modal')) {
        const modalHTML = `
            <style>
                #wce-search-modal {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 15, 20, 0.85);
                    backdrop-filter: blur(8px);
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 10vh;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                }
                #wce-search-modal.active {
                    opacity: 1;
                    pointer-events: auto;
                }
                .search-modal-container {
                    width: 90%;
                    max-width: 650px;
                    background: var(--bg-card, #fff);
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                    overflow: hidden;
                    transform: translateY(-20px);
                    transition: transform 0.3s ease;
                    border: 1px solid var(--border-subtle, #eaeaea);
                }
                #wce-search-modal.active .search-modal-container {
                    transform: translateY(0);
                }
                .search-header {
                    display: flex;
                    align-items: center;
                    padding: 16px 24px;
                    border-bottom: 1px solid var(--border-subtle, #eaeaea);
                }
                .search-header input {
                    flex: 1;
                    border: none;
                    outline: none;
                    font-size: 20px;
                    font-family: inherit;
                    padding: 10px;
                    color: var(--text-primary, #1a1a1a);
                    background: transparent;
                }
                .search-header .close-btn {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: var(--text-secondary, #888);
                    transition: color 0.2s;
                }
                .search-header .close-btn:hover {
                    color: var(--red, #c0392b);
                }
                .search-results {
                    max-height: 50vh;
                    overflow-y: auto;
                    padding: 12px;
                    background: var(--bg-card, #fff);
                }
                .search-result-item {
                    display: block;
                    padding: 14px 18px;
                    border-radius: 8px;
                    text-decoration: none;
                    color: var(--text-primary, #1a1a1a);
                    margin-bottom: 6px;
                    transition: background 0.2s;
                    border: 1px solid transparent;
                }
                .search-result-item:hover {
                    background: var(--bg-main, #f4f4f5);
                    border-color: var(--border-subtle, #eaeaea);
                }
                .search-result-item .title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 4px;
                    color: var(--red, #c0392b);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .search-result-item .path {
                    font-size: 12px;
                    color: var(--text-secondary, #6b6b6b);
                }
                .no-results {
                    padding: 30px;
                    text-align: center;
                    color: var(--text-secondary, #6b6b6b);
                    font-size: 15px;
                }
                mark {
                    background: rgba(192, 57, 43, 0.2);
                    color: inherit;
                    font-weight: bold;
                    padding: 0 2px;
                    border-radius: 2px;
                }
            </style>
            <div id="wce-search-modal">
                <div class="search-modal-container">
                    <div class="search-header">
                        <span style="font-size:22px; color:var(--red, #c0392b); margin-right:10px;">🔍</span>
                        <input type="text" id="wce-search-input" placeholder="Search departments, notices, people..." autocomplete="off">
                        <button class="close-btn" id="wce-search-close">&times;</button>
                    </div>
                    <div class="search-results" id="wce-search-results">
                        <!-- Results appended here -->
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const modal = document.getElementById('wce-search-modal');
    const input = document.getElementById('wce-search-input');
    const closeBtn = document.getElementById('wce-search-close');
    const resultsContainer = document.getElementById('wce-search-results');

    // 2. Bind the opens
    const searchButtons = document.querySelectorAll('button[title="Quick Search"], .header-grid-item[title="Quick Search"]');
    searchButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            input.value = '';
            resultsContainer.innerHTML = '';
            setTimeout(() => input.focus(), 100);
        });
    });

    // 3. Close Logic
    const closeModal = () => {
        modal.classList.remove('active');
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') closeModal();
    });

    // 4. Search Logic
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        resultsContainer.innerHTML = '';

        if(query.length < 1) {
            resultsContainer.innerHTML = '<div class="no-results">Type to search for pages, departments, and more...</div>';
            return;
        }

        const queryWords = query.split(/\s+/).filter(w => w.length > 0);
        
        const matches = searchIndex.filter(item => {
            const itemText = (item.title + " " + item.keywords).toLowerCase();
            // Check if every word in query appears in itemText
            return queryWords.every(word => itemText.includes(word));
        });

        if(matches.length === 0) {
            resultsContainer.innerHTML = `<div class="no-results">No results found for "${query}"</div>`;
            return;
        }

        matches.forEach(item => {
            const el = document.createElement('a');
            el.href = item.url;
            el.className = 'search-result-item';
            
            // Basic title highlighting
            let displayTitle = item.title;
            queryWords.forEach(word => {
                const regex = new RegExp(`(${word})`, 'gi');
                displayTitle = displayTitle.replace(regex, '<mark>$1</mark>');
            });

            el.innerHTML = `
                <div class="title">${displayTitle}</div>
                <div class="path">walchandsangli.ac.in / ${item.url.replace('.html', '').replace('dept-', 'academics/')}</div>
            `;
            resultsContainer.appendChild(el);
        });
    });
});
