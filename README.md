In this project let's build an **Quiz Game App** by applying the concepts we have learned till now. This project allows you to practice the concepts and techniques learned till React Course and apply them in a concrete project.

You will demonstrate your skills by creating an app that will fetch data from an internal server using a component, displaying that data, routing concepts, authentication and authorization, and adding responsiveness to the website

This is an individual assessment. All work must be your own. You can request for the feedback after your project submission in the discussions.

### Prerequisites

#### UI Prerequisites

<details>
<summary>Click to view</summary>

- What is Figma?
  - Figma is a vector graphics editor and prototyping tool which is primarily web-based. You can check more info on the <a href="https://www.figma.com/" target="_blank">website</a>
- Create a Free account in Figma.
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=hrHL2VLMl7g&t=37s" target="_blank">this</a> video to create a free Figma account. Watch the video upto **00:50**
- How to Check CSS in Figma?
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=B242nuM3y2s" target="_blank">this</a> video to check CSS in a Figma screen. Watch the video upto **02:45**.
- Export Images in Figma screen

  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=NpzL1MONwaw" target="_blank">this</a> video to export images from a Figma screen.
  - Click on the Export button to get Export options as shown in the below image.

  <div style="text-align:center;margin:10px 0px 0px 45px;width:200px;">
    <img src="https://assets.ccbp.in/frontend/react-js/figma-export-option.png" />
  </div>

- Upload your exported images from Figma to Cloudinary and get image URLs from Cloudinary. Refer <a href="https://learning.ccbp.in/projects/course?c_id=fe4c935d-3ad5-4bb8-a1a5-9b045ae70010&s_id=2f72d6fe-09a7-4c0a-b0db-196740c853a0&t_id=6535e48d-fb4e-45c4-9654-3da423c79e26" target="_blank">this</a> session for better understanding.

</details>

#### Design Files

<details>
<summary>Click to view</summary>

- You can check the **Design Files** for different devices <a href="https://www.figma.com/file/CGeJPV0CILNyptjYhRk4pH/Quiz-Game?type=design&node-id=0%3A1&mode=design&t=fXttePOYSebrap8P-1" target="_blank">here</a>.

</details>

### Set Up Instructions

<details>
<summary>Click to view</summary>

- Download dependencies by running `npm install`
- Start up the app using `npm start`
</details>

### Completion Instructions

<details>
<summary>Functionality to be added</summary>
<br/>

The app must have the following functionalities

- **Login Route**

  - When an invalid credentials are provided and the **Login** button is clicked, then the respective error message received from the response should be displayed
  - When a valid credentials are provided and the **Login** button is clicked, then the page should be navigated to the Home Route
  - When an _unauthenticated_ user tries to access the Home Route, Assessment Route and Results Route, then the page should be navigated to Login Route
  - When an _authenticated_ user tries to access the Home Route, Assessment Route and Results Route, then the page should be navigated to the respective route
  - When an _authenticated_ user tries to access the Login Route, then the page should be navigated to the Home Route
  - When the **Show Password** checkbox is checked, then the password should be shown
  - When the **Show Password** checkbox is unchecked, then the password should be masked

- **Home Route**

  - When an authenticated user opens the Home Route,
    - When the **Start Quiz** button is clicked, then the page should be navigated to the Quiz Game Route

- **Quiz Game Route**
  - When an authenticated user opens the Quiz Game Route,
    - An HTTP GET request should be made to **quizQuestionsApiUrl**
      - **_loader_** should be displayed while fetching the data
      - After the data is fetched successfully,
        - The text of the first question, along with its corresponding options from the list of questions received in the response, should be displayed.
          - If the `option_type` value is `DEFAULT`, then the default options view should be displayed as shown in the Figma
          - If the `option_type` value is `IMAGE`, then the image options view should be displayed as shown in the Figma
          - If the `option_type` value is `SINGLE SELECT`, then the single select options view should be displayed as shown in the Figma.
        - The **Next Question** button should be disabled
        - The **Timer** should start running backward from the timer limit value set
          - Each question should have the time limit of **15** seconds to attempt the question
          - When a question is not attempted before the **15** seconds time limit,
            - The Question is considered as unattempted question
            - The next question text and its corresponding options should be displayed
            - If it is last question in the questions list, then the quiz should end, and the results page should be displayed.
        - If the HTTP GET request made is unsuccessful, then the failure view should be displayed as shown in the Figma
          - When the **Retry** button is clicked, an HTTP GET request should be made to **questionsApiUrl**
        - When a option is selected in the question,
          - The **Timer** should stop running
          - The **Next Question** button should be enabled
        - If the selected option is correct,
          - The selected option should be highlighted in to `#1c944b` as shown in the Output
          - The **Right Checked Circle** image should be displayed after the selected option
        - If the selected option is not correct,
          - The selected option should be highlighted in to `#bf2626` as shown in the Output
          - The **Wrong Close Circle** image should be displayed after the selected option
          - The right option should be highlighted in to `#1c944b` as shown in the Output
          - The **Right Checked Circle** image should be displayed after the right option
        - When the **Next Question** button is clicked, then the next question text and its corresponding options should be displayed
        - When the last question number in the question numbers list is clicked,
          - The **Submit** button should be displayed in the place of **Next Question** button
        - When the **Submit** button is clicked after the option is selected in the question within the time limit, then the quiz should end, and the game results route should be displayed.
- **Game Results Route**
  - If user has opted the correct answers for more than five questions
    - The user is considered as won and congrats results page should be displayed
  - If user has opted the correct answers for below five questions
    - The user is considered as lose and failure results page should be displayed
- **Game Reports Route**

  - When the **Report** button is clicked in the results page,
    - The results of the exam should be displayed along with the unattempted questions with their right options as selected as shown in the output

- **Not Found Route**

  - When a random path is provided as the URL, then the page should navigate to the Not Found Route

- **Header**

  - When the **website logo** image in the Header is clicked, the page should be navigated to the Home Route
  - When the **Logout** button in the Header is clicked in Home or Assessment or Results Route, then the page should be navigated to the Login Route

- Users should be able to view the website responsively in mobile view, tablet view as well
</details>

<details>
<summary>API Requests & Responses</summary>
<br/>

**loginApiUrl**

#### API: `https://apis.ccbp.in/login`

#### Method: `POST`

#### Request:

```json
{
  "username": "rahul",
  "password": "rahul@2021"
}
```

#### Description:

Returns a response based on the credentials provided

#### Sample Success Response

```json
{
  "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9. nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y"
}
```

#### Sample Failure Response

```json
{
  "status_code": 404,
  "error_msg": "Username is not found"
}
```

**questionsApiUrl**

#### API: `https://apis.ccbp.in/assess/questions`

#### Method: `GET`

#### Description:

Returns a response containing the list of all questions

#### Sample Response

```json
{
  "total": 10,
  "questions": [
    {
      "id": "4c08f8e2-d69a-4cfa-9245-b76bdf3588d1",
      "options_type": "DEFAULT",
      "question_text": "React JS is developed by?",
      "options": [
        {
          "id": "a8222953-e043-4873-abee-bc5dae13ee51",
          "text": "Facebook",
          "is_correct": "true"
        },
        {
          "id": "0d5470e9-915e-400f-b495-930291046216",
          "text": "Twitter",
          "is_correct": "false"
        },
        "..."
      ]
    },
    "..."
  ]
}
```

</details>

### Important Note

<details>
<summary>Click to view</summary>

<br/>

**The following instructions are required for the tests to pass**

- **Note:**

  - For Mini Projects, You have to use HTML elements to style the React Components. Usage of `styled-components` (CSS in JS) to style React components are not supported in Mini Projects. Test cases won't be passed, if you use styled components.
  - Refer to the below Example for the usage of `data-testid` in the HTML elements
    - Example: `<div data-testid="questionItem" className="question-item"/>`

- **Routes**

  - `Home` Route should consist of `/` in the URL path
  - `Quiz Game` Route should consist of `/quiz-game` in the URL path
  - `Game Results` Route should consist of `/game-results` in the URL path
  - `Game Report` Route should consist of `/game-report` in the URL path

  - **Header**

    - The Quiz Game Logo image in Header should consist of alt attribute value as `website logo`

- **Login Route**

  - The Quiz Game Logo image should consist of alt attribute value as `login website logo`

- **Home Route**

  - The game image should consist of alt attribute value as `start quiz game`.
  - Kindly follow the game instructions as shown in figma.

- **Quiz Game Route**

  - Each question should have the time limit of **15** seconds to attempt the question
  - The Failure View image should consist of alt attribute value as `failure view`
  - Wrap the `Loader` component with an HTML container element and add the `data-testid` attribute value as **loader** to it

  ```jsx
  <div className="loader-container" data-testid="loader">
    <Loader type="ThreeDots" color="#263868" height={50} width={50} />
  </div>
  ```

  - The question with `options_type` is `IMAGE`, options should have alt attribute value as the value of the key `text` of each option item in the corresponding question from the list of questions from the received response

- **Game Results Route**

  - The trophy image in the congrats results page should consist of alt attribute value as `congrats`
  - The lose image in the failure results page should consist of alt attribute value as `lose`

- **Not Found Route**
  - The Not Found image should consist of alt attribute value as `not found`

</details>

### Resources

<details>
<summary>Image URLs</summary>

- https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png alt should be **start quiz game**
- https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png alt should be **warning icon**
- https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png alt should be **correct checked circle**
- https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png alt should be **incorrect close circle**
- https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png alt should be **won**
- https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png alt should be **lose**
- https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png alt should be **correct answer icon**
- https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png alt should be **incorrect answer icon**
- https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png alt should be **unattempted icon**
- https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png alt should be **failure view**
- https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-card-bg.png **background image** in the game won view

</details>

<details>
<summary>Font-families</summary>

- Roboto

</details>

### Project Submission Instructions

- For Mini Projects, you can submit the test cases at your own pace. But we suggest you to submit the code to know the percentage of completion through test cases and that score will be considered for your interviews.
- Also it's important to publish your code frequently using `Step - 4` in the Instructions tab.

> ### _Things to Keep in Mind_
>
> - All components you implement should go in the `src/components` directory.
> - **Do not remove the pre-filled code**
> - Want to quickly review some of the concepts you’ve been learning? Take a look at the Cheat Sheets.
