# Morzen

**Advanced Personal AI Research & Intelligence Console**

Morzen is a browser-based learning platform built with vanilla HTML, CSS, and JavaScript. It offers a structured, gamified environment for studying technical disciplines — from Python and Web Development to AI Engineering — with a credit-based progression system and an AI assistant.

---

## Features

**Onboarding & Profile**
- User registration with name, email, and password stored via `localStorage`
- Protocol Selection screen where users choose 2 primary learning modules to begin
- Profile management with name update and session logout

**Learning Matrix (Courses)**
- Structured curriculum across 5 modules per course: Introduction & Basics, Core Concepts, Intermediate Topics, Advanced Techniques, and Project & Capstone
- Each module contains 5 topics with a video player interface
- Topic completion awards credits; repeated study awards 5 credits per revisit
- Primary and Additional course tabs for organized navigation

**Bon Voyage**
- An in-app course marketplace featuring 10 unlockable disciplines including Data Science, Cybersecurity, Robotics, Quantum Computing, and more
- Courses are purchased using earned credits (ranging from 25 to 60 credits)
- Unlocked courses appear directly in the Courses section

**O.R.O (Outstandingly Rocking Operator)**
- A built-in AI chat assistant providing contextual guidance on learning progress, credits, and platform usage
- Quick-action suggestion buttons for common queries

**Command Center (Home Dashboard)**
- Overview of credits earned, topics completed, and Bon Voyage courses unlocked
- Real-time module progress cards for selected primary courses

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Markup     | HTML5                               |
| Styling    | CSS3 (custom properties, flexbox)   |
| Logic      | Vanilla JavaScript (ES6+)           |
| Fonts      | Ubuntu (Google Fonts)               |
| Animations | canvas-confetti                     |
| Storage    | Browser `localStorage`              |

No frameworks, no build tools, no dependencies beyond the above CDN libraries.

---

## Project Structure


morzen-main/
├── index.html
└── assets/
    ├── home.html
    ├── courses.html
    ├── bonvoyage.html
    ├── chatbot.html
    ├── script.js
    └── style.css


---

## Available Courses

**Primary (included by default)**
- Python
- Web Development
- Java
- App Development
- Software Development
- AI Engineering

**Bon Voyage (unlockable with credits)**
- Mechanical Engineering, Astronomy, Biotechnology, Civil Engineering, Cybersecurity, Data Science, Electrical Engineering, Environmental Science, Robotics, Quantum Computing

---

## Credits System

| Action                        | Credits Awarded |
|-------------------------------|-----------------|
| Complete a topic (first time) | 10              |
| Repeat study of a topic       | 5               |

Credits are spent in Bon Voyage to unlock additional courses.

---

## Note

This project was developed as part of a hackathon and is focused on building the user interface (UI) and frontend experience only.

### Teammates

- Member One – https://github.com/memberone  
- Member Two – https://github.com/membertwo  
- Member Three – https://github.com/memberthree  
