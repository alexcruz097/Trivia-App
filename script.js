const generateBTN = document.querySelector("#createQuestion");
const category = document.querySelector("#category");
const questionContainer = document.querySelector(".questionContainer");
const body = document.querySelector("body");
const categoryOption = document.querySelector(".categoryOption");
const result = document.querySelector(".result")
const numRightAnsw = document.querySelector("#rigthAnsw");
const numWrongAnsw = document.querySelector("#wrongAnsw");
let rightCounter = 1;
let wrongCounter = 1;


function createQuestion(url) {
    // start http
    const xhr = new XMLHttpRequest();

    //call back function
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //parse the data
            let data = JSON.parse(xhr.responseText);
            //generate random number
            let random = (Math.floor(Math.random() * data.results.length));
            //the array of the incorrect answer
            let incorrectaAswr = (data.results[random].incorrect_answers);

            let answer = [];
            answer = answer.concat(incorrectaAswr);
            //this will put the answer in diffrent of the index
            let positionAnsw = (Math.floor(Math.random() * answer.length) + 1);
            //add the correct answer to the answer array 
            answer.splice(positionAnsw, 0, data.results[random].correct_answer)
            // answers.push(data.results[random].correct_answer);

            // answerArray.push(data.results[random].correct_answer)
            questionContainer.innerHTML =
                `
            <h3>Category: <span id=category>${data.results[random].category}</span></h3>
            <h3>Dificulty: <span id="difficult">${data.results[random].difficulty}</span></h3>
            <h1 id="questions">${data.results[random].question} </h1>
            <div class="answers">
            <button class="btn ans1">${answer[0]}</button>
            <button class="btn ans2">${answer[1]}</button>
            <button class="btn ans3">${answer[2]}</button>
            <button class="btn ans4">${answer[3]}</button>
            </div>
            `
            //change the color depending of the difficuty
            if (data.results[random].difficulty === "easy") {
                document.querySelector("#difficult").style.color = "green";
            } else if (data.results[random].difficulty === "medium") {
                document.querySelector("#difficult").style.color = "orange";
            } else {

                document.querySelector("#difficult").style.color = "red";
            }
            let button = document.querySelectorAll(".btn");

            //if answer is correct or if it is wrong
            for (let i = 0; i < button.length; i++) {
                button[i].addEventListener("click", function (e) {
                    if (e.target.classList.contains("btn")) {
                        if (e.target.innerHTML === data.results[random].correct_answer) {

                            result.innerHTML = `
                           <p>Correct Answer</p>
                           `
                            e.target.classList.add("right");
                            result.classList.add("right");
                            result.classList.remove("wrong");
                            //update number of correct answer
                            numRightAnsw.innerHTML = `${rightCounter++} Correct`;
                        }
                        else {
                            result.innerHTML = `
                            <p>Incorrect Answer</p>
                            `
                            //this will make a line if the answer is wrong
                            e.target.classList.add("crossClass");
                            result.classList.remove("right");
                            result.classList.add("wrong");
                            //update number of wrong answer
                            numWrongAnsw.innerHTML = `${wrongCounter++} Wrong`;
                        }
                    }
                })
            }
        }
    }
    //open request
    xhr.open("GET", url);
    // send 
    xhr.send();
}


//reset the result display
generateBTN.addEventListener("click", () => {
    result.innerHTML = `
  
    `
    //this way we can chose which type of category
    switch (categoryOption.value) {
        case "/":
            alert("Please Select a Category")
            break;
        case "videoGames":
            createQuestion('https://opentdb.com/api.php?amount=50&category=15&type=multiple');
            break;
        case "film":
            createQuestion('https://opentdb.com/api.php?amount=50&category=11&type=multiple');
            break;
        case "music":
            createQuestion('https://opentdb.com/api.php?amount=50&category=12&type=multiple');
            break;
        case "television":
            createQuestion('https://opentdb.com/api.php?amount=50&category=14&type=multiple');
            break;
        case "computer":
            createQuestion('https://opentdb.com/api.php?amount=50&category=18&type=multiple');
            break;
        case "sport":
            createQuestion('https://opentdb.com/api.php?amount=50&category=21&type=multiple');
            break;
        case "animals":
            createQuestion('https://opentdb.com/api.php?amount=50&category=27&type=multiple');
            break;
        case "anime":
            createQuestion('https://opentdb.com/api.php?amount=50&category=31&type=multiple');
            break;
        case "vehicles":
            createQuestion('https://opentdb.com/api.php?amount=50&category=28&type=multiple');
            break;
        default:
            break;
    }
});