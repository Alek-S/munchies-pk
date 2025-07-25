### Deployed Link: https://munchies-pk.vercel.app/

<br>

## Getting Started

1. Check Node.js version on 20.x 
   - Used the latest **LTS: Iron** `v20.19.3`
2. Install dependencies:
    ```sh
    npm i
    ```
3. Run dev server:
    ```sh
    npm run dev
    ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
   - Note: if 3000 is already use, it may roll over to using `3001`


## File Structure
- 📁 **src/**
   - 📁 **app/** _Next.js pages and routes_
     - **api/** _API Proxy Server & GET routes_
   - 📁 **components/** _Shared React UI Components_
   - 📁 **utils/** _Shared helper functions and other configs_
   - 📁 **store/** _Redux slices/reducers_
   - 📁 **hooks/** _Custom React hooks, mostly to wrap redux in ts types_
   - 📁 **types/** _Typescript types_
  


## NPM Commands
| Command           | Action                                    |
|-------------------|-------------------------------------------|
| `npm run dev`     | Start dev server with hot module reloading|
| `npm run build`   | Create a production build                 |
| `npm run lint`    | Run ESLint                                | 
