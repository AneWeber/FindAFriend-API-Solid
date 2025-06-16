# 🐶🐱 FIND A FURRY FRIEND 🐱🐶

Our app connects animal welfare organizations (ORGs) with potential adopters, making pet adoption easier and more accessible. By increasing pet visibility and simplifying communication, we help more animals find loving homes.


https://github.com/user-attachments/assets/1a2482f2-2fd5-42aa-9e21-11f31ffcce56


## Application Rules

- [x] It must be possible to register a pet.
- [x] It must be possible to list all pets available for adoption in a city.
- [x] It must be possible to filter pets by their characteristics.
- [x] It must be possible to view details of a pet for adoption.
- [x] It must be possible to register as an ORG.
- [x] It must be possible to log in as an ORG.

## Business Rules

- [x] To list pets, it is mandatory to provide the city.
- [x] An ORG must have an address and a WhatsApp number.
- [x] A pet must be linked to an ORG.
- [x] The user who wants to adopt will contact the ORG via WhatsApp.
- [x] All filters, except for the city, are optional.
- [x] For an ORG to access the application as an admin, it must be logged in.

## How to try

### terminal 01:
- npm install (install packages)
- npm run build (compile project)
- npm run start (start project)

### terminal 02:
- docker-compose up --build -d (create and execute docker)
- npx prisma migrate dev (execute migrations)
- npm run test:ui (run all tests)
- *or use the Insomnia file available to test manually*
