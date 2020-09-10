# CricBits ( IPL Statistics showing web app )
### This webapp [https://cric-bits.vercel.app] is made for the task "Front End Engineer Challenge – IPL" for Atlan

### Live hosted link :- [https://cric-bits.vercel.app]

## List of all major libraries used :-
1. ReactJs (Frontend framework)
2. Chart.js ( To draw relevant charts )
3. papaparse (To parse CSV file into JS Array)

## List of all bonus points :-
1. - [ ] Create the web app in vue.js :- I haven't followed this one as I am not familiar with this particular framework. But I have used ReactJs, and I am quite proficient in it.
2. - [x] Optimize the loading time :- I have done it. I have tried to follow almost all the best practices. The contents fetched are Gzipped. There is code splitting done to prevent large js files from being fetched on the initial load. SSR (server-side rendering) can be done, but it would be an overkill.
3. - [x] Make it mobile responsive :- It is mobile responsive. Works on all screen sizes. I have done it using "rem" as a measurement unit wherever possible and then added some media queries. Also used flexbox wherever possible.
4. - [x] Make it a PWA :- It is a progressive web app (PWA). It is following all the norms needed by the browser to treat it as installable. All the meta and link tags are present with the manifest file and with all the icon sizes.  
5. - [x] Make it offline usable :- It is full offline usable as it is not making any Http requests dynamically, and the browser caches all the assets (CSV file) as I have registered serviceWorker on it.

## Functions of the webapp :-
1. The web app shows a comparison and "Overall" stats for all the seasons and all the teams of IPL at first.
2. Stats of individual team can be seen by clicking on the individual team names from the list shown at the left of the web app.
3. "Overall" stats can be shown again by clicking on the "CricBits" logo.
