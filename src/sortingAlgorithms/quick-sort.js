export function getQuickSortAnimations(array) {
    const animations=[];
    
    quickSort(array,0,array.length-1, animations);

    // console.log(array);
    return animations;
}

function quickSort(
    array,
    low,
    high,
    animations
){
    if(low<high) {
        const partition = createPartition(array,low,high,animations)

        quickSort(array,low,partition-1,animations);
        quickSort(array,partition+1,high,animations);
    }
}

function createPartition(array,low,high,animations) {

    const pivot = array[high]; //Select pivot element for partition
    animations.push({
        pivot: high
    })          //Colour the pivot element
    let i=low-1;
    for(let j=low;j<high;j++)
    {
        // animations.push({
        //     comp: [j, high, true]
        // });
        // //Change colour for comparing

        // animations.push({
        //     comp: [j, high, false]
        // });
        // //Change colour back

        animations.push({
            comp: [j, true]
        });
        //Change colour for comparing

        animations.push({
            comp: [j, false]
        });
        //Ch

        if(array[j]<pivot) {
            i++;

            animations.push({ 
                swap: [i, array[j]] 
            });

            animations.push({
                swap: [j, array[i]]
            })
            let temp = array[i]; 
            array[i] = array[j]; 
            array[j] = temp; 

            
        }
    }

    animations.push({
        swap: [i + 1, array[high]]
    });
    animations.push({
        swap: [high, array[i + 1]]
    });
    let temp = array[i+1]; 
    array[i+1] = array[high]; 
    array[high] = temp; 
  
    return i+1; 

}