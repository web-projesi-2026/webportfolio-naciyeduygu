/* ═══ YAPAY ZEKA SOHBET MANTIĞI ═════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');

    if (!chatMessages || !chatInput || !sendBtn) return;

    // Mesaj Ekleme Fonksiyonu
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        
        // Zaman Damgası
        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        
        msgDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time" style="font-size: 0.7rem; opacity: 0.6; margin-top: 5px; text-align: right;">${timeStr}</div>
        `;
        
        chatMessages.appendChild(msgDiv);
        
        // Otomatik Kaydırma
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }

    // AI Yanıt Simülasyonu
    function getAIResponse(userText) {
        const input = userText.toLowerCase();
        
        if (input.includes('merhaba') || input.includes('selam')) {
            return "Merhaba! Ben Naciye Duygu'nun dijital asistanıyım. Sana nasıl yardımcı olabilirim?";
        } else if (input.includes('naciye') || input.includes('kim')) {
            return "Naciye Duygu, Bilgisayar Programcılığı öğrencisidir. Web geliştirme, tasarım ve yazılım projeleriyle ilgilenmektedir.";
        } else if (input.includes('proje') || input.includes('neler yaptı')) {
            return "Naciye'nin E-ticaret sitesi, Portfolyo sitesi ve şu an konuştuğumuz Yapay Zeka Asistanı gibi harika projeleri var. 'Projeler' sekmesinden detaylara bakabilirsin!";
        } else if (input.includes('yetenek') || input.includes('beceri')) {
            return "Naciye; HTML5, CSS3, JavaScript, PHP, MySQL ve C# dillerinde kendini geliştirmektedir.";
        } else if (input.includes('iletişim') || input.includes('ulaş')) {
            return "Naciye'ye ulaşmak için 'İletişim' sayfasındaki formu doldurabilirsin.";
        } else {
            return "Bunu tam olarak anlayamadım ama Naciye hakkında daha fazla bilgi almak için menüdeki sekmeleri gezebilirsin! ✨";
        }
    }

    // Gönderme İşlemi
    function handleSendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Kullanıcı Mesajı
        addMessage(text, 'user');
        chatInput.value = '';

        // AI "Yazıyor..." Efekti (Opsiyonel)
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai typing';
        typingDiv.innerText = 'Yazıyor...';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // AI Yanıtı (1.5 saniye sonra)
        setTimeout(() => {
            chatMessages.removeChild(typingDiv);
            const response = getAIResponse(text);
            addMessage(response, 'ai');
        }, 1500);
    }

    // Buton Tıklama
    sendBtn.addEventListener('click', handleSendMessage);

    // Enter Tuşu ile Gönderme
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
});
