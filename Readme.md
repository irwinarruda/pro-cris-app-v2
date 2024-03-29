# <img src="./assets/logo.svg" height="45pd" align="center" /> Pro Cris App V2

A native mobile app that aims to help teachers manage their work schedule and price.

**Pro Cris App V2** is a new iteration of an old project, [pro-cris-app](https://github.com/irwinarruda/pro-cris-app). I made that project one year before I started **Pro Cris App V2**. Because of that, this repository is a great way to measure how much I improved throughout one year.

<p align="center">Before/After</p>
<p align="center">
    <img width="600px" src="./assets/app_pages.gif" />
</p>

With the app, you can:

-   Register students informing how long the class lasts and how much it costs. You can also inform the days of the week that you teach that class.
-   Create a class for a student based on their app parameters.
-   Create a daily routine based on the days of the week that the students is taught.
-   Check the classes you have registered for any day.
-   Check how many classes were done with all the students.
-   Check how much money you earn with the not yet paid classes.
-   Check how many classes were done with a specific student.
-   Create a receipt informing how much the student has to pay.

There are some secondary features like storing students' position on google maps so it's easier to reach for the student location. I'm gonna let you check them out yourself running the project.

### Technologies

I gave myself 2 weeks to finish this project and I used it to learn a lot of new technologies. Here are the main ones.

-   React Native with [expo](https://expo.dev/). I'm a React web developer, and it's so magical that with React knowledge I can create a real mobile application.
-   [Redux](https://redux.js.org/). I decided to learn Redux without using [Redux Toolkit](https://redux-toolkit.js.org/) because I wanted to understand the most of how this state management system works.
-   [Google Firebase](https://firebase.google.com/) without any React Native abstraction like [React Native Firebase](https://rnfirebase.io/), because I never had the opportunity to work with cloud before.
-   [Native Base](https://nativebase.io/) which is an accessible component library. I liked it because of the declarative UI. I think declarative UI is good on React.js but it's even better on React Native since you have to style your components in the same language as the structure and logic.

### Issues

Even years after completing the project, I've observed certain issues with the technologies used or the implementation of certain components. Here's a list of those issues:

-   **Click Event Problems**: Sometimes, after opening and closing a `native-base` Modal component, all clickable items using `react-native-gesture-handler` stop working.
-   **Performance Challenges on Low-End Phones**: My suspicion is that the way `native-base` parses styles contributes to performance issues on less powerful devices.
-   **Data List Scalability**: Initially, scalability was not a primary consideration, so there is a query that stores all appointments in a single variable... In the next iteration, I plan to focus on caching and pagination for better performance.
-   **Redux Usage**: While I initially tried raw Redux for learning purposes, looking back, I realize that using Redux Toolkit would've enhanced both readability and performance.
