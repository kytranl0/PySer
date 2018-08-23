from collections import defaultdict

async def compute(t):
    global result
    x = t.pop(0)
    unique.append(x)
    if x in t:
        unique.remove(x)
        result = list(filter((x).__ne__, t))
    return len(result)


async def getUnique(data):
    global result
    global unique
    unique = []
    result = data.copy()
    while await compute(result) != 0:
        continue
    return unique

async def bfs(array, int, length, uniqueNodes):
    result = {}
    return result
