export function getQuickSortAnimations(array) {
    const animations=[];
    const sorted=[];
    quickSort(array,0,array.length-1, animations,sorted);
    return animations;
}

function quickSort(
    array,
    low,
    high,
    animations,
    
    sorted
){
        // const partition = createPartition(array,low,high,animations)

        

        if(low<=high)
        {
            const partition = createPartition1(array,low,high,animations,sorted);
            // const partition = createPartition2(array,low,high,animations);
            
            quickSort(array,low,partition-1,animations,sorted);
            quickSort(array,partition+1,high,animations,sorted);
        }
    // 
            // const partition = createPartition2(array,low,high,animations);
            // if(low<partition-1)
            //     quickSort(array,low,partition-1,animations)
            // if(high>partition)
            //     quickSort(array,partition,high,animations)

}

function createPartition1(array,low,high,animations,sorted) {

    const pivot = array[high]; //Select pivot element for partition
    
    const pivotIdx = high;
    let i=low-1;
    for(let j=low;j<high;j++)
    {
        

        if(j==low)   compareAnimation(animations,[j],high,true, true)    //last parameter is whether this is
                                                                    //a first comparison
        else   compareAnimation(animations, [j], high, true)

        

        if(array[j]<pivot) {
            i++;
           if(i!=j) compareAnimation(animations, [i], true);
            // compareAnimation(animations,[i],false);

           swapAnimation(animations, i, j, array);
            
            let temp = array[i]; 
            array[i] = array[j]; 
            array[j] = temp; 

            
        }
        compareAnimation(animations, [j] ,false)

    }
   if(i+1!==high) compareAnimation(animations,[i+1,high],true)
    // compareAnimation(animations,[i+1,high],false)

      if( checkSortedElement(sorted,i+1) )
       { 
           swapAnimation(animations,i+1,high,array,true);    //last parameter is to show there is a new sorted element
            sorted.push(i+1)
        }
        else swapAnimation(animations,i+1,high,array,false);
    let temp = array[i+1]; 
    array[i+1] = array[high]; 
    array[high] = temp; 
  
    return i+1; 

}

function createPartition2(arr,low,high,animations)  {
    const pivot = arr[low];
    const pivotIdx = low;
    let i = low;
    let j  = high;
    
    // animations.push({
    //     pivot: [pivotIdx,true]  //change colour on pivot elmenet
    // });


    while(i<=j) {
        
        // compareAnimation(animations,i,j)
        // compareAnimation(animations,j,low)
        while(arr[i]<pivot /*|| arr[j]>pivot*/) {
                     
            // if(arr[i]<=pivot)
                i++;
            // if(arr[j]>pivot)
            //     j++;
           
            // compareAnimation(animations,i,low);
        }
       
        // compareAnimation(animations,j,low)
        while(arr[j]>pivot){
            
            j--;
            // compareAnimation(animations,j,low);
        }
        
        
       
        
        if(i<=j) {
           

            // swapAnimation(animations,i,j,arr)
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;


            i++;
            j--;
        }
    }

    

    // swapAnimation(animations,low,j,arr)


    //Swapping pivot element
    // const temp = arr[low];
    // arr[low] = arr[j];
    // arr[j] = temp;
    
    // animations.push({
    //     pivot: [pivotIdx,false] //Change colour back from pivot color
    // })

    return i;
   
}


function checkSortedElement(sorted, index) {     //function to check whether the sorted array already contains the index
    return !sorted.includes(index);
}






function compareAnimation(animations,idxArr,pivotIdx,compFlag, firstComp=false) {
        animations.push({
            comp: idxArr,
            compFlag: compFlag,
            firstComp: firstComp,
            pivotIdx: pivotIdx 
        });

}

function swapAnimation(animations,index1,index2,array, newSortedEle=false) {
    
    
    animations.push({ 
        swap: [index1, index2], 
        isSwap: true,
    });
    animations.push({ 
        swap: [index1, array[index1], index2, array[index2]] 
    }); 
    if(!newSortedEle)   //Whether the swap has a new sorted element
        animations.push({ 
            swap: [index1, index2], 
            isSwap: false,
        });
    else
        animations.push({
            swap: [index1, index2], 
            isSwap: false,
            newSortedIdx: index1        //Shows the element in its correct sorted position
        })
}