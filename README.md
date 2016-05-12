FRONTEND:

	- Komandom npm install instalirati sve neophodne pakete, ako u root-u projekta ne postoji node_modules folder (preporucljivo ostaviti node_modules u .gitignore i ne komitovati ga).

	- Pokrenuti komandu browserify src/scripts/dependencies_list.js -o dependencies.js, pa zatim browserify src/scripts/index.js -o dist/sve.js iz roota projekta.

	- Pozicionirati se na u dist folder o pokrenuti komandu http-server -c-1. 
	- http://localhost:8081/index.html#/login ( ili koji nam vec port server dodeli, mozemo videti u logu nakon prethodne http-server -c-1 komande). 

	
