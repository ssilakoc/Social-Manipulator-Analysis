const questions = [
    {
        text: "Günde kaç saatini sosyal medyada 'sonsuz kaydırma' yaparak geçiriyorsun?",
        options: [
            { text: "1 saatten az", score: 0 },
            { text: "2-4 saat arası", score: 5 },
            { text: "Telefon elimden düşmüyor", score: 10 }
        ]
    },
    {
        text: "Bir reklam gördüğünde, onun senin bir konuşmandan sonra çıktığını hiç fark ettin mi?",
        options: [
            { text: "Evet, her zaman oluyor!", score: 10 },
            { text: "Bazen denk geliyor.", score: 5 },
            { text: "Hayır, dikkat etmedim.", score: 0 }
        ]
    },
    {
        text: "Sosyal medyadaki linç veya tartışmalara katılır mısın?",
        options: [
            { text: "Asla, sadece izlerim.", score: 0 },
            { text: "Nadiren fikrimi belirtirim.", score: 5 },
            { text: "Haksızlığa gelemem, hemen yazarım!", score: 10 }
        ]
    },
    {
        text: "Sadece seninle aynı fikirde olan insanların paylaşımlarını mı görüyorsun?",
        options: [
            { text: "Evet, herkes benim gibi düşünüyor.", score: 10 },
            { text: "Arada farklı fikirler de çıkıyor.", score: 5 },
            { text: "Farklı görüşleri özellikle takip ederim.", score: 0 }
        ]
    },
    {
        text: "Telefonun yanında değilken kendini huzursuz hissediyor musun?",
        options: [
            { text: "Evet, bir şeyler kaçırıyor gibiyim.", score: 10 },
            { text: "Biraz boşlukta hissediyorum.", score: 5 },
            { text: "Hayır, gayet huzurluyum.", score: 0 }
        ]
    },
    {
        text: "Bir gönderi paylaştığında beğeni sayısını sık sık kontrol eder misin?",
        options: [
            { text: "Dakikada bir bakarım.", score: 10 },
            { text: "Gelen bildirimlere göre bakarım.", score: 5 },
            { text: "Paylaşır ve unuturum.", score: 0 }
        ]
    },
    {
        text: "Siyasi veya toplumsal bir olayda fikrin sosyal medyadaki videolardan etkilenir mi?",
        options: [
            { text: "Genelde oradaki anlatı kafama yatar.", score: 10 },
            { text: "Farklı videolar izleyip karar veririm.", score: 5 },
            { text: "Bilgiyi kitaplardan veya resmi kurumlardan teyit ederim.", score: 0 }
        ]
    },
    {
        text: "Ücretsiz bir uygulama kullandığında 'ürün'ün aslında senin verilerin olduğunu biliyor musun?",
        options: [
            { text: "Umrumda değil, hizmet güzel.", score: 10 },
            { text: "Biliyorum ama yapacak bir şey yok.", score: 5 },
            { text: "Biliyorum ve veri paylaşımımı kısıtlıyorum.", score: 0 }
        ]
    }
];

let currentQuestion = 0;
let totalScore = 0;

const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const optionsContainer = document.getElementById('options-container');
const questionText = document.getElementById('question-text');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');


startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    showQuestion();
});


function showQuestion() {
    const q = questions[currentQuestion];
    questionText.innerText = q.text;
    optionsContainer.innerHTML = ''; 

    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt.text;
        btn.classList.add('option-btn');
        btn.onclick = () => handleAnswer(opt.score);
        optionsContainer.appendChild(btn);
    });

    const percent = Math.round((currentQuestion / questions.length) * 100);
    progressBar.style.width = percent + "%";
    progressText.innerText = percent + "%";
}


function handleAnswer(score) {
    totalScore += score;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const title = document.getElementById('result-title');
    const desc = document.getElementById('result-desc');

    if (totalScore >= 60) {
        title.innerText = "DİJİTAL KÖLE";
        desc.innerText = "Algoritmalar senin nöronlarını bile satın almış. Kendi kararlarını verdiğini sanıyorsun ama sadece sana gösterilen seçenekler arasında dönüyorsun.";
    } else if (totalScore >= 30) {
        title.innerText = "HEDEF KİTLE";
        desc.innerText = "Sistemin içindesin ama hala küçük bir farkındalık ışığın var. Algoritmalar seni yönlendirmek için zayıf noktalarını biliyor.";
    } else {
        title.innerText = "ÖZGÜR ZİHİN";
        desc.innerText = "Matrix'ten çıkış yolunu bulmuşsun. Dijital araçları sen yönetiyorsun, onlar seni değil. Tebrikler, bilinçli kullanıcı!";
    }
}