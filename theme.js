(function() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    document.addEventListener('DOMContentLoaded', () => {
        const themeBtn = document.querySelector('button[title="Toggle Dark Mode"]');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                let theme = document.documentElement.getAttribute('data-theme');
                if (theme === 'dark') {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                }
            });
        }

        // Assistant Working Implementation
        const chatbotHTML = `
        <div class="chatbot-window" id="chatbotWindow" style="display: none; position: fixed; bottom: 95px; right: 28px; width: 380px; height: 600px; background: rgba(26, 26, 26, 0.95); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); flex-direction: column; overflow: hidden; z-index: 2000; font-family: 'DM Sans', sans-serif; transition: all 0.3s ease-in-out;">
            <div style="padding: 20px; background: rgba(142, 28, 15, 0.95); color: #fff; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 28px;">🤖</span>
                    <div>
                        <h4 style="margin: 0; font-size: 16px; font-weight: 600;">WCE Smart Assistant</h4>
                        <span style="font-size: 11px; color: rgba(255, 255, 255, 0.7); display: flex; align-items: center; gap: 5px;"><span style="width: 8px; height: 8px; background: #2ecc71; border-radius: 50%; display: inline-block;"></span> Online</span>
                    </div>
                </div>
                <button id="closeChatbot" style="background: none; border: none; color: #fff; font-size: 24px; cursor: pointer; line-height: 1;">&times;</button>
            </div>
            
            <div id="chatbotMessages" style="flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; background: rgba(10, 10, 10, 0.5);">
                <div style="align-self: flex-start; background: rgba(255, 255, 255, 0.08); padding: 12px 16px; border-radius: 16px 16px 16px 4px; max-width: 80%; color: #fff; font-size: 14px; line-height: 1.5;">
                    Hello! Welcome to Walchand College of Engineering. How can I assist you today?
                </div>
            </div>

            <div style="padding: 15px; display: flex; gap: 10px; background: rgba(20, 20, 20, 0.8); border-top: 1px solid rgba(255, 255, 255, 0.08);">
                <input type="text" id="chatbotInput" placeholder="Type your query here..." style="flex: 1; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 12px; color: #fff; font-size: 14px; outline: none; transition: border-color 0.2s;" />
                <button id="sendChatbotMessage" style="background: #8e1c0f; border: none; color: #fff; border-radius: 12px; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s;">➔</button>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);

        const chatbotFab = document.querySelector('.chatbot-fab');
        if (chatbotFab) {
            chatbotFab.addEventListener('click', () => {
                const win = document.getElementById('chatbotWindow');
                if (win.style.display === 'none' || win.style.display === '') {
                    win.style.display = 'flex';
                    document.getElementById('chatbotInput').focus();
                } else {
                    win.style.display = 'none';
                }
            });
        }

        const closeBtn = document.getElementById('closeChatbot');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.getElementById('chatbotWindow').style.display = 'none';
            });
        }

        const msgBox = document.getElementById('chatbotMessages');
        const inputField = document.getElementById('chatbotInput');
        const sendBtn = document.getElementById('sendChatbotMessage');

        function addMessage(text, isBot = false) {
            const msg = document.createElement('div');
            msg.style.alignSelf = isBot ? 'flex-start' : 'flex-end';
            msg.style.background = isBot ? 'rgba(255, 255, 255, 0.08)' : 'rgba(142, 28, 15, 0.85)';
            msg.style.padding = '12px 16px';
            msg.style.borderRadius = isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px';
            msg.style.maxWidth = '80%';
            msg.style.color = '#fff';
            msg.style.fontSize = '14px';
            msg.style.lineHeight = '1.5';
            msg.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            msg.innerHTML = text;
            msgBox.appendChild(msg);
            msgBox.scrollTop = msgBox.scrollHeight;
        }

        function processQuery(query) {
            const q = query.toLowerCase();
            
            const typing = document.createElement('div');
            typing.id = 'typingIndicator';
            typing.style.alignSelf = 'flex-start';
            typing.style.background = 'rgba(255, 255, 255, 0.05)';
            typing.style.padding = '10px 15px';
            typing.style.borderRadius = '12px';
            typing.style.color = 'rgba(255,255,255,0.6)';
            typing.style.fontSize = '13px';
            typing.innerHTML = 'Typing...';
            msgBox.appendChild(typing);
            msgBox.scrollTop = msgBox.scrollHeight;

            setTimeout(() => {
                typing.remove();
                
                if (q.includes('admission') || q.includes('fee') || q.includes('apply')) {
                    addMessage("Walchand College of Engineering offers top-tier technical tracks. Learn about entry criteria, procedures, and expense rules on the <a href='admissions.html' style='color: #ff9f9f; font-weight: 600;'>Admissions Portal</a>.", true);
                } else if (q.includes('placement') || q.includes('ctc') || q.includes('salary') || q.includes('highest') || q.includes('company')) {
                    addMessage("WCE features exceptional statistics including maximum payouts hitting ₹1.5 CR! Check the latest corporate rosters on the <a href='placements.html' style='color: #ff9f9f; font-weight: 600;'>Placements Section</a>.", true);
                } else if (q.includes('branch') || q.includes('department') || q.includes('academic') || q.includes('course')) {
                    addMessage("We run highly accredited streams across computing, circuits, infrastructure design, and structural dynamics. Visit <a href='academics.html' style='color: #ff9f9f; font-weight: 600;'>Academics</a> for more.", true);
                } else if (q.includes('hostel') || q.includes('dining') || q.includes('campus') || q.includes('life')) {
                    addMessage("Enjoy cozy housing, reliable mess resources, and green relaxation facilities. Dive into <a href='campus-life.html' style='color: #ff9f9f; font-weight: 600;'>Campus Life</a>.", true);
                } else if (q.includes('club') || q.includes('society') || q.includes('hackathon')) {
                    addMessage("Discover active groups doing impressive engineering collaborations in our <a href='clubs.html' style='color: #ff9f9f; font-weight: 600;'>Student Clubs Directory</a>.", true);
                } else if (q.includes('contact') || q.includes('location') || q.includes('reach') || q.includes('address')) {
                    addMessage("We sit proudly in Vishrambag, Sangli. Reach our administrative help desks easily via the <a href='contact.html' style='color: #ff9f9f; font-weight: 600;'>Contact Hub</a>.", true);
                } else {
                    addMessage("I am always refining what I learn about WCE. Do you need guidance with <a href='admissions.html' style='color: #ff9f9f; font-weight: 600;'>Admissions</a> or <a href='placements.html' style='color: #ff9f9f; font-weight: 600;'>Placements</a> today?", true);
                }
            }, 800);
        }

        function handleSend() {
            const txt = inputField.value.trim();
            if (!txt) return;
            inputField.value = '';
            addMessage(txt, false);
            processQuery(txt);
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', handleSend);
        }

        if (inputField) {
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSend();
            });
        }
    });
})();