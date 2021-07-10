 
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  mergeSortHelper(array, 0, array.length - 1, animations);
  console.log(array);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(mainArray, startIdx, middleIdx, animations);
  mergeSortHelper(mainArray, middleIdx + 1, endIdx, animations);

  
  doMerge(mainArray, startIdx, middleIdx, endIdx, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  animations,
) {

  const auxiliaryArray = mainArray.slice();
  let i = startIdx; //start index of first array to merge
  let j = middleIdx + 1;  //start index of second array to merge
  let k = startIdx; //start index of merged array
  while (i <= middleIdx && j <= endIdx) {
    
    animations.push([i, j]);
    // These are the values that we're comparing; we push them once
    // to change their color.
    
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      
      animations.push([k, auxiliaryArray[i]]);

      animations.push([k, auxiliaryArray[i]]);

      mainArray[k++] = auxiliaryArray[i++];
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
    } else {
      
      animations.push([k, auxiliaryArray[j]]);

      animations.push([k, auxiliaryArray[j]]);

      mainArray[k++] = auxiliaryArray[j++];
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
    }
  }

  // Adding remaining elements in left subarray if present
  while (i <= middleIdx) {
    
    animations.push([i, i]);
    // These are the values that we're comparing; we push them once
    // to change their color.
    
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    
    animations.push([k, auxiliaryArray[i]]);

    animations.push([k, auxiliaryArray[i]]);

    mainArray[k++] = auxiliaryArray[i++];
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
  }

  // Adding remaining elements in right sub array if present
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    //First time to change colour to swapping

    animations.push([k, auxiliaryArray[j]]);
    //Second time to change colour back

    mainArray[k++] = auxiliaryArray[j++];
  }
}
