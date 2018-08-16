def heapSort(arr):
    length = len(arr)
    sortedArray = []
    while len(sortedArray) != length:
        maxHeap = maxSort(arr).pop(0)
        sortedArray.insert(0, maxHeap)
    return sortedArray

def maxSort(arr):
    arrayLength = len(arr) - 1
    while arrayLength >= 0:
        largestIndex = arrayLength
        leftNode = arrayLength * 2 + 1
        rightNode = arrayLength * 2 + 2
        try:
            if arr[leftNode] > arr[largestIndex]:
                largestIndex = leftNode
            if arr[rightNode] > arr[largestIndex]:
                largestIndex = rightNode
            if largestIndex != arrayLength:
                arr[arrayLength], arr[largestIndex] = arr[largestIndex], arr[arrayLength]
            arrayLength -= 1
        except Exception as e:
            t = e
            if largestIndex != arrayLength:
                arr[arrayLength], arr[largestIndex] = arr[largestIndex], arr[arrayLength]
            arrayLength -= 1
            continue
    return arr
