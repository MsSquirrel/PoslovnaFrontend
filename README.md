FRONTEND:

	- Komandom npm install instalirati sve neophodne pakete, ako u root-u projekta ne postoji node_modules folder (preporucljivo ostaviti node_modules u .gitignore i ne komitovati ga).
	
	- Posto ui-grid ima po defaultu problema sa browserify-em, pozicionirati se u PoslovnaFrontend\node_modules\angular-ui-grid, naci package.json, otvoriti u omiljenom tekstualnom editoru i izmeniti deo gde je main i niz nekih file-ova u "main": "./ui-grid.js",
	
	- Pokrenuti iz roota projekta komande browserify src/scripts/dependencies_list.js -o dist/dependencies.js
	- pa zatim browserify src/scripts/index.js -o dist/sve.js

	- Pozicionirati se na u dist folder o pokrenuti komandu http-server -c-1. 
	- http://localhost:8081/index.html#/login ( ili koji nam vec port server dodeli, mozemo videti u logu nakon prethodne http-server -c-1 komande). 

	
