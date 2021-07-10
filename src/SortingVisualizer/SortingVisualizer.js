import React, { Component } from 'react'
import './SortingVisualizer.css'
import {getMergeSortAnimations} from '../sortingAlgorithms/merge-sort.js';
import {getQuickSortAnimations} from '../sortingAlgorithms/quick-sort.js';

const ANIMATION_SPEED_RANGE = [5, 500]
const MAX_ARRAY = [30, 135, 200]; //[Min,Max value of an element, Max Size]
const MAX_SIZE_FOR_TEXT_DISPLAY=20

let ARRAY_SIZE = (MAX_ARRAY[1]-MAX_ARRAY[0])/2;
let ANIMATION_SPEED=(ANIMATION_SPEED_RANGE[1]-ANIMATION_SPEED_RANGE[0])/10;
let TEXT_DISPLAY;
const FACTOR=4;

const PRIMARY_COLOR = 'lime';
const SECONDARY_COLOR = '#feb236';
const SWAPPING_COLOUR = 'turquoise'
const SORTED_COLOR = '#d64161'
const PIVOT_COLOR = 'rgb(34, 114, 52)';


export class SortingVisualizer extends Component {




    constructor(props){
        super(props);
        this.state={
            array: [],
            DOMArray: [],
        }
    }

    componentDidMount() {
        this.generateArray();
    }

    generateArray = () => {
        let arr=[]//[65,55,76,68,12,24];
        const len = randomNumber(5,MAX_ARRAY[2]); 
        if(len<MAX_SIZE_FOR_TEXT_DISPLAY)
            TEXT_DISPLAY=true
        else
            TEXT_DISPLAY=false

        for(let i=0;i<len;i++)
        {
            const x = randomNumber(MAX_ARRAY[0],MAX_ARRAY[1])
            arr.push(x);
            
        }
        this.setState({
            array: arr,
            DOMArray: arr.slice()
        })
        // console.log(arr.length);
        
    }



    mergeSort = () => {
        const array = this.state.array
        this.disableAndEnableButtons(true); //Disable buttons


        const animations = getMergeSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            // console.log('merge '+ ANIMATION_SPEED);

            const arrayElements = document.getElementsByClassName('array-element');
            const isCompare = i % 4 < 2;
            if (isCompare) {
                const [barOneIdx, barTwoIdx] = animations[i];
                console.log(barTwoIdx);
                const barOneStyle = arrayElements[barOneIdx].style;
                const barTwoStyle = arrayElements[barTwoIdx].style;


                const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                // }, i * this.state.animation_speed);
                }, i * ANIMATION_SPEED);

            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayElements[barOneIdx].style;

                    const changeValue = (i%4 === 2) 
                    if(changeValue) {
                        barOneStyle.backgroundColor = SWAPPING_COLOUR;
                        barOneStyle.height = `${newHeight*FACTOR}px`;
                    } else {
                        barOneStyle.backgroundColor = PRIMARY_COLOR;

                    }
                    //Third object which is the first swapping object

                // }, i * this.state.animation_speed);
                }, i * ANIMATION_SPEED);
            }
        }
        setTimeout(()=> {
            // if(i===animations.length-1){
                this.disableAndEnableButtons(false)
            // }
        },animations.length*ANIMATION_SPEED)
        

    }
    disableAndEnableButtons(flag) {
               
        document.getElementById('animationSpeed').disabled=flag;
        document.getElementById('genArray').disabled=flag;
        document.getElementById('array_size').disabled=flag;
        document.getElementById('merge-sort').disabled=flag;
        document.getElementById('quick-sort').disabled=flag;

    }

    
    quickSort = () => {
        const array = this.state.array
        this.disableAndEnableButtons(true); //Disable buttons

        console.log(array)

        const animations = getQuickSortAnimations(array);
        //Pivot animations is for coloring pivot elements
        let pivotBarStyle = null;
        // console.log(this.state.array)
        // console.log(animations);

        for (let i = 0, j = 0; i < animations.length; i++) {
            // console.log('merge '+ ANIMATION_SPEED);


            const animationObj = animations[i];
            const arrayElements = document.getElementsByClassName('array-element');
            const isCompare = animationObj.hasOwnProperty('comp');
            if (isCompare) {

                // console.log(pivotAnimations)
                
                


                const [barOneIdx, barTwoIdx] = animationObj.comp;
                
                let barOneStyle=null,barTwoStyle=null;
                if(arrayElements[barOneIdx])  barOneStyle = arrayElements[barOneIdx].style;
                if(arrayElements[barTwoIdx])  barTwoStyle = arrayElements[barTwoIdx].style;
                //Check NULL

                const color = animationObj.compFlag ? SECONDARY_COLOR : PRIMARY_COLOR;
                /*compFlag is a  flag to determine which color to
                 change into. true for changing into secondry and false for changing back */

                const firstComp = animationObj.firstComp;
                const pivotIdx = animationObj.pivotIdx;

                setTimeout(() => {
                    // console.log(pivotIdx)
                    if(firstComp){
                        const pivStyle = arrayElements[pivotIdx].style;
                        pivStyle.backgroundColor=PIVOT_COLOR;
                    }

                    if(barOneStyle) barOneStyle.backgroundColor = color;
                    if(barTwoStyle) barTwoStyle.backgroundColor = color;



                    if(i===animations.length-1){
                        this.disableAndEnableButtons(false)  //Enable buttons
                    }

                }, i * ANIMATION_SPEED);

            } else if(animationObj.hasOwnProperty('swap')) {


                if(animationObj.hasOwnProperty('isSwap')) //if animation obj has isSwap property
                {

                    // code for changing colour
                    const isSwap = animationObj.isSwap;
                    const [barOneIdx,barTwoIdx] = animationObj.swap;
                    if(barOneIdx!==barTwoIdx){  //If both indexes are same then dont swap
                        setTimeout(() => {

                            // console.log(animationObj);
                            // console.log(`coloured:\n1:${barOneIdx},2:${barTwoIdx}`);
                            const barOneStyle = arrayElements[barOneIdx].style;
                            const barTwoStyle = arrayElements[barTwoIdx].style;

                            const color = (isSwap) ? SWAPPING_COLOUR : PRIMARY_COLOR
                            //Give colour according to the flag which shows the swapping
                                // if(barOneIdx!==barTwoIdx){
                                    barOneStyle.backgroundColor = color;
                                    barTwoStyle.backgroundColor = color;
                                // } 
                            if(animationObj.hasOwnProperty('newSortedIdx')){
                                const newSortedIdx = animationObj.newSortedIdx;
                                const sortedIdxStyle =  arrayElements[newSortedIdx].style;

                                sortedIdxStyle.backgroundColor = SORTED_COLOR;
                            }
        
                                
                            if(i===animations.length-1){
                               this.disableAndEnableButtons(false); 
                                console.log('ALGORITHM DONE');
                                //After the entire algorithm is done
                               console.log(this.state.DOMArray)
                            }
                        }, i * ANIMATION_SPEED);
                    } else {        //If bars indices are equal
                        // console.log(animationObj)
                        setTimeout(()=>{
                            if(animationObj.hasOwnProperty('newSortedIdx')){

                                // if(j<pivLen) {
                                //     const pivElementIdx = pivotAnimations[j];
                                //     // console.log(pivElementIdx)
                    
                                //     const pivStyle = arrayElements[pivElementIdx].style;
                    
                                //         // console.log(j);
                                //         pivStyle.backgroundColor=PRIMARY_COLOR;
                                //         j++;
                    
                                //     }
                                const newSortedIdx = animationObj.newSortedIdx;
                                const sortedIdxStyle =  arrayElements[newSortedIdx].style;

                                sortedIdxStyle.backgroundColor = SORTED_COLOR;
                                
                            }
                        },i*ANIMATION_SPEED)
                    }
                        
                       
                     
                   
                } else {        //if anim-obj does not have isSwap property
                        //Code for swapping actual values

                        setTimeout(()=>{
                            const [barOneIdx,newHeight1,barTwoIdx,newHeight2] = animationObj.swap
                            // console.log(`swapped:\n1:${newHeight1}, 2:${newHeight2}`)
                            const barOneStyle = arrayElements[barOneIdx].style;
                            const barTwoStyle = arrayElements[barTwoIdx].style;
                            // console.log('swapping values')
                            
                            // if(barOneIdx!==barTwoIdx) {
                                const arr = this.state.DOMArray;
                            
                                arr[barOneIdx] = newHeight2;
                                arr[barTwoIdx] = newHeight1;
    
                                barOneStyle.height = `${newHeight2*FACTOR}px`
                                barTwoStyle.height = `${newHeight1*FACTOR}px`
                                
                                this.setState({
                                    DOMArray: arr
                                })
                            // }
                           
                        },i*ANIMATION_SPEED);
                       
                }//End of isSwap prop else
            } //Endd of pvot else
            setTimeout(()=> {
                // if(i===animations.length-1){
                    this.disableAndEnableButtons(false)
                // }
            },animations.length*ANIMATION_SPEED)
                
                    
                
            // }
        //    }
        }
        
        

    }
    

     handleAnimationSlider = (event) => {
        const value = ANIMATION_SPEED_RANGE[1]+ANIMATION_SPEED_RANGE[0]
                                                -event.target.value;
        console.log(value)
        ANIMATION_SPEED=value;
        // console.log(ANIMATION_SPEED)
    };

    handleArraySizeSlider = (event) => {
        resetStyles()
        ARRAY_SIZE = event.target.value;
        // this.generateArray();
        let arr=[];
        if(ARRAY_SIZE<MAX_SIZE_FOR_TEXT_DISPLAY)
            TEXT_DISPLAY=true
        else
            TEXT_DISPLAY=false
        for(let i=0;i<ARRAY_SIZE;i++)
        {
            const x = randomNumber(MAX_ARRAY[0],MAX_ARRAY[1])
            arr.push(x);
            
        }
        this.setState({
            array: arr,
            DOMArray: arr.slice()

        })
        //Chnage array size
        
    }

    test = () => {
        // let arr = this.state.array.slice();
        // arr.sort();
        // let an=getQuickSortAnimations(this.state.array)
        // let eq = true;
        // for(let i=0;i<arr.length;i++)
        // {
        //     if(!arr[i]===this.state.array[i])
        //         eq=false
        // }
        // console.log(eq);
    const arrayElements = document.getElementsByClassName('array-element');
        
        // if(arrayElements[2].style.backgroundColor===SORTED_COLOR)
        //     console.log(true);
        // else console.log(false)
        console.log(arrayElements[2].style.backgroundColor)
    }

    
    setValue(index) {
        return this.state.DOMArray[index];
    }

    render() {

        const array = this.state.DOMArray;
        return (
            <div>

                <div className='array-operations'>
                    <button className='btn btn-primary button'
                            onClick={this.generateArray} 
                            id='genArray'>Generate Random Array</button>
                    <button className='btn btn-primary button'
                            onClick={this.mergeSort} id='merge-sort' >Merge Sort</button>
                    <button className='btn btn-primary button'
                            onClick={this.quickSort} id='quick-sort'>Quick Sort</button>
                    {/* <button onClick={this.test}>Test</button> */}
                    {/* Do not use 'value' attribute as it will not move the slider */}
                    <div>
                        <span>SPEED</span>
                        <input  
                                type='range' defaultValue= {ANIMATION_SPEED} id='animationSpeed'
                            min={ANIMATION_SPEED_RANGE[0]} max={ANIMATION_SPEED_RANGE[1]}
                            onChange={this.handleAnimationSlider} />
                    </div>
                    <div>
                        <span>ARRAY SIZE</span>
                        <input type='range' defaultValue= {ARRAY_SIZE} id='array_size'
                           min='5' max={MAX_ARRAY[1]}
                           onChange={this.handleArraySizeSlider} />
                    </div>
                    
                    
                    
                </div> 

                <div className='array-container'>
                    {array.map((value,index)=> (
                         <div className='array-element' key={index} 
                                    style= {{
                                        height: (value*FACTOR)+'px',
                                        backgroundColor: PRIMARY_COLOR
                                    }} >
                             {/* <p>{ TEXT_DISPLAY ?  this.setValue(index) : '' } </p> */}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
     
   
      
}
function randomNumber(min,max)  {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function resetStyles() {
    
    const arrayElements = document.getElementsByClassName('array-element');
    // if(arrayElements){
        for(let i=0;i<arrayElements.length;i++)
    {
        arrayElements[i].style.backgroundColor = PRIMARY_COLOR;
    }
    // }
    
}



export default SortingVisualizer
