# Demo Social Media

Simple social media type app to showcase React and NextJs usage.

Users can create an account and login, then can view posts made by other users, in addition to being able to contribute their own posts.

Posts and User data is stored in a text file currently, since this project is not intended to demonstrate backend development I did not put much time into making those two areas watertight and beautiful. However, in theory, you would only need to update `UserService.ts` and `PostService.ts` to upgrade this to a better storage medium.

Styling is done using css modules with modules stored next to the component/page they are for, except in the case of common styles that are used in multiple places. These are stored in `src/styles`.

Code is formatted using dprint, run `npm run fmt` or `npm run fmt:check` to format or check the formatting respectively.

## Development

`npm run dev` will build the project and start the dev server on `localhost:3000`

`npm run build` will run a production build.

`npm run tsc` or `npm run tsc:watch` will run the typescript compiler.
