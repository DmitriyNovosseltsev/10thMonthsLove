document.addEventListener('DOMContentLoaded', function () {
    // 1. СПИСОК 10 ПРИЧИН (можно менять текст на свой)
    const reasonsWhyILoveYou = [
        "За твою невероятную улыбку, от которой у меня сразу поднимается настроение",
        "За то, как тепло и уютно мне просто находиться рядом с тобой",
        "За твою доброту, нежность и то, как искренне ты умеешь заботиться",
        "За наш общий смех, понятные только нам шутки и самые весёлые моменты",
        "За то, что ты всегда веришь в меня и поддерживаешь во всём",
        "За твои прекрасные глаза, в которые я готов смотреть бесконечно",
        "За то, что даже самый обычный день с тобой превращается в праздник",
        "За твои самые тёплые и крепкие объятия, в которых хочется остаться навсегда",
        "За твой голос и наши долгие разговоры обо всём на свете",
        "За то, что ты - это ты. Моя самая любимая, нежная и лучшая девушка на свете ❤️"
    ];

    const defaultEmojis = ["❤️", "💖", "✨", "🌸", "💕"];
    const kissEmojis = ["💋", "❤️", "💖", "🥰"];
    const bgEmojis = ["❤️", "🩷", "✨", "🌸", "🤍"];
    const cardIcons = ["🌸", "✨", "🍓", "💌", "🌙", "🧸", "🦋", "🍭", "🌷", "👑"];

    // ФУНКЦИЯ САЛЮТА ИЗ СЕРДЕЧЕК
    function createFirework(x, y, count, emojiList) {
        const list = emojiList || defaultEmojis;
        const total = count || 14;

        for (let i = 0; i < total; i++) {
            const particle = document.createElement('span');
            particle.className = 'burst-particle';
            particle.textContent = list[Math.floor(Math.random() * list.length)];

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.transform = 'translate(0px, 0px) scale(1) rotate(0deg)';
            particle.style.opacity = '1';

            document.body.appendChild(particle);

            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 110;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const rot = (Math.random() - 0.5) * 90;

            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    particle.style.transform = 'translate(' + tx + 'px, ' + ty + 'px) scale(1.4) rotate(' + rot + 'deg)';
                    particle.style.opacity = '0';
                });
            });

            setTimeout(function () {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 950);
        }
    }

    function spawnBurstFromEvent(event, count) {
        const x = event.clientX || Math.floor(window.innerWidth / 2);
        const y = event.clientY || Math.floor(window.innerHeight / 2);
        createFirework(x, y, count || 10, defaultEmojis);
    }

    // 2. ОТКРЫТИЕ КОНВЕРТА
    const envelopeBtn = document.getElementById('envelope-btn');
    const envelopeBox = document.getElementById('envelope-box');
    const envelopeScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');

    if (envelopeBtn && envelopeBox && envelopeScreen && mainContent) {
        envelopeBtn.addEventListener('click', function (e) {
            envelopeBox.classList.add('open');
            spawnBurstFromEvent(e, 22);

            setTimeout(function () {
                envelopeScreen.classList.add('fade-out');
                mainContent.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1100);
        });
    }

    // 3. КАРТОЧКИ СТАТИСТИКИ
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(function (card) {
        card.addEventListener('click', function (e) {
            spawnBurstFromEvent(e, 12);
        });
    });

    // 4. ГЕНЕРАЦИЯ 10 КАРТОЧЕК С ПРИЧИНАМИ
    const reasonsGrid = document.getElementById('reasons-grid');
    if (reasonsGrid) {
        reasonsWhyILoveYou.forEach(function (reason, index) {
            const card = document.createElement('div');
            card.className = 'flip-card';

            const icon = cardIcons[index % cardIcons.length];
            const monthNumber = index + 1;

            card.innerHTML =
                '<div class="flip-card-inner">' +
                    '<div class="flip-card-front">' +
                        '<div class="front-icon">' + icon + '</div>' +
                        '<div class="month-badge">Месяц #' + monthNumber + '</div>' +
                        '<div class="front-hint">Нажми, чтобы открыть</div>' +
                    '</div>' +
                    '<div class="flip-card-back">' +
                        '<p>' + reason + '</p>' +
                    '</div>' +
                '</div>';

            card.addEventListener('click', function (e) {
                card.classList.toggle('flipped');
                spawnBurstFromEvent(e, 6);
            });

            reasonsGrid.appendChild(card);
        });
    }

    // 5. ИНТЕРАКТИВНАЯ ШКАЛА ЛЮБВИ
    let loveLevel = 0;
    const loveBar = document.getElementById('love-bar');
    const lovePercent = document.getElementById('love-percent');
    const loveMessage = document.getElementById('love-message');
    const chargeBtn = document.getElementById('charge-btn');

    const statusMessages = [
        { limit: 25, text: "Начинаем измерение... Теплота растёт! 🌸" },
        { limit: 50, text: "Сердце бьётся всё быстрее! 💓" },
        { limit: 75, text: "Нежность приближается к максимуму! ✨" },
        { limit: 99, text: "Осторожно, прибор сейчас не выдержит! 🔥" }
    ];

    if (chargeBtn && loveBar && lovePercent && loveMessage) {
        chargeBtn.addEventListener('click', function (e) {
            if (loveLevel < 100) {
                loveLevel += 20;
                if (loveLevel > 100) {
                    loveLevel = 100;
                }
                loveBar.style.width = loveLevel + '%';
                lovePercent.textContent = loveLevel + '%';

                for (let i = 0; i < statusMessages.length; i++) {
                    if (loveLevel <= statusMessages[i].limit && loveLevel < 100) {
                        loveMessage.textContent = statusMessages[i].text;
                        break;
                    }
                }

                if (loveLevel === 100) {
                    lovePercent.textContent = "1000% ∞";
                    loveMessage.textContent = "ОШИБКА ПРИБОРА: Моя любовь к тебе бесконечна и не помещается в шкалу! ❤️🔥";
                    chargeBtn.textContent = "Люблю тебя бесконечно! 💘";
                    spawnBurstFromEvent(e, 30);
                } else {
                    spawnBurstFromEvent(e, 8);
                }
            } else {
                spawnBurstFromEvent(e, 25);
            }
        });
    }

    // 6. АКТИВАЦИЯ ЛЮБОВНЫХ КУПОНОВ
    const couponCards = document.querySelectorAll('.coupon-card');
    couponCards.forEach(function (card) {
        card.addEventListener('click', function () {
            card.classList.toggle('activated');
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            createFirework(centerX, centerY, 12, defaultEmojis);
        });
    });

    // 7. КНОПКА ПОЦЕЛУЕВ В ФИНАЛЕ
    let kisses = 0;
    const kissBtn = document.getElementById('kiss-btn');
    const kissCounter = document.getElementById('kiss-counter');

    if (kissBtn && kissCounter) {
        kissBtn.addEventListener('click', function (e) {
            kisses += 1;
            kissCounter.textContent = 'Отправлено поцелуев: ' + kisses + ' 💋';
            const x = e.clientX || Math.floor(window.innerWidth / 2);
            const y = e.clientY || Math.floor(window.innerHeight / 2);
            createFirework(x, y, 16, kissEmojis);
        });
    }

    // 8. ФОНОВЫЕ ЛЕТАЮЩИЕ СЕРДЕЧКИ
    const bgHeartsContainer = document.getElementById('bg-hearts');

    function createFloatingHeart() {
        if (!bgHeartsContainer) {
            return;
        }
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = bgEmojis[Math.floor(Math.random() * bgEmojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (14 + Math.random() * 18) + 'px';

        const duration = 8 + Math.random() * 10;
        heart.style.animationDuration = duration + 's';

        bgHeartsContainer.appendChild(heart);

        setTimeout(function () {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, duration * 1000);
    }

    setInterval(createFloatingHeart, 900);
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 300);
    }
});