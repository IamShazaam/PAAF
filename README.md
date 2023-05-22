# Paf Frontend Exercise

This is a next.js application, you can search for games, but it has some problems:

- You get no match when searching for `golden joker`
- You get no match when you search for `& Carry`

Please fix the problems mentioned above, and any other issues that you think are blockers for going live.

If you don't have time to implement all fixes or improvements, please fix the ones you consider most important and
provide a list with the other issues or improvements that you would like to fix if you had more time.

Feel free to change anything you want to, but please leave the `data` folder as-is.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Jorge's fixes

 * Every fix will be written as a comment out

    [00.00.01] - minor fixes

    1. Searching for any letter ✅
        * The letter "&" changes to "and" automatically when sendid to the api in order to make "& Carry" work provisionally.
        * With extra time I would make sure the api reads the letter "&" when sended from the input.
    2. ERROR: "client.js:1 Warning: A component is changing an uncontrolled input to be controlled" ✅
        * Handled the selection when the ID is not valid
    2. Showing the real games ✅
        * Repeated games taken from the api are no longer showed on the frontend.

    [00.01.00] - minor fixes

    1. Total games showing when searching for the game.
        * Stopped the repeated games showing in the component Search.

    - Ready for deployment.


