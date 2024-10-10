import React from 'react';
import { FaRegCircleUser } from "react-icons/fa6";

const Avatar = ({ name, userId, imageUrl, width, height }) => {
    let avatarName = "";

    if (name) {
        const splitName = name?.split(" ");
        
        // Get initials based on split name
        if (splitName.length > 1) {
            avatarName = splitName[0][0] + splitName[1][0];
        } else {
            avatarName = splitName[0][0];
        }
    }

    const bgColor = [
        'bg-slate-200',
        'bg-red-200',
        'bg-teal-200',
        'bg-yellow-200',
        'bg-green-200',
        'bg-zinc-700',
        "bg-yellow-500",
        'bg-lime-400',
        'bg-teal-200'
    ]
    const randomNum = Math.floor(Math.random() * 9)
    console.log(randomNum);

    return (
        <div className={`overflow-hidden  text-xl  text-black font-bold rounded-full`} style={{ width: `${width}px`, height: `${height}px` }}>
            {
                imageUrl ? (
                    <img
                        src={imageUrl}
                        width={width}
                        height={height}
                        alt={name}
                        className="overflow-hidden rounded-full"
                    />
                ) : name ? (
                    <div 
                        style={{ width: `${width}px`, height: `${height}px` }} 
                        className={`flex items-center justify-center font-bold text-black rounded-full flex justify-center items-center ${bgColor[randomNum]}`}
                    >
                        {avatarName.toUpperCase()}
                    </div>
                ) : (
                    <FaRegCircleUser
                        size={width}
                    />
                )
            }
        </div>
    );
};

export default Avatar;
