def bfs(array, data):
    t = getUnique(data)


def getUnique(data):
    unique = []
    arr = data.copy()
    dup = []
    for x in arr:
        if x in dup:
            unique.remove(x)
            arr = list(filter((x).__ne__, arr))
        else:
            dup.append(x)
            unique.append(x)
    return unique
