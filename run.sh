# printf "\n start container with:\ndocker-compose -p fullstack-todo -f src/docker-compose.yml up --build --force-recreate -d"
cd src/ && docker-compose up --build --force-recreate -d
printf "\nview client on http://localhost:3000\n"