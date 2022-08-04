## Jane Technologies Challenge Retro / Design Doc 


## Table of Contents

1. [Intro](#introduction)
1. [Design Process](#design-process)
1. [Challenges](#challenges)
1. [Conclusion](#conclusion)

## Introduction

This was a really interesting excercise and it was pretty fun to think through! After reading throught the prompt and looking at the readme I initially approached the problem into three seperate tasks:


1. Read data and format into an acceptable structure 

2. Handle Determining Days 

3. Handle Calculating Results 

***Very Important for both sanity and readability to seperate these tasks into seperate functions***

![Screen Shot 2022-08-04 at 9 59 14 AM](https://user-images.githubusercontent.com/29735316/182865765-61b893e2-25c6-48f8-9a2e-53ca38bb8f71.png)

---

## Design-Process

### Step 1: Read && Format 
![Screen Shot 2022-08-04 at 9 08 07 AM](https://user-images.githubusercontent.com/29735316/182860598-e7cda0e5-d6ec-49cb-a8f7-94ef5d88292f.png)

![Screen Shot 2022-08-04 at 9 37 35 AM](https://user-images.githubusercontent.com/29735316/182860873-67c49b95-1fe3-4676-ba66-0264c65c6404.png)

- Initially aware that the format of the matches were going to be directly influencing the implementation of reading the data
- Decided to read file line by line, split into seperate string arrays and ``split()`` on digit using regex
- Due to how I read file contents and split string there were empty positons in both the data array and the string array, it was necessary to do small pruning for parody
- This allowed to have a standard format for the data coming back

![Screen Shot 2022-08-04 at 9 43 12 AM](https://user-images.githubusercontent.com/29735316/182862101-444234d1-aa60-4626-bdbc-96141af70bc8.png)

- After doing this I am clearly able to distinguish that positions ``0`` and ``2`` of the match array contain team names, with positions ``1`` and ``3`` containing scores

### Step 2: Handle Days 
- After reading, and re-reading the prompt and format of the sample I was able to deter that the main way I was able to destinguish match days is by reading the data and checking for repeat team scores.
- No team can play more than once on a given day, hence we can check for that in code
```
 let teams = [];

   matches.forEach((match, i) => {
    // if team is not already read and found in array
    if (!teams.includes(match[0]) && !teams.includes(match[2])) {
      // add team name to temp array
    } else {
    // the team alredy exists and due to rule set we can determine there is a new match day 
    }
```
![Screen Shot 2022-08-04 at 9 52 26 AM](https://user-images.githubusercontent.com/29735316/182864154-293726cf-4f54-443f-ae9a-9c9d4bfee364.png)

### Step 3: Calculate Results 

- At this step it was very clear that what was next was to compare the results of each map day group
- Decided to implement a seperate function that would save and print the matchScore values during the iteration 
```
function calculateResults(matchDays) {
  let matchScore = {};
  matchDays.forEach((day, i) => {
  //
  get all scores for match day 
  }
```
- During implementation I was also aware of the following step which was to sort the results both alphabetically and numerically
- For readability, seperated it into a seperate function that calls is called in ``calculateResults``

```
function getTopThree(obj) {
  let copy = JSON.parse(JSON.stringify(obj));
  let sorted = Object.entries(copy).sort((a, b) => {
    if (b[1] === a[1]) {
      return a[0].localeCompare(b[0]);
    } else {
      return b[1] - a[1];
    }
  });

  return sorted.slice(0, 3);
}
```

- obj is result of all scores for given day
- sorts all of the given match scores
- exclusively returns the top three 

![Screen Shot 2022-08-04 at 11 11 26 AM](https://user-images.githubusercontent.com/29735316/182882683-976d58a2-f3b9-40c4-8423-72ce469fc621.png)

---

## Challenges 

- Initial Implementation of calculate resuluts function 

#### Before

![notdry](https://user-images.githubusercontent.com/29735316/182883971-2fe599fe-060b-428b-a592-f9e82b5074a4.png)

- not DRY
- repeat checking for if exists depending on which team won
- not very readable 

#### After

![DRY](https://user-images.githubusercontent.com/29735316/182884573-c01c3f80-79fc-4888-8f0c-b1d25d9496e2.png)
- much more dry and readable 
- defaults allow for less to be assumed about checking if key already exists in object or not 
- less lines of code!
---

## Conclusion

Overall this was a really fun excercise! If I had more time I would probably aim for two things specifically
- Automated Tests 
- Possibly redefining data structure, ended up switching between objects and arrays several times for accessing values which can be confusing 

# Thank You ! :)
