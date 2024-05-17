function openTab(tabName) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}

function toggleUnderline(button1, button2) {
    const allButtons = document.querySelectorAll('.choose button, .after-choose button, .detect');
    allButtons.forEach(button => button.classList.remove('underline'));
    button1.classList.add('underline');
    button2.classList.add('underline');
}

document.addEventListener("DOMContentLoaded", function () {
    openTab('tab1');

    const detectLanguageButton = document.querySelector('.detect');
    const vietnameseButtonLeft = document.querySelector('.choose .vie');
    const englishButtonLeft = document.querySelector('.choose .en');
    const englishButtonRight = document.querySelector('.after-choose .vie');
    const vietnameseButtonRight = document.querySelector('.after-choose .en');

    detectLanguageButton.classList.add('underline');
    englishButtonRight.classList.add('underline');

    detectLanguageButton.addEventListener('click', function () {
        toggleUnderline(detectLanguageButton, englishButtonRight);
    });

    vietnameseButtonLeft.addEventListener('click', function () {
        toggleUnderline(vietnameseButtonLeft, englishButtonRight);
    });

    englishButtonLeft.addEventListener('click', function () {
        toggleUnderline(englishButtonLeft, vietnameseButtonRight);
    });

    englishButtonRight.addEventListener('click', function () {
        toggleUnderline(englishButtonRight, vietnameseButtonLeft);
    });

    vietnameseButtonRight.addEventListener('click', function () {
        toggleUnderline(vietnameseButtonRight, englishButtonLeft);
    });

    document.querySelector('.input-text').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            translateText();
        }
    });
});

const vocabulary = [
    ['xin chào', 'hello'],
    ['tạm biệt', 'goodbye'],
    ['cảm ơn', 'thank you'],
    ['tên', 'name'],
    ['quyển sách', 'book'],
    ['bàn', 'table'],
    ['cửa hàng', 'store'],
    ['trường học', 'school'],
    ['điện thoại', 'phone'],
    ['báo chí', 'newspaper'],
    ['máy tính', 'computer'],
    ['mèo', 'cat'],
    ['chó', 'dog'],
    ['hoa', 'flower'],
    ['mưa', 'rain'],
    ['nắng', 'sun'],
    ['gió', 'wind'],
    ['biển', 'sea'],
    ['sông', 'river'],
    ['núi', 'mountain']
];


function detectLanguage(inputText) {
    const vietnameseWords = vocabulary.map(wordPair => wordPair[0]);
    const englishWords = vocabulary.map(wordPair => wordPair[1]);

    if (vietnameseWords.includes(inputText)) {
        return 'vi';
    } else if (englishWords.includes(inputText)) {
        return 'en';
    }
    return null;
}

function translateText() {
    const inputText = document.querySelector('.input-text').value.trim().toLowerCase();
    const outputTextArea = document.querySelector('.output');

    const detectLanguageButton = document.querySelector('.detect');
    const vietnameseButtonLeft = document.querySelector('.choose .vie');
    const englishButtonLeft = document.querySelector('.choose .en');
    const englishButtonRight = document.querySelector('.after-choose .vie');
    const vietnameseButtonRight = document.querySelector('.after-choose .en');

    let languageDirection = detectLanguageButton.classList.contains('underline')
        ? detectLanguage(inputText)
        : (vietnameseButtonLeft.classList.contains('underline') ? 'vi' : 'en');

    if (!languageDirection) {
        outputTextArea.value = 'Translation not found';
        return;
    }

    let isVietnameseToEnglish = languageDirection === 'vi';

    if (languageDirection === 'vi') {
        toggleUnderline(vietnameseButtonLeft, englishButtonRight);
    } else if (languageDirection === 'en') {
        toggleUnderline(englishButtonLeft, vietnameseButtonRight);
    }

    for (let i = 0; i < vocabulary.length; i++) {
        if (isVietnameseToEnglish && vocabulary[i][0] === inputText) {
            outputTextArea.value = vocabulary[i][1];
            return;
        } else if (!isVietnameseToEnglish && vocabulary[i][1] === inputText) {
            outputTextArea.value = vocabulary[i][0];
            return;
        }
    }
    outputTextArea.value = 'Translation not found';
}