CREATE TABLE students (
 students_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  password VARCHAR(100), 
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  gender VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL
  )

CREATE TABLE instructors (
    instructors_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password VARCHAR(100), 
    email VARCHAR NOT NULL,
    phone VARCHAR,
    gender VARCHAR(255) NOT NULL
  )

  CREATE TABLE master (
    instructors_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password VARCHAR(100), 
    email VARCHAR NOT NULL,
    phone VARCHAR,
    gender VARCHAR(255) NOT NULL
  )


CREATE TABLE lessons (
  lessons_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price real NOT NULL,
  description text NOT NULL
 )