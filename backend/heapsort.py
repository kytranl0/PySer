def maxHeapSort(arr):
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


def minHeapSort(arr, int):
    result = []
    min_heap = {}
    while len(result) != int:
        if len(min_heap) != len(arr):
            for i in range(0, len(arr)):
                min_heap[i] = arr[i].pop(0)
            sorted_heap = min_heap.copy()
            sorted_heap = minSort(sorted_heap, len(min_heap) - 1)

            result.append(min_heap.pop(0))


def minSort(min_heap, int):
    while int >= 0:
        smallest = int
        l = 2 * smallest + 1
        r = 2 * smallest + 2
        try:
            if min_heap[smallest] > min_heap[l]:
                smallest = l
            if min_heap[smallest] > min_heap[r]:
                smallest = r
            if smallest != int:
                min_heap[smallest], min_heap[int] = min_heap[int], min_heap[smallest]
            int -= 1
        except Exception as e:
            if smallest != int:
                min_heap[smallest], min_heap[int] = min_heap[int], min_heap[smallest]
            int -= 1
            continue
    return min_heap




        # while result != int:
#     for index in range(0, len(arr)):
#         if min_heap != len(arr):
#             min_heap.append(arr[x][y])
#
#     length = len(min_heap) - 1
#     while length >= 0:
#         smallest = length
#         l = 2 * smallest + 1
#         r = 2 * smallest + 2
#         try:
#             if min_heap[smallest] > min_heap[l]:
#                 smallest = l
#             if min_heap[smallest] > min_heap[r]:
#                 smallest = r
#             if smallest != length:
#                 min_heap[length], min_heap[smallest] = min_heap[smallest], min_heap[length]
#             length -= 1
#         except Exception as e:
#             if smallest != length:
#                 min_heap[length], min_heap[smallest] = min_heap[smallest], min_heap[length]
#             length -= 1
#             continue
#     result.append(min_heap.pop(0))
