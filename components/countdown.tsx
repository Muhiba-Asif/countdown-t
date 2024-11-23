"use client"

import{useState, useRef, useEffect, ChangeEvent} from "react";
import { Input} from "@/components/ui/input"
import { Button } from "@/components/ui/button";

export default function Countdown(){
    const [duration, setDuration] = useState<number | string>("");
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handSetDuration =():void =>{
        if (typeof duration === "number" && duration >0){
            setTimeLeft(duration);
            setIsPaused(false)
            setIsActive(false);
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        }
    };
    const handleStart =(): void =>{
        if(timeLeft > 0){
            setIsActive(true);
            setIsPaused(false);
        }
    };
    const handlepause= (): void =>{
        if(isActive){
            setIsPaused(true);
            setIsActive(false);
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        }
    };
    const handleReset =(): void =>{
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number"? duration : 0);
        if(timerRef.current){
            clearInterval(timerRef.current);
        }
    };
    useEffect(() =>{
        if(isActive&& ! isPaused){
            timerRef.current = setInterval(() =>{
                setTimeLeft((prevTime) => {
                    if(prevTime <= 1){
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prevTime -1;
                }
            )
            } , 1000);
        }
        return () => {
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        }
    }, [isActive, isPaused]
);
const formatTime = (time:number): string =>{
    const minutes = Math.floor(time/60);
    const seconds=time % 60 ;
    return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`
};
const handleDurationChange =(e: ChangeEvent<HTMLInputElement>):void =>{
    setDuration(Number(e.target.value) || "") ;
};
return(
    // container div for centering the content
    <div className="flex flex-col items-center justify-center h-screen bg-white-200">
        {/* TIMER BOX CONTAINER*/}
        <h1 className="text-2xl font-bold mb-4 text-blue-800  dark:text-black-200">
        
            COUNTDOWN TIMER</h1>
            {/* input  and set button container */}
            <div className="flex items-center mb-6">
                <Input
                type="number"
                id="duration"
                placeholder="Enter duration in second"
                value={duration}
                onChange={handleDurationChange}
                className="flex-1 mr-4 rounded-md border-blue-700 dark:border-black-800"/>

                <Button 
                onClick={handSetDuration}
                variant="outline"
                className="text-blue-800 dark:text-gray-200">
                    set
                </Button>
                </div>
                {/* Display the formatted time left */}
                <div className=" py-7  text-6xl font-bold text-gray-800 dark:text-blue-500">
                    {formatTime(timeLeft)}
                </div>
                {/* button to start, pause, and reset the timer */}
                <div className="flex justify-center gap-6 ">
                    <Button
                    onClick={handleStart}
                    variant="outline"
                    className="text-blue-800 dark:text-blue-200">
                        {isPaused ? "Resume": "Start"}
                    </Button>
                    <Button
                    onClick={handlepause}
                    variant="outline"
                    className="text-blue-800 dark:text-gray-200">
                        pause
                    </Button>
                    <Button
                    onClick={handleReset}
                    variant="outline"
                    className="text-blue-800 dark:text-gray-200" >
                        Reset
                    </Button>
                    </div>
                    </div>
                    )
                     
        



}
