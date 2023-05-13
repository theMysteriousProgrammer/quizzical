import React from "react";
import image from "../src/wallpaper-1.png"
import {Link} from "react-router-dom"

export default class StartPage extends React.Component {

    render() {

        return (
            <div
                className="w-full h-screen bg-contain bg-no-repeat"
                style={{
                backgroundImage: `url(${image})`
            }}>

                <div className="fixed bottom-[8rem] mx-[5rem] text-center">

                    <h2
                        className="text-xl font-bold sm:min-h-896
                    py-4 text-black leading-8
                    sm:min-h-896">
                        Unlock your knowledge potential with Current Affairs.
                    </h2>

                    <div className="">
                        <span className="inline-block h-2 w-2 rounded-full bg-black mx-1"></span>
                        <span className="inline-block h-2 w-2 rounded-full bg-gray-500 mx-1"></span>
                        <span className="inline-block h-2 w-2 rounded-full bg-gray-500 mx-1"></span>
                    </div>

                    <Link to="/interest">
                        <div
                            className="text-white
                        cursor-pointer bg-sky-500
                        py-2
                        text-lg mx-auto">
                            GET STARTED
                        </div>
                    </Link>
                </div>

            </div>
        )
    }
}