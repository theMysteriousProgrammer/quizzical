import React from "react"
import {Route, Routes} from "react-router-dom"
import StartPage from "./StartPage"
import QuizPage from "./QuizPage"
import Interest from "./Interest"
import AmountOfQuestions from "./AmountOfQuestions"
import { nanoid } from "nanoid"

export default class App extends React.Component {
    constructor(props) {
        super(props);

        // Defining state for formData
        this.state = {
            apiData: [],
            startQuiz: false,
            FormData: {
                textAreaValue: "",
                difficulty: ""
            },
             interests: [
                {
                    value: "Music",
                    apiValue: "music",
                    clicked: false,
                    id: nanoid()
                }, {
                    value: "Sport and Leisure",
                    apiValue: "sport_and_leisure",
                    clicked: false,
                    id: nanoid()
                }, {
                    value: "Arts and Literature",
                    apiValue: "arts_and_literature",
                    clicked: false,
                    id: nanoid()
                }, {
                    value: "History",
                    apiValue: "history",
                    clicked: false,
                    id: nanoid()
                }, {
                    value: "Society and Culture",
                    apiValue: "society_and_culture",
                    clicked: false,
                    id: nanoid()
                }, {
                    value: "Science",
                    apiValue: "science",
                    clicked: false,
                    id: nanoid()
                }, {
                    value: "Geography",
                    apiValue: "geography",
                    clicked: false,
                    id: nanoid()
                }, {
                    value: "General Knowledge",
                    apiValue: "general_knowledge",
                    clicked: false,
                    id: nanoid()
                }, {
                    value: "Food and Drinks",
                    apiValue: "food_and_drink",
                    clicked: false,
                    id: nanoid()
                }, {
                    value: "Film and TV",
                    apiValue: "film_and_tv",
                    clicked: false,
                    id: nanoid()
                }
            ],
            nextPage: false,

        }


    }

    // Function to handle Change in the form
     handleChange = (event) => {
        // Destructure the name, value, and type properties from the event target
        const {name, value, type} = event.target;

        // Update the state with the new form data by using the previous state to create
        // a new state object with the updated property

         if(type==="radio") {
            this.setState(prevState => ({
                FormData: {
                    ...prevState.FormData, // Spread operator to copy all properties of the previous state's FormData object
                    [name]: value // Update the specified property with the new value
                }
            }));
        }
         
        else {
            if(/^\d*$/.test(value) && value <= 50) {
                this.setState(prevState => ({
                    FormData: {
                        ...prevState.FormData, // Spread operator to copy all properties of the previous state's FormData object
                        [name]: value // Update the specified property with the new value
                    }
                }));
            }

        } 
      

        this.setState(prevState => {
            let textLength = prevState.FormData.textAreaValue.length
            let difficultyChoice = prevState.FormData.difficulty.length

            if (textLength > 0 && difficultyChoice > 0) {
                return ({startQuiz: true})
            } else {
                return {startQuiz: false}
            }

        })

    };


    //Function to handle the clicking of buttons in this.state.interests
    handleClick = (id) => {
        this.setState(prevState => {
            const interests = prevState
                .interests
                .map(interest => {
                    if (interest.id === id) {
                        return {
                            ...interest,
                            clicked: !interest.clicked // toggle the clicked property
                        };
                    }
                    return interest;
                });
            return {interests};
        });

       
        this.setState(prevState => {
            let isTrueCount = prevState.interests.filter(eachInterest => eachInterest.clicked).length;
            return {nextPage: isTrueCount>0}
            
        })
    };

    render() {
        return (
            <Routes>
                <Route
                    path="/"
                    element={< StartPage 
                                />} />

                <Route
                    path="/quiz"
                    element={< QuizPage 
                                        apiData = {this.state.apiData}
                                        FormData = {this.state.FormData}
                                        interests = {this.state.interests}
                                         nextPage = {this.state.nextPage}
                                         startQuiz = {this.state.startQuiz}
                                         />}/>

                <Route path="/interest" element={< Interest
                                             interests = {this.state.interests}
                                             apiData = {this.state.apiData}
                                             nextPage = {this.state.nextPage}
                                             handleClick = {this.handleClick} />}/>


                <Route path="/amountOfQuestions" element={<AmountOfQuestions 
                
                                                        interests = {this.state.interests}
                                                        startQuiz = {this.state.startQuiz}
                                                        FormData = {this.state.FormData}
                                                        handleChange = {this.handleChange}
                                                        apiData = {this.state.apiData}/>}/>
            </Routes>
        )
    }
}