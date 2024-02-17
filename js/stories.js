"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
const $storySubmitBtn = $("#story-submit-btn");

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

/** Creates a new Story instance from the story submit form and returns it */

async function getNewStory() {
  const newAuthor = $authorInputField.val();
  const newTitle = $titleInputField.val();
  const newUrl = $urlInputField.val();

  const newStoryData = {
    title: newTitle,
    author: newAuthor,
    url: newUrl,
  };

  const newStory = await storyList.addStory(currentUser, newStoryData);

  return newStory;
}

/** Takes a Story instance and displays at top of storylist */

function displayNewStory(newStory) {
  $allStoriesList.prepend(generateStoryMarkup(newStory));
}

/** Creates a new story and displays it on the page */

async function getAndDisplayNewStory(evt) {
  evt.preventDefault();
  $storySubmitForm.trigger("reset");
  $storySubmitForm.hide();

  const newStoryData = await getNewStory();
  displayNewStory(newStoryData);
}

$storySubmitBtn.on("click", getAndDisplayNewStory);



/*
All of this was written before we noticed the generateStoryMarkup function.

function displayNewStory(newStory) {
  console.log("display new story is a working function!!!");
  const title = newStory.title;
  const author = newStory.title;
  const url = newStory.url;
  const username = newStory.username;
  debugger;


  const $newListItem = $("<li>");
  $newListItem.append(`<a class="story-link" href=${url}>${title}</a>`);
  $newListItem.append(`<small class="story-hostname">${url}</small>`);
  $newListItem.append(`<small class="story-author">by ${author}</small>`);
  $newListItem.append(`<small class="story-user">posted by ${username}`);

  $allStoriesList.prepend($newListItem);

}

*/