import React, { useEffect } from "react";
import {nanoid} from "nanoid"
import { Link } from "react-router-dom";
import loadingImage from "../src/loading.gif"


export default function QuizPage(props) {


const [apiData, setApiData] = React.useState([])
const [loading, setLoading] = React.useState(true)


useEffect( () => {
    async function startQuiz() {
    
        // take every apiValue of array in the object with a value of 
        // clicked equals true to a list.
        const clickedValueArray = props.interests.filter(interest => interest.clicked===true).map(interest => interest.apiValue)


        // let api = 'https://the-trivia-api.com/api/questions?categories=geography,general_knowledge,sport_and_leisure,science&limit=90&difficulty=medium'
        let api = `https://the-trivia-api.com/api/questions?categories=${clickedValueArray.join(",")}&limit=${props.FormData.textAreaValue}&difficulty=${props.FormData.difficulty}`
        console.log(api)
        try {
            const response = await fetch(api);
            const json = await response.json();
            setApiData(json);
            setLoading(preValue => false)

        } catch (error) {
            console.error(error);
        }
    }

    startQuiz()

}, [])
    

// Code to add value, key and answer property to the data generated from the data file
        const dataArray = apiData.map(quizzy => 
          (
            {
            eachQuestion: quizzy.question,
            eachAnswer:[
                
                {answer: quizzy.correctAnswer, value:true, key: nanoid(), isClicked: false},
                {answer: quizzy.incorrectAnswers[0], value:false, key: nanoid(), isClicked: false},
                {answer: quizzy.incorrectAnswers[1], value:false, key: nanoid(), isClicked: false},
                {answer: quizzy.incorrectAnswers[2], value:false, key: nanoid(), isClicked: false}
            ] 
            }  
          )
        )



// Pass the above function to state so that every changes are noticed
    // const [question, setQuestion] = React.useState(0) // this to notice state change for questions
    const [scores, setScores] = React.useState(0) // this to notice state change for scores
    const [updateDataArray, setUpdateDataArray] = React.useState([]) // this to notice state change for the whole data array
    const [result, setResult] = React.useState(0)
    const [countAnsweredQuestions, setCountAnsweredQuestions]  = React.useState(0)
    const [showQuestionAlert, setShowQuestionAlert] = React.useState(false)
    const [firstRender, setFirstRender] = React.useState(true)





// Function to shuffleArray
    function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    }


// using useEffect to know when the first render to DOM is made
// and then only shuffling the data at the first render
     useEffect(() => {

        if (firstRender) {
            const shuffledData = dataArray.map(quest => {
                    const shuffledAns = shuffleArray(quest.eachAnswer);
                    return {...quest, eachAnswer: shuffledAns}
                })
        setUpdateDataArray(prevData => shuffledData)
        
        
        }
          
     }, [apiData])







// Function to handle clicked Button color
    function handleButtonClick(ansId, dataArray)

    

    //Variable Definition

    // ansId: the unique key of the button clicked
    // dataArray: the whole data in state
    
    {

        let clickedButtonIndex // define a variable
        for(let i =0; i<dataArray.length; i++){ // loop through the data arrary based on its length
            for (let j = 0; j<dataArray[i].eachAnswer.length; j++) { // loop through the array of eachAnswer based on its length

                if (dataArray[i].eachAnswer[j].key === ansId) { // while looping through the button, check if the current button's key in loop equals the button's key clicked
                    clickedButtonIndex = j; // if so assign the index of the clicked button to the variable created which is clickedButtonIndex

                    if(dataArray[i].eachAnswer[clickedButtonIndex].isClicked === false) { // if the clicked button has an isClicked(answerClicked) property of false


                        const clickedButton = dataArray[i].eachAnswer[clickedButtonIndex]
                        
                        if (!clickedButton.isClicked && clickedButton.value) { // if you find the button, and its isClicked(answerClicked) property is true and answerValue(value) is true

                                dataArray[i].eachAnswer.forEach(button => { // Loop through each button in the dataArray variable
                                    if(button.key !== clickedButton.key) { // and if the key variable of each button is not equal to the clicked button key
                                        button.isClicked = false // return each of this looped through button isClicked property to false
                                    }
                                })
                                setScores(prevScores => prevScores + 1) // add 1 to the scores state
                                clickedButton.isClicked = true
                            
                             
                               
                            } 
                            
                        else if (!clickedButton.isClicked && !clickedButton.value)  { // if you find the button, and it hasn't be clicked before and it isn't the correct answer

                                if(dataArray[i].eachAnswer.find(button => button.isClicked === true && button.value === true)) {
                                    clickedButton.isClicked = true
                                    setScores(prevScores => prevScores -1)

                                // Function to turn other buttons to their false color after turning the clickedButton color to true  
                                        dataArray[i].eachAnswer.forEach(button => { // loop through each button in the array
                                            if(button.key !== clickedButton.key) { // and if the key variable of the looped button is not equal to the clicked button key
                                                button.isClicked = false // return each of this looped through button isClicked property to false
                                            }
                                        })
                                }

                                else {
                                    clickedButton.isClicked = true
                                    setScores(prevScores => prevScores+1)
                                   

                                // Function to turn other buttons to their false color after turning the clickedButton color to true  
                                     dataArray[i].eachAnswer.forEach(button => { // loop through each button in the array
                                            if(button.key !== clickedButton.key) { // and if the key variable of the looped button is not equal to the clicked button key
                                                button.isClicked = false // return each of this looped through button isClicked property to false
                                            }
                                        })
                                }
                               
                            } 
                                                                   
                    }
                      
                    else if (dataArray[i].eachAnswer[clickedButtonIndex].isClicked === true)  { // if the isClicked property has a property of clicked equals true
                                                                                                // i.e the true answer has been clicked already
                        const clickedButton = dataArray[i].eachAnswer[clickedButtonIndex]
 
                        if (clickedButton.isClicked && clickedButton.value) { // if you find the clicked button, and its isClicked property is true and answerValue is true
                                dataArray[i].eachAnswer.forEach(button => { // Loop through each button in the dataArray variable
                                        button.isClicked = false        // and change everything to false 
                                })
                                clickedButton.isClicked = true
                                setScores(prevScores => prevScores - 1) // subtract 1 from scores
                              
                               
                            } 

                        
                        else if (clickedButton.isClicked && !clickedButton.value) {
                            dataArray[i].eachAnswer.forEach(button => { // Loop through each button in the dataArray variable
                                    // and if the key variable of each button is not equals to the clicked button key
                                        button.isClicked = false // return each of this looped through button isClicked property to false 
                                })
                                setScores(prevScores => prevScores)
                        }
               
                         break;
                      
                        }
                       
                        }
                else {
                    continue
                }
                
            
            }

        }

    }



// Function to handle submission and score the questions
    function handleSubmission(updateDataArray) {  

        // set result and countAnsweredQuestions to zero as this would help re-fresh the 
        // already saved data in state to zero before running the code again, 
        // so nothing is saved to memory
 
            setResult(0)
            setCountAnsweredQuestions(0)
            
            for(let i= 0; i < updateDataArray.length; i++) { // Loop through the dataArray
               
    
                // code to score questions
                updateDataArray[i].eachAnswer.forEach(button => { // loop through each answer and 
                    if(button.isClicked && button.value){   // check if there is a button that is clicked with a value of true 
                        setResult(prevResult => prevResult + 1)  
                    } 
                    }
                )

                // code to count answered questions
                updateDataArray[i].eachAnswer.forEach(button =>{
                    if (button.isClicked) {  // if a button is clicked, i.e a question answered
                        setCountAnsweredQuestions( prevCountAnsQuest => prevCountAnsQuest + 1)
                    }
                    })
            }

        // If the answered questions is counted and it equals the length of the number of questions 
        // displayed to the DOM, then set showQuestionAlert to true and if otherwise set showQuestionAlert to false
            countAnsweredQuestions !== updateDataArray.length ? setShowQuestionAlert(prevAlert => false) : setShowQuestionAlert(true)
            
    }


// Function to handle the Alert box
function handleUnansweredQuestions() {
    setShowQuestionAlert(true)
  
}



    return(
        <div className="text-center">
            { 
            loading ? 
            <div className="text-3xl fixed inset-0 top-[50%]"><img className="w-[20%] h-[20%] mx-auto" src={loadingImage} alt="loadingImageIcon" /></div>
                        
            :
            countAnsweredQuestions !== updateDataArray.length ?
            <div className="text-center">
                    
                    <div style= {{filter: showQuestionAlert ? "blur(0px)" : "blur(4px)"}}>
                        
                        {/* Create Buttons */}

                            {/* Mapping each Questions and Answers unto the unto the DOM */}
                        <div className="">{updateDataArray.map(quest =>
                    
                            ( /* Use a .map function to loop through the dataArray */
                        
                            <div className="my-8">
                                <h1 className="my-2">{quest.eachQuestion}</h1> {/* Map the Answers to the DOM for each loop */}      
                                <h1>
                                    {quest.eachAnswer.map(ans => { 

                                        return(
                                            <button onClick = {() => {
                                                                        handleButtonClick(ans.key, updateDataArray)
                                                                }}
                                                        className = "border-4 border-gray-200 mx-3 px-3 rounded-lg"
                                                        style={{backgroundColor:ans.isClicked ? "#6495ED" :""}}
                                                        >
                                                        {ans.answer}
                                            </button>)
                                    })}
                                </h1>
                                <hr className="mt-5"/>
                            </div>

                           ))} 
                        </div> 

                        <div className="cursor-pointer mx-auto  w-20 h-10 
                                        text-center py-2 text-white
                                        bg-slate-700 rounded-lg"
                                    onClick={() => handleSubmission(updateDataArray)}>
                                    SUBMIT
                        </div>  

                    </div>

                    {/* Alert box */}
                    <div className="items-center justify-center"
                            style = {{display: showQuestionAlert ? "none" : "flex"}}>

                            <div className="fixed inset-0 z-50 top-[50%]">
                                <div className="text-center bg-white text-black rounded-tl-3xl rounded-bl-3xl mx-[2rem]">
                                    <div className="p-5 flex justify-center">

                                        <i className="fa-solid fa-bell text-3xl bg-gray-300 p-5 rounded-full"></i>
                                        <h1 className="text-2xl font-bold font-mono">Alert!</h1> 
                                    </div>

                                    <h1 className="">You have <span className="font-bold">{updateDataArray.length - countAnsweredQuestions}</span> unanswered questions</h1>
                                    <h1>Kindly attend to <span className="font-semibold">all questions </span>and submit</h1>
                                   
                                    <button onClick={() => handleUnansweredQuestions()}
                                            className= "cursor-pointer text-black text-center bg-gray-300 p-2 my-3 rounded-lg">
                                            OK
                                    </button>

                                </div>
                            </div>
                    </div>
                </div> 


            // When showScore equals true
             
                // Before submitting the Questions render this 
            :
        
            (
               
                
              // After submitting the Questions render this
                <div>

                    {/* Mapping each Questions and Answers unto the unto the DOM */}
                    <div className="">{updateDataArray.map(quest =>
                    
                        ( /* Use a .map function to loop through the dataArray */
                        
                            <div className="my-8">
                                <h1>{quest.eachQuestion}</h1> {/* Map the Answers to the DOM for each loop */}      
                                <h1>
                                    {quest.eachAnswer.map(ans => { 

                                        return(
                                            <button onClick = {() => {
                                                                        // handleButtonColor(ans.key, ans.value, ans.isClicked, updateDataArray);
                                                                        handleButtonClick(ans.key, updateDataArray)
                                                                    // handleAnswerResponse(ans.value, ans.isClicked, updateDataArray, clicked)
                                                                }}
                                                        className = "border-4 border-gray-200 mx-3 px-3 rounded-lg"
                                                        style={{backgroundColor:ans.value ? "#6ee7b7" : ( ans.isClicked && !ans.value ? "#fbcfe8": "")}}
                                                        >
                                                        {ans.answer}
                                            </button>)
                                    })}
                                </h1>
                            </div>

                        ))} 
                    </div> 

                    {/* display final result */}
                    <div className="text-center">
                        <h1 className="text-xl text-slate-800 font-mono">You  scored {result}/{updateDataArray.length} correct answers</h1> <br/>
                        <Link to="/interest">
                            <button className="bg-slate-700 text-white p-2 rounded-md m-1">Play Again</button>
                        </Link> 
                    </div> 

                </div>  
             
                
                
            )

            }   
        </div>

        
    )
}