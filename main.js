var playing = false;
var score = 0;
var action;
var timeRemaining;
var correctAnswer;

document.querySelector("#startreset").onclick = () =>
{
    if (playing) {
        location.reload();
    }
    else {
        playing = true;
        score = 0;
        document.querySelector("#scorevalue").innerHTML = score;
        showElement("timeremaining");
        timeRemaining = 60;
        document.querySelector("#timeremainingvalue").innerHTML = timeRemaining;
        hideElement("gameOver");
        document.querySelector("#startreset").innerHTML = "Reset Game";
        startCountdown();
        generateQA();
    }
}

for (let i = 1; i < 5; i++) {
    document.querySelector("#box" + i).onclick = () =>
    { 
        if (playing) {
            if (document.querySelector("#box" + i).innerHTML == correctAnswer) {
                score++;
                document.querySelector("#scorevalue").innerHTML = score;
                hideElement("wrong");
                showElement("correct");
                setTimeout(() =>
                {
                    hideElement("correct");
                }, 1000);

                generateQA();
            }
            else {
                hideElement("correct");
                showElement("wrong");
                setTimeout(() =>
                {
                    hideElement("wrong");
                }, 1000);
            }
        }
    }
}

function startCountdown()
{
    action = setInterval(() =>
    {
        //looplarda vaqtni 1 soniyaga qisqartiring
        timeRemaining -= 1;
        //soniyada ortga hisoblashni ko'rsatish
        document.querySelector("#timeremainingvalue").innerHTML = timeRemaining;
        //vaqt qolmadi
        if (timeRemaining == 0) {
            //O'yin tamom
            stopCountdown();
            //quti ustida o'yinni ko'rsatish
            showElement("gameOver");
            //Xabar va ball ustidan o'yinni ko'rsatish
            document.querySelector("#gameOver").innerHTML = "<p>Game Over!</p><p>Your score is : " + score + ".</p>";
            //ortga hisoblashni yashirish
            hideElement("timeremaining");
            //to'g'ri qutini yashirish
            hideElement("correct");
            //noto'g'ri qutini yashirish
            hideElement("wrong");
            //o'yin rejimini o'zgartirish
            playing = false;
            //boshlash uchun o'zgartirish tugmasi
            document.querySelector("#startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountdown()
{
    clearInterval(action);
}

function hideElement(Id)
{
    document.querySelector("#" + Id).style.display = "none";
}

function showElement(Id)
{
    document.querySelector("#" + Id).style.display = "block";
}

function generateQA()
{
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.querySelector("#question").innerHTML = x + " x " + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.querySelector("#box" + correctPosition).innerHTML = correctAnswer;

    var answers = [correctAnswer];

    for (let i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            } while ((answers.indexOf(wrongAnswer)) > -1)
            document.querySelector("#box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer)
        }
    }
}