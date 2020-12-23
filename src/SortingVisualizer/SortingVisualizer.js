import React, { Component } from 'react'
import './SortingVisualizer.css'
import {getMergeSortAnimations} from '../sortingAlgorithms/merge-sort.js';
import {getQuickSortAnimations} from '../sortingAlgorithms/quick-sort.js';

const ANIMATION_SPEED_RANGE = [1, 500]
const MAX_ARRAY = [135, 500]; //Max value of an element, Max Size

let ARRAY_SIZE = (MAX_ARRAY[1]-MAX_ARRAY[0])/2;
let ANIMATION_SPEED=(ANIMATION_SPEED_RANGE[1]-ANIMATION_SPEED_RANGE[0])/10;
const PRIMARY_COLOR = 'lime';
const SECONDARY_COLOR = 'red';
// const SORTED_COLOR = 'turquoise'
const PIVOT_COLOR = 'yellow';

export class SortingVisualizer extends Component {




    constructor(props){
        super(props);
        this.state={
            array: [],
        }
    }

    componentDidMount() {
        this.generateArray();
    }

    generateArray = () => {
        let arr=[];
        const len = randomNumber(5,MAX_ARRAY[1]); 
        for(let i=0;i<len;i++)
        {
            arr.push(randomNumber(5,MAX_ARRAY[0]));
        }
        this.setState({
            array: arr
        })
        // console.log(arr.length);
        
    }


    mergeSort = () => {
        const array = this.state.array
        const inputSpeed = document.getElementById('animationSpeed')
        const arraySize = document.getElementById('array_size')
        const genArray = document.getElementById('genArray');
        inputSpeed.disabled=true;
        genArray.disabled=true;
        arraySize.disabled=true;

        const animations = getMergeSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            // console.log('merge '+ ANIMATION_SPEED);

            const arrayElements = document.getElementsByClassName('array-element');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayElements[barOneIdx].style;
                const barTwoStyle = arrayElements[barTwoIdx].style;


                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                // }, i * this.state.animation_speed);
                }, i * ANIMATION_SPEED);

            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayElements[barOneIdx].style;
                    barOneStyle.height = `${newHeight*5}px`;
                // }, i * this.state.animation_speed);
                }, i * ANIMATION_SPEED);
            }
        }
        setTimeout(()=> {
            inputSpeed.disabled=false;
            genArray.disabled=false;
            arraySize.disabled=false;
        },animations.length*ANIMATION_SPEED)
        

    }

    quickSort = () => {
        const array = this.state.array
        const inputSpeed = document.getElementById('animationSpeed')
        const genArray = document.getElementById('genArray');
        const arraySize = document.getElementById('array_size')
        inputSpeed.disabled=true;
        genArray.disabled=true;
        arraySize.disabled=true;


        // const animations=[];

        // animations.push({
        //     comp: [1,2],
        //     comp:[3,4],
        //     swap:[[1,]]
        // })

        const animations = getQuickSortAnimations(array);
        let pivotBarStyle = null;

        // console.log(animations);
        for (let i = 0; i < animations.length; i++) {
            // console.log('merge '+ ANIMATION_SPEED);

            const animationObj = animations[i];
            const arrayElements = document.getElementsByClassName('array-element');
            if(animationObj.hasOwnProperty('pivot')) {
                if(pivotBarStyle)  pivotBarStyle.backgroundColor = PRIMARY_COLOR;
                //change previous pivot bar style back to primary color
                const pivotIdx = animationObj.pivot;
                pivotBarStyle =  arrayElements[pivotIdx].style;
                pivotBarStyle.backgroundColor = PIVOT_COLOR;

                console.log(animationObj)
                continue;
            }
            

            const isColorChange = animationObj.hasOwnProperty('comp');
            if (isColorChange) {
                // const [barOneIdx, barTwoIdx] = animationObj.comp;
                const [barOneIdx] = animationObj.comp;
                const barOneStyle = arrayElements[barOneIdx].style;
                // const barTwoStyle = arrayElements[barTwoIdx].style;


                const color = animationObj.comp[1] ? SECONDARY_COLOR : PRIMARY_COLOR;
                /*third element of comp property has a flag to determine which color to
                 change into. true for changing into secondry and false for changing back */
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    // barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED);

            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animationObj.swap;
                    const barOneStyle = arrayElements[barOneIdx].style;
                    barOneStyle.height = `${newHeight*5}px`;
                }, i * ANIMATION_SPEED);
            }
        }
        setTimeout(()=> {
            inputSpeed.disabled=false;
            genArray.disabled=false;
            arraySize.disabled=false;

        },animations.length*ANIMATION_SPEED)
        

    }
    

     handleAnimationSlider = (event) => {
        const value = event.target.value;
        ANIMATION_SPEED=value;
        console.log(ANIMATION_SPEED)
    };

    handleArraySizeSlider = (event) => {
        ARRAY_SIZE = event.target.value;
        // this.generateArray();
        let arr=[];
        for(let i=0;i<ARRAY_SIZE;i++)
        {
            arr.push(randomNumber(5,100));
        }
        this.setState({
            array: arr
        })
        //Chnage array size
        
    }

    test = () => {

        for(var i=0;i<6;i++)
        {
            setTimeout(()=>{
                console.log(i);
            },2000);
        }
        console.log('after loop')

    }


    render() {

        const {array} = this.state;
        return (
            <div>

                <div className='array-operations'>
                    <button onClick={this.generateArray} id='genArray'>Generate Array</button>
                    <button onClick={this.mergeSort} >Merge Sort</button>
                    <button onClick={this.quickSort} >Quick Sort</button>
                    <button onClick={this.test}>Test</button>
                    {/* Do not use 'value' attribute as it will not move the slider */}
                    <input type='range' defaultValue= {ANIMATION_SPEED} id='animationSpeed'
                           min={ANIMATION_SPEED_RANGE[0]} max={ANIMATION_SPEED_RANGE[1]}
                           onChange={this.handleAnimationSlider} />
                    <input type='range' defaultValue= {ARRAY_SIZE} id='array_size'
                           min='5' max={MAX_ARRAY[1]}
                           onChange={this.handleArraySizeSlider} />
                    
                </div> 

                <div className='array-container'>
                    {array.map((value,index)=> (
                         <div className='array-element' key={index} 
                                    style= {{
                                        // width: `${1800/array.length}px`,
                                        height: (value*5)+'px',
                                        backgroundColor: PRIMARY_COLOR
                                    }} >{value}</div>
                    ))}
                </div>
            </div>
        );
    }
     
    

      
}
function randomNumber(min,max)  {
    return Math.floor(Math.random() * (max - min + 1) + min);
}



export default SortingVisualizer
