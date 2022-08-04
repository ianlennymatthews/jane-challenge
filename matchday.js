const fs = require("fs");

try {
  const data = fs.readFileSync("./sample-input.txt", "utf8");

  let formattedData = formatData(data);

  let matchDays = determineMatchDays(formattedData);

  calculateResults(matchDays);
} catch (err) {
  console.error(err);
}

function formatData(data) {
  // separate data into new lines in array
  // & remove comma character
  let splitLines = data.split("\n").map((line) => {
    return line.replace(", ", " ");
  });

  // remove empty element from  end of array
  splitLines.pop();

  let separatedMatchArray = splitLines.map((match) => {
    // use regex to split on digit
    let temp = match
      .split(/(\d+)/)
      // remove any empty spaces in string
      .map((stringElement) => {
        return stringElement.trim();
      })
      // filter/remove empty element from end of array
      .filter((element) => {
        if (element !== "") {
          return true;
        }
      });

    return temp;
  });

  return separatedMatchArray;
}

function determineMatchDays(matches) {
  let matchDays = [];
  let tempMatch = {};
  let teams = [];

  matches.forEach((match, i) => {
    // if team is not already read and found in array
    if (!teams.includes(match[0]) && !teams.includes(match[2])) {
      // read to array
      teams.push(match[0]);
      teams.push(match[2]);

      // set new match
      tempMatch[i] = {
        [match[0]]: Number(match[1]),
        [match[2]]: Number(match[3]),
      };
    } else {
      // team already exists in array
      // due to rule-set we can determine we are currently on a new match day

      // push existing matches
      matchDays.push(tempMatch);
      // reset teams array
      teams = [];
      // reset match object
      tempMatch = {};
      // begin work on new day
      tempMatch[i] = {
        [match[0]]: Number(match[1]),
        [match[2]]: Number(match[3]),
      };
    }
  });
  // push final set of matches
  matchDays.push(tempMatch);

  return matchDays;
}

function calculateResults(matchDays) {
  let matchScore = {};
  matchDays.forEach((day, i) => {
    process.stdout.write("Matchday" + " " + (i + 1) + "\n");

    for (const [key, value] of Object.entries(day)) {
      let match = Object.entries(value);
      let team1 = match[0];
      let team2 = match[1];

      if (team1[1] > team2[1]) {
        // team 1 win
        matchScore[team1[0]] = matchScore[team1[0]] + 3 || 3;
      } else if (team1[1] < team2[1]) {
        // team 2 win
        matchScore[team2[0]] = matchScore[team2[0]] + 3 || 3;
      } else {
        // tie
        matchScore[team1[0]] = matchScore[team1[0]] + 1 || 1;
        matchScore[team2[0]] = matchScore[team2[0]] + 1 || 1;
      }
    }

    let topThree = getTopThree(matchScore);

    for (const score of topThree) {
      process.stdout.write(
        score[0] + ", " + score[1] + (score[1] === 1 ? " pt" : " pts") + "\n"
      );
    }

    process.stdout.write("\n");
  });
}

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
