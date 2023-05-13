import React from "react";
import {Link} from "react-router-dom"

export default class AmountOfQuestions extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            FormData: props.FormData,
            startQuiz: props.startQuiz,
            interests: props.interests,
            apiData: props.apiData
        }

    }

    render() {
        return (
            <form className="bg-white rounded-md py-5 px-3">

                <div className="text-center my-5">
                    <label
                        htmlFor="limit"
                        className="px-3 text-sm p-2 bg-slate-200 rounded-md m-2 block">
                        Enter Number of Questions
                        <span className="block text-sm font-bold">
                            Enter a number not more than 50
                        </span>
                    </label>
                    <textarea
                        className="border border-gray-900"
                        value={this.props.FormData.textAreaValue}
                        onChange={this.props.handleChange}
                        placeholder="Enter an integer"
                        name="textAreaValue"
                        type="text"/>

                </div>

                <div className="block md:block lg:flex">
                    <legend className="text-sm text-center p-2 bg-slate-200 rounded-md m-2">
                        Select the Level of Difficulty
                    </legend>

                    <div className="text-center">
                        <div>
                            <input
                                type="radio"
                                value="easy"
                                onChange={this.props.handleChange}
                                name="difficulty"/>
                            <label htmlFor="easy">Easy</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                value="medium"
                                onChange={this.props.handleChange}
                                name="difficulty"/>
                            <label htmlFor="medium">Medium</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                value="hard"
                                onChange={this.props.handleChange}
                                name="difficulty"/>
                            <label htmlFor="hard">Hard</label>
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-[4rem] text-center w-full">
                    <div className="">
                        <div className="">
                            <span className="inline-block h-2 w-2 rounded-full bg-gray-500 mx-1"></span>
                            <span className="inline-block h-2 w-2 rounded-full bg-gray-500 mx-1"></span>
                            <span className="inline-block h-2 w-2 rounded-full bg-black mx-1"></span>

                        </div>
                        <Link
                            to={this.props.startQuiz
                            ? "/quiz"
                            : ""}
                          >
                            <div className="text-white cursor-pointer bg-sky-500 py-2 w-[7rem] mx-auto">START QUIZ</div>
                        </Link>

                    </div>
                </div>

            </form>
        )
    }

}