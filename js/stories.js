"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/**  */
$("#submit-story-btn").on("click", getNewStoryData);

async function getNewStoryData() {
  const newAuthor = $authorInputField.val;
  const newTitle = $titleInputField.val;
  const newUrl = $urlInputField.val;
  const newStoryData = {
    title: newTitle,
    author: newAuthor,
    url: newUrl,
  };

  // create new li, which will be prepended when added to dom
  // titles are anchor tags that link to the story
  // newTitle, newUrl in parentheses and "by" newAuthor
  // underneath will have "posted by" username

  // add story takes these two:
  //  user
  //  obj of {title, author, url}
  // addStory must be called on an instance of StoryList
  const newStory = await storyList.addStory(currentUser, newStoryData);
  return newStory;
}

function displayNewStory(newStory) {
  const title = newStory.title;
  const author = newStory.title;
  const url = newStory.url;
  const username = newStory.username;

  $('#all-stories-list')
  .html('<li> </li>');

}


// ( "div.demo-container" )
//   .html( "<p>All new content. <em>You bet!</em></p>" );
// async function addAndDisplayNewStory() {
//   displayNewStory(newStory);
// }
