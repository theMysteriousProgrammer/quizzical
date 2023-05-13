// import {nanoid} from "nanoid";
import React from "react";
import {Link} from "react-router-dom"

export default class Interest extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            interests: props.interests,
            nextPage: props.nextPage,
            apiData: props.apiData
        }

    }



    render() {
        return (
            <div className="">

                <div className="my-4 mx-5">
                    <h1 className="text-xl font-extrabold">What interests you today?</h1>
                </div>

            

                <div className="flex flex-wrap">
                    {this
                        .props
                        .interests
                        .map(eachValue => {
                            return (
                                <div
                                    onClick={() => this.props.handleClick(eachValue.id)}
                                    className="interest-span"
                                    style={{
                                    backgroundColor: eachValue.clicked
                                        ? "#38bdf8"
                                        : ""
                                }}>
                                    {eachValue.value}
                                    {eachValue.clicked
                                        ? <span className="mx-2">
                                                <i className="fa-solid fa-plus"></i>
                                            </span>
                                        : <span className="mx-2">
                                            <i className="fa-solid fa-minus"></i>
                                        </span>}
                                </div>
                            )
                        })
}

                </div>

                <div className="fixed bottom-[4rem] text-center w-full">
                    <div className="">
                        <div className="">
                            <span className="inline-block h-2 w-2 rounded-full bg-gray-500 mx-1"></span>
                            <span className="inline-block h-2 w-2 rounded-full bg-black mx-1"></span>
                            <span className="inline-block h-2 w-2 rounded-full bg-gray-500 mx-1"></span>
                        </div>
                        <Link 
                        to={this.props.nextPage ? "/amountOfQuestions": ""}
                        >
                            <div
                                className="text-white cursor-pointer bg-sky-500 py-2 w-[5rem] mx-auto">NEXT</div>
                        </Link>
                    </div>
                </div>

            </div>
        )
    }

}