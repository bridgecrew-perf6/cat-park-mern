## Cat Park - a MERN Stack Project

#### 1. A review of functionality and features of the web app

Cat Park is a Progressive Web App that provides push notifications for subscribed users and offline access. Users can not only write posts, comments, but also refer to, like, and search cat breeds. Through navigation bar, users can also navigate to different pages, create/read/update/delete posts created by registered users, check and edit user profiles. With these basic functionalities and features for users to explore, Cat Park is a great place to gain knowledge of cat breeds and interact with others.

There are 8 main pages including Home, Search, Posts, About, Register, Login, Profile that users can access via navigation bar. The notification page is protected from users who are not logged in.

-   Home page is the entry point. Logged in user’s display name will appear after the Welcome, while logged out users or visitors will not appear.
-   Search page allows users to query a 3rd party API with results shown as cards that can be flipped when hovering over.
    -   These cards show brief descriptions regarding cat breeds. Users are able to click on More at the bottom of the back of each card, it will bring them to the corresponding detailed page.
    -   Users can also click the icon to the right of cat breed to view its Wikipedia page.
        On the detailed page for cat breed, logged in users can comment or like. The content and number of comments and likes will be displayed.
-   Posts page allows users to view posts created by logged in users. Click on a post title to direct to its detail page; Click on an author to view author’s profile.
-   On the detailed page for post, users will view all the comments and who commented on the post. Logged in users can also comment.
-   Notifications page provides users with subscription to push notifications from the website. Only logged in administrators will see and make push notifications from a dedicated block on this page.
-   About page displays a brief introduction about the website.
-   Register page allow users to create a new account. Once registered, users will be automatically logged in and redirect to the home page.
    -   Users can specify as an administrator when they register. (This is necessary and also required as administrator to send push notifications to subscribed users)
-   Login page allows users to log in, and then they can like or comment on any posts and cat breeds, perform CRUD operations on their posts as well as edit their profiles.
-   Profile page, which allows users to update their personal information, can be accessed by clicking their display names on each comment or post. It can also be accessed via URL with correct user name. On the profile page, other users, no matter whether they are logged in or not, will not see personal email address. But any users can see the published posts created by this user.

#### 2. The different responsibilities and abilities of the different users

| Functionality                            | Visitor | Registered User | Administrator |
| ---------------------------------------- | ------- | --------------- | ------------- |
| View Posts, Comments and Search          | √       | √               | √             |
| Create/Read/Update/Delete Personal Posts | X       | √               | √             |
| Comment on Posts and Cats                | X       | √               | √             |
| Subscribe Notifications                  | X       | √               | √             |
| Push Notifications                       | X       | X               | √             |

#### 3. APIs and data models walkthrough

APIs:

There are 9 APIs or routes to serve the requests from the front-end.

-   /auth handles login POST request and creates Json Web Token for user, also it handles JWT validation POST request to enforce user authentication and authorization.
-   /subscribe handles the POST request from administrator, pushing notifications to subscribed users.
-   /api/v1/cats handles GET request and send all the cats’ information.
-   /api/v1/posts handles GET POST PUT DELETE requests to perform CRUD operations on data stored in database.
-   /api/v1/users handles GET POST PUT requests to get a user by user name or ID, create a user, update the display name, email, or subscription of a user.
-   /api/v1/comments handles GET POST requests to get all comments under a post ID, create a comment for a post.
-   /api/v1/catcomments is similar to comments, it handles GET POST requests to get all comments under a cat name, create a comment for a cat.
-   /api/v1/likes handles GET POST DELETE requests to get all likes under a cat name, check if there is a like under a cat name by a user name, create a like for a cat, delete the like by a user for a cat.
-   /api/v1/profile handles GET request to get user profile by user ID.

Data Models: There are 6 models including models for Cats, CatComments, Posts, PostComments, Users, Likes.

#### 4. Self-defined Component

The self-defined component in this project is Progressive Web Apps or PWAs, featuring push notifications and offline access.

How does it work?

-   These two features basically use service worker to handle caching and push/receive notifications. Service worker will be registered once the website is opened. It will cache all the pages user visited and when going offline, it will fetch these cached files and render the pages for users. For push notifications, it requires that push messages triggered from a backend be done via the Web Push Protocol and if you want to send data with your push message, you must also encrypt that data according to the Message Encryption for Web Push specifications. So I used a node library web-push to ease the my process of push. Basically, a push event listener will be enabled when the service worker is registered, administrators will make a post request containing push title and content to the back-end, where users that have subscribed in database will be identified and their subscription stored as a field of user will be retrieved and send back to users along with the push payload. Then service work will get the message and make the browser show notification banner to users.

What was interesting?

-   The interesting part is push notifications to all the subscribed users using supported browsers. It’s like group messaging and users will keep informed of the activities from the website.

What were the challenges?

-   The tutorials for service workers are for JavaScript. To implement push notifications in React, I have to figure out where and how to refactor the code in order to make it work. After searching online resources and exploring various approaches by myself, I found a solution to it.
-   Implementing push notifications using web-push node library is also a big challenge. There are not many tutorials for web-push, but there are many regarding Google’s firebase server for push notifications. Since I’ve already completed a demo in project check-in 1, I tend to implement it using previous experience and web-push library. In check-in 1 I did push to one user, but this time, I need to push to all the subscribed users. By investigating the example of firebase implementation and searching web-push usage examples, I finally solved this problem by looping over all the users in database and get the subscribed ones, and then handle these subscriptions one by one. Hence, all the subscribed users can get the notifications.

Would you use it again in the future?

-   Yes, because PWAs have advantages over traditional web apps and may become closer to native apps in future.

#### 5. A discussion of all the challenges you faced and how you overcame them

-   Implementing PWAs features: push notifications and offline access, which has been discussed before in Section 4.
-   Implementing user authentication and authorization using Json Web Token. Lectures haven’t covered JWT or Session yet. So I have to learn user authorization and authentication from online resources. At first, I used passport-local strategy from passport library to identify the user by comparing the password, but then I found that it was difficult to authenticate the user across the website without using more appropriate way: Json Web Tokens or Sessions. Though JWT is less secure than session, it is easier to implement by referencing online resources. After studying different examples, I managed to implement user authentication and authorization by JWT.
-   State management using useContext React hook. To better manage the global state like JWT to authenticate the user, I used useContext React hook and put it in the App.js file above routes of different components so that all the page across the website can access to JWT and enforce separated views and functionalities for different users in different roles.
-   In development mode, the web app could automatically log in after user registered. However, when deployed to Heroku, the login POST (after register POST completed) to the server could not be handled correctly. Due to the deadline, I've changed the automatically logging in to redirecting user to log in page after registration.

#### 6. Highlighting all of the stylistic choices and how your websites behaves when on smaller devices.

For style, the website used React Bootstrap to keep a consistent theme. The content of each page is rendered in a Card-like container. By using the components, like `<Row>`, `<Col>` from bootstrap, the website is responsive and will automatically change the layout and size when opened by smaller devices.

#### 7. Any technologies you change out or libraries/frameworks you added

-   In order to incorporate the 3rd party API into the website’s commenting and liking functionalities, I modified the original data model shown in the proposal to current one with Cats, CatComments, and Likes added.
-   Aside from bcrypt for password handling, passport and json-web-token for JWT handling, I’ve added web-push to handle push notifications, moment js to display user-friendly timestamp.

#### 8. Future plans for this project

-   Make information richer for users, like adding profile pictures, showing liked cats in user’s profile.
-   Adopt a more customed UI or theme instead of just using bootstrap.
-   Add an administration panel or console for better content management and increase the abilities of administrators so that they can delete inappropriate comments.
-   Add users’ interactions with each other, such as reply to, like, or dislike users’ comments.

#### 9. Issue when handling automatical logging in after registration

-   This issue only happens in production not in development.

-   In `Register.jsx` file, `handleRegister` and `handleLogin` are called sequentially, and each of them has a post request. The `handleLogin` function in `auth.controller.js` file runs `const user = await User.findOne({ userName })`, which may return null because of previous registration's having not written this user into the MongoDB database. It would then cause error for logging in. To solve this problem, `const dummyUser = await User.find({ userName })` has been added before `const user = await User.findOne({ userName })`, which may buy some time for the registration process so that registration would be in the database before logging in happens. Further investigation is still needed.

#### 10. How to protect/hide the 3rd party API keys in the front-end of a MERN stack app in production instead of development

-   One possible solution might be adding a back-end endpoint for the front-end to fetch the API key or letting the back-end do the requests.

App link: https://catpark.herokuapp.com

Reference:

-   Devistry: MERN stack user authentication series https://www.youtube.com/watch?v=4_ZiJGY5F38

-   Matt Gaunt: Service Workers: an Introduction https://developers.google.com/web/fundamentals/primers/service-workers

-   Matt Gaunt: Adding Push Notifications to a Web App https://developers.google.com/web/fundamentals/codelabs/push-notifications

-   Matt Gaunt: Sending Messages with Web Push Libraries https://developers.google.com/web/fundamentals/push-notifications/sending-messages-with-web-push-libraries

-   Traversy Media https://www.youtube.com/watch?v=HlYFW2zaYQM

-   php step by step: React js pwa tutorial series https://www.youtube.com/watch?v=bRoRikxgIew&list=PL8p2I9GklV46NFHdQMFBjXvxwVqtJpa2N&index=1

-   Icojam https://www.iconfinder.com/Icojam
