# Hhbuilder

Your application needs a way to capture information about a household applying
for health insurance coverage. Develop a UI for building a household up from
individual people.

## Task

You have been given an HTML page with a form and a placeholder for displaying
a household.

In the given index.js file, replace the "Your code goes here" comment with JavaScript that can:

- Validate data entry (age is required and > 0, relationship is required)
- Add people to a growing household list
- Remove a previously added person from the list
- Display the household list in the HTML as it is modified
- Serialize the household as JSON upon form submission as a fake trip to the server

## Notes

Don't modify the given index.html file in any way. You're of course still allowed to modify the DOM through Javascript.

You must write JavaScript, not a language that compiles down to JavaScript. You
must use ES3 or ES5/5.1 standard. Assume the capabilities of a modern
mainstream browser in wide use, i.e., no bleeding-edge features. No 3rd party
libraries — i.e., no jQuery.

The display of the household list is up to you.

On submission, put the serialized JSON in the provided "debug" DOM element and display that element.

After submission, the user should be able to make changes and submit the household again.

You don't need to add validations around anything other than the age and relationship requirements described above. It's ok for someone to add 35 parents.

The focus here is on the quality of your JavaScript, not the beauty of your design. The controls you add around viewing and deleting household members should be usable but need not be much to look at.

## Reviewing the Work

To review the work simply open the index.html file in a browser. The Javascript in index.js does not require any specific development environment or build process in order to run properly.

## Running Tests

Unit tests are run using Karma and Jasmine. To run tests, first install the necessary npm packages:

```
npm install
```

This will install Karma, the Karma Chrome launcher, the Jasmine Karma adaptor, and Jasmine itself. With those packages installed, run tests with the `test` script:

```
npm run test
```

Tests are run as a single run in a headless instance of Chrome. Results will output to the terminal.
