[![Build Status](https://travis-ci.org/sdsharma/promisecuous.svg?branch=master)](https://travis-ci.org/sdsharma/promisecuous)

[Staging Link](https://promisecuous-test.firebaseapp.com)

[Production Link](https://promisecuous-prod.firebaseapp.com)

[Our Final Video](https://youtu.be/a-_k3lOxX88)

## Compatibility Notes
This project currently doesn't implement any major polyfills other than those for ES6 functionality. To ensure compatibility with our application, **use the latest version of Chrome**, on both mobile and desktop. Additionally, ensure that you are using a **Node v8+** environment to make sure that all the Angular packages work.

## Getting Started
First run:

    npm install
  
Then run:

    npm start
    
This will prop up a local development server and compile and serve the angular application at localhost:4200. 

## Additional Scripts
To run lint using TSLint:

    npm run lint
  
To run tests using Karma and Protractor:

    npm test
    
  To build a production build that is stored in the /dist directory:
  
    npm run build
To build a development build that is stored in the /dist directory:

    npm run build-dev
To locally serve a production version of the code:

    npm run start-prod
  To run and view code coverage, run the following command and then navigate to localhost:8080:

     npm serve coverage

  To run and view auto generated documentation run the following command and then navigate to localhost:8080:
  

    npm run documentation
    
## Build Pipeline
To view the current status of the build, just click on the badge at the top of this README. The build process is managed by Travis CI with different stages for different parts of the development process as outlined in the image below and links to our staging and production builds can be found at the top of this README:

![Build Pipeline](https://github.com/sdsharma/promisecuous/raw/master/readme_assets/pipeline.png)

### Deploying to Production
Because Travis CI doesn't support push button deploy to production, the production version of the application must be deployed manually using the following command:

    ./deployprod.sh

## Database
The database used in this application is Firebase Realtime Database, which provides a Javascript API that allows for direct CRUD operations to be made directly through the frontend without need for a mid tier. Additionally, any changes that are made can be instantly reflected on the front end for the user.

### Schema
Our database schema is as such:

    {
	    uid: {
		    displayName: string,
		    photoURL: string,
		    email: string,
		    friends: [{
			    displayName: string,
			    photoURL: string,
			    email: string,
			    uid: string
			}],
			posts: [{
				content: string <encrypted>,
				timestamp: number,
				type: string,
				displayName: string,
				email: string,
				uid: string,
				comments: [{
					content: string <encrypted>,
					displayName: string,
					email: string,
					uid: string,
					timestamp: number
				}],
				likes: [uid]
			}]
		}
    }

## File Storage
File storage for our application is handled using FireStore, this provides a simple API to upload and manage files in our social network such as images. All uploads are encrypted and only accessible for authenticated users.

## Hosting
Hosting of our application is done using Firebase Hosting; when tied into our build pipeline it allows us to automatically build production and development versions of the application and push them into their respective hosting environments. Both of these different environments can be accessed and utilized using the links found at the top of this README.

## Authentication
Authentication for this application is managed through Firebase Authentication allowing a simple API for users to login with their pre-existing Google accounts while at the same time populating their basic information within our application. Additionally, by using the Firebase service it means that users who login are granted the rights necessary to perform operation within Firebase; these operations are handled via interaction within the application. Additionally, route guards are used within the application routing to ensure certain pages of the application are only accessible when the user is properly authenticated. An example of Google Authentication can be seen below:

![Google Auth](https://github.com/sdsharma/promisecuous/raw/master/readme_assets/auth.png)

## Error Tracking
Our user error tracking is handled using Sentry. This service allows any JS errors that a user may have to automatically be logged and viewable by the developer. The data is logged here, https://sentry.io/shivam-sharma/promisecuous/ and below is an image of what the interface looks like:

![Sentry](https://github.com/sdsharma/promisecuous/raw/master/readme_assets/sentry.png)

## User Tracking 
User tracking is done using Google Analytics so that we can know in realtime how many users are on the application and which parts are in use. Additionally, this allows us to gain metrics about which features are in use and potentially later down the line fire actions based on specific portions of the application being put into use. Below is an image of what this interface looks like:

![Google Analytics](https://github.com/sdsharma/promisecuous/raw/master/readme_assets/analytics.png)

## Encryption
Encryption is handled using the Stanford JavaScript Crypto Library or SJCL which exposes a simple api to be able encrypt and decrypt content within our application on the client side. The api works like this:

    sjcl.encrypt("password", "data")
    sjcl.decrypt("password", "data")

## Component Library
Our application uses the Clarity component library created by VMware for Angular 2+ web applications, its documentation can be found [here](https://vmware.github.io/clarity/).

## Payments
Payments are handled using the Stripe API and the application doesn't allow users to use it without proper payment. This can be tested using the test cards provided by Stripe [here](https://stripe.com/docs/testing#cards) and below is an example of what a new user might see:

![Stripe](https://github.com/sdsharma/promisecuous/raw/master/readme_assets/newuser.png)

## Advertisements
As a requirement of this project, third party ads have been removed from the application, instead we have created an ad component with the following API:

    <app-ads height="300" adLink="https://nike.com" imageURL="https://nike.com/ad.png"></app-ads>

This ad component means that advertising companies would explicitly have to make a deal with us to run their ads on our service. Additionally, any links that are used in the ads are marked with a noreferrer and blank target so that the links open in a new tab and the company advertising doesn't know where the user came from.

## Progressive Web Application
Our application is a PWA with offline functionality provided via a registered service worker, and with a mobile ready responsive design so that users can feel comfortable on any platform that they use. The PWA functionality is handled using the @angular/service-worker library that works with the angular cli to autogenerate PWAs at production build time. Below is an image demonstrating the PWA functionality on an Android based device:

![PWA](https://github.com/sdsharma/promisecuous/raw/master/readme_assets/pwa.png)

## Documentation
Our documentation is autogenerated using the Compodoc library for Angular 2+ applications. This allows us to autogenerate all relevant documentation based on the project with TypeScript provided typings and create a viewable dependency graph. To create and serve the documentation run this command and navigate to localhost:8080:

    npm run documentation
Below is are images of what the documentation looks like and the auto generated dependency graph as well:

![Documentation](https://github.com/sdsharma/promisecuous/raw/master/readme_assets/documentation.png)

![Dependencies](https://github.com/sdsharma/promisecuous/raw/master/readme_assets/dependencies.png)

## Testing
Testing is done using the out of the box solutions provided by the Angular CLI. E2E tests are handled by Protractor, Unit and Integration Tests are handled by Karma and Jasmine, and Linting is covered by TSLint. Tests can be run using the following command:

    npm test

Linting can be run using the following command:

    npm run lint

### Code Coverage
Code coverage is done using the Istanbul and Teamcity reporters in combination with the Karma tests to determine what percentage of the code is covered by the tests we have written. To run code coverage run the following command and navigate to localhost:8080:

    npm run serve-coverage
 
 Below is what the coverage report looks like:

 ![Coverage](https://github.com/sdsharma/promisecuous/raw/master/readme_assets/coverage.png)

## Other Libraries of Note

### AngularFire2
Provides an easy to work with RxJS based API for Firebase Realtime Database allowing for updates to be made to Firebase and immediately reflect back onto the UI using Observables without any further API calls. Additionally it provides easy functionality for authentication using Firebase as well.

### ngrx
Provide an RxJS powered Redux state for the frontend allowing us to maintain a global state with subscriptions for immediate UI updates based on that state. Additionally it provides a side effects library so that more complicated CRUD operation in Firebase can be run in a similar manner to a reducer in an async manner and later loop back to the reducer on return.

### angulartics2
Provides simple to use Angular integration with Google Analytics by hooking up with the Angular router to track where users are. Additionally, it can be used to fire Google Analytics actions to track what features users are using.

### ngx-stripe
Provides simple observable based usage of the Stripe API and prebuilt components to make use of it on your application.

### ng2-imageupload
Provides basic image upload a resizing functionality for immediate display of the image prior to pushing it to FireStore.