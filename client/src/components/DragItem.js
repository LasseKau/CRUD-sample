import React, { useState, useEffect } from 'react'
import './App.css';
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

function dragOnClick(props) {
    console.log("animated div");
    <animated.div

        {...bind()}
        style={{ x, y }}
        styles="width:20px;height:20px;background-color:red"
    >
        <div className="content" id="j1_64_anchor">
            <button onClick="int()" class="collapsible">Interfaces</button>
        </div>
    </animated.div>
};

function DragButton(props) {
    const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
    console.log("pulling");
    dragOnClick();
    const bind = useDrag(({ down, movement: [mx, my] }) => {
        //console.log(down);
        set({ x: down ? mx : 0, y: down ? my : 0 });
        console.log("release");
    })
};






