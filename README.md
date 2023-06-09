# Donut PCs

Donut PCs is a website application that uses React and Django

## Table of Contents

- [Donut PCs](#donut-pcs)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
    - [Environment Variables Setup](#environment-variables-setup)
    - [Database Setup](#database-setup)
    - [Server Setup](#server-setup)
  - [How to Run](#how-to-run)
    - [Running the Server](#running-the-server)
  - [FAQ](#faq)

## Setup

### Environment Variables Setup

1. Run secret_key.py to get Django secret key

   ```txt
   python server/scripts/secret_key.py
   ```

2. create a `.env` file within `server/`

   ```txt
   cp .env.example .env
   ```

3. Enter your PostgreSQL username, password, and Django secret_key in the env file.

   ```txt
   POSTGRES_USERNAME="<PostgreSQL Username>"
   POSTGRES_PASSWORD="<PostgreSQL Password>"
   SECRET_KEY="<SECRET_KEY>"
   ```

### Database Setup

> This section assumes that PostgreSQL has been installed and configured on you system

1. Create a database in PostgreSQL named `donut_pcs`

   ```txt
   psql
   ```

   ```txt
   CREATE DATABASE donut_pcs;
   ```

### Server Setup

1. Install `virtualenv` on your system.

   **Unix/macOS**

   ```txt
   python3 -m pip install --user virtualenv
   ```

   **Windows**

   Before starting, you may need to add python as an environment variable to PATH on your system.

   ```txt
   python -m ensurepip
   ```

   ```txt
   py -m pip install --user virtualenv
   ```

2. Create the virtual environment

   ```txt
   virutalenv env
   ```

3. Run the virtual environment in your system.

   **Unix/macOS**

   ```txt
   source env/bin/activate
   ```

   **Windows**

   ```txt
   .\env\Scripts\activate
   ```

   If the environment doesn't get activated, open powershell as adminstrator and run the following command first:

   ```txt
   Set-ExecutionPolicy RemoteSigned
   ```

4. Install the packages in `requirements.txt`.

   ```txt
   pip install -r requirements.txt
   ```

5. Change to the server directory.

   ```txt
   cd server
   ```

6. Set up and migrate the database.

   Prior to running these commands, make sure that your project Environment Variables are set up

   ```txt
   python manage.py makemigrations
   python manage.py migrate
   ```

7. Create a superuser (Owner Account)

   ```txt
   python manage.py createsuperuser
   ```

8. Load the fixtures

   Mac/Linux:
   ```txt
   python manage.py loaddata items/fixtures/*/*.json
   ```

   Windows:
   ```txt
   foreach ($f in Get-ChildItem .\items\fixtures\*\*.json) { python manage.py loaddata $f.FullName }
   ```

## How to Run

### Running the Server

1. Change to the server directory.

   ```txt
   cd server
   ```

2. Run the following command to run the server.

   ```txt
   python manage.py runserver
   ```

## FAQ

- How would you flush the database?

  Go into the server directory and run the following command.

  ```txt
  python manage.py flush
  ```

- How can I reset the database if I'm having issues with `makemigrations` and `migrate`?

  1. Use `psql` to recreate the database.

     ```txt
     postgres#= DROP DATABASE donut_pcs;
     DROP DATABASE
     postgres#= CREATE DATABASE donut_pcs;
     CREATE DATABASE
     ```

  2. Go under every folder in the server folder and empty the migration folder except for `__init__.py`

  3. Run `makemigrations` and `migrate`.

  User data will be lost so you will need to create another superuser and other users you may have created.
