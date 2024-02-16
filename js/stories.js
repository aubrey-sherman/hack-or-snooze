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

/** $body.on("click", "#nav-all", navAllStories);
 */

$("#story-submit-btn").on("click", getNewStoryData);

async function getNewStoryData(evt) {
  evt.preventDefault();
  console.log(' get new story is being called')
  const newAuthor = $authorInputField.val;
  const newTitle = $titleInputField.val;
  const newUrl = $urlInputField.val;
  const newStoryData = {
    title: newTitle,
    author: newAuthor,
    url: newUrl,
  };

  const newStory = await storyList.addStory(currentUser, newStoryData);

  displayNewStory(newStory);
  //return newStory;
}

function displayNewStory(newStory) {
  console.log("display new story is a working function!!!");
  const title = newStory.title;
  const author = newStory.title;
  const url = newStory.url;
  const username = newStory.username;

  $('#all-stories-list')
    .html('<li> </li>');

  const $newListItem = $("<li>")
    .html(`<a class="story-link" href=${url}>${title}</a>`)
    .html(`<small class="story-hostname">${url}</small>`)
    .html(`<small class="story-author">by ${author}</small>`)
    .html(`<small class="story-user">posted by ${username}`);

  $allStoriesList.prepend($newListItem);

}


// ( "div.demo-container" )
//   .html( "<p>All new content. <em>You bet!</em></p>" );
// async function addAndDisplayNewStory() {
//   displayNewStory(newStory);
// }
