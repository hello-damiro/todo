# todo

The Odin Project - Intermediate JS project

## Warning! This is a work in progress

LIVE SITE [HERE](https://hello-damiro.github.io/todo)

**Day 1:** Took about 3 hrs to complete the UI design of the app. Prepared the repo for the project using Webpack boilerplate created the entire day. LOL.

**Day 2:** Completed UI layout of the project-- took me 10hrs. Started figuring out on how to orchestrate classes and functions with JS. Got to dive into activating UI first... I guess.

**Day 3:** Done almost all of of UI functionalities. Started tying different modules like the UI, json data and the processes in between. Still feels I have an unclean code. 😒

**Day 4:** Realized that app doesnt need a sidebar and removed it. Formatted dates using `dayjs` (2kB) instead of `date-fns` which is too heavy for a small todo app. Learning how classes are structured for them to communicate to each other.

**Day 5:** Cant believe Im on my 5th day 😑 and still in the process of understanding coupling. at the time im experimenting with pubsub, webpack crashes. 😭😭😭

**Day 6:** Understanding various module pattern is the key! Recognizing different module patterns will be beneficial for various purposes such as reading documentations, reading other codes and considering strategic advantages in design implementations. Finished up with localStorage feature. Theres a lot of improvement to be done in the interface and the code itself. But this should do for now.

</br>

## Screenshot

### Project listing

![Screenshot](https://github.com/hello-damiro/todo/blob/main/src/assets/images/screenshot.png?raw=true)

### Add Project UI

![Screenshot](https://github.com/hello-damiro/todo/blob/main/src/assets/images/screenshot-2.png?raw=true)

</br>

## Challenges

1. Your ‘todos’ are going to be objects that you’ll want to dynamically create, which means either using factories or constructors/classes to generate them.

2. Brainstorm what kind of properties your todo-items are going to have. At a minimum they should have a `title`, `description`, `dueDate` and `priority`. You might also want to include `notes` or even a checklist.

3. Your todo list should have `projects` or separate lists of `todos`. When a user first opens the app, there should be some sort of `default` project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into.

4. You should separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.

5. The look of the User Interface is up to you, but it should be able to do the following:

    a. view all projects
    b. view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)
    c. expand a single todo to see/edit its details
    d. delete a todo

6. Since you are probably already using webpack, adding external libraries from npm is a cinch! You might want to consider using the following useful library in your code: `date-fns` gives you a bunch of handy functions for formatting and manipulating dates and times.

7. We haven’t learned any techniques for actually storing our data anywhere, so when the user refreshes the page, all of their todos will disappear! You should add some persistence to this todo app using the Web Storage API.

    `localStorage` [(docs here)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) allows you to save data on the user’s computer. The downside here is that the data is ONLY accessible on the computer that it was created on. Even so, it’s pretty handy! Set up a function that saves the projects (and todos) to localStorage every time a new project (or todo) is created, and another function that looks for that data in localStorage when your app is first loaded. Additionally, here are a couple of quick tips to help you not get tripped up:

    * Make sure your app doesn’t crash if the data you may want retrieve from localStorage isn’t there!
    * localStorage uses [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) to send and store data, and when you retrieve the data, it will also be in JSON format. You will learn more about this language in a later lesson, but it doesn’t hurt to get your feet wet now. Keep in mind you cannot store functions in JSON, so you’ll have to figure out how to add methods back to your object properties once you fetch them. Good luck!
