// load data

const friendsData = require('../data/friends');

console.log(friendsData);

// Routing

module.exports = (app) => {
  // A GET route with the url /api/friends.
  // This will be used to display a JSON of all possible friends.
  app.get('/api/friends', function(req, res) {
    res.json(friendsData);
  });

  // A POST routes /api/friends. This will be used to handle incoming survey results.
  // This route will also be used to handle the compatibility logic.
  app.post('/api/friends', function(req, res) {
    const newFriend = req.body;

    // use parseInt to convert each score in array from a string to an integer
    let newFriendAnswerArray = [];

    newFriend.qAnswerArray.forEach(function(element) {
      const newInteger = parseInt(element);
      newFriendAnswerArray.push(newInteger);
    });


    let totalDifference = 0;
    const differenceComparisonArray = [];

    // function to get the total difference between the user input values and corresponding values from another user
    const findTotalDifference = (newFriendAnswers, storedUserAnswers) => {
      for (let i = 0; i < newFriendAnswers.length; i++) {
        const eachDifference = Math.abs(newFriendAnswers[i] - storedUserAnswers[i]);
        // console.log(eachDifference);

        totalDifference += eachDifference;
      }
      differenceComparisonArray.push(totalDifference);
      totalDifference = 0;
    };

    // use the totalDifference function to check against each friend in the friendsData array
    friendsData.forEach(function(element) {
      findTotalDifference(newFriendAnswerArray, element.qAnswerArray);
    });
    console.log(differenceComparisonArray);

    const friendMatchIndex = differenceComparisonArray.indexOf(Math.min(...differenceComparisonArray), 0);

    const friendMatch = friendsData[friendMatchIndex];
    // console.log(friendMatch);

    for (let i = 0; i < friendsData.length; i++) {
      friendsData[i].match = 'false';
    }

    friendMatch.match = 'true';
    // console.log(friendMatch.match);

    friendsData.push(newFriend);
    // console.log(friendsData);
    res.json(friendsData);
    // console.log(req.body);
  });
};
