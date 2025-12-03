# Student Discount Hub
### CSCE 3444 Software Engineering | Group 17

A full stack web application designed to help college students discover verified discounts on local and online products and services.  
Our goal is to centralize student exclusive deals into one easy to use platform while ensuring authenticity and a smooth user experience.

---

## Table of Contents
- [Overview](#overview)
- [Project Goals](#project-goals)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Installation and Setup](#installation-and-setup)
- [Usage Guide](#usage-guide)
- [Progress and Milestones](#progress-and-milestones)
- [Team Members](#team-members)
- [Contributing](#contributing)
- [Links](#links)
- [License](#license)

---

## Overview
Student Discount Hub is a centralized web portal for discovering discounts offered to students from various retailers, restaurants, and online platforms.  
Users can register with a verified school email, browse categorized deals, save favorites, and submit new discounts for approval.

This project demonstrates real world software engineering principles including:
- Requirement analysis
- Team collaboration using Trello
- Software design using UML and diagrams
- Implementation with GitHub version control
- Testing, validation, and continuous updates

---

## Project Goals
1. Centralize student discounts into an organized platform  
2. Simplify discovery using search and filtering features  
3. Ensure authenticity through verification and admin moderation  
4. Support collaboration and maintain transparent development using Trello and GitHub  
5. Demonstrate the software engineering workflow from design to deployment

---

## Features
- User Authentication: Register or log in using a username and password
- Discount Directory: Browse discounts by category
- Search and Filter: Find deals based on keywords or type such as food or tech  
- User Submissions: Submit new deals for admin verification  
- User Editing: Users can edit and delete their own submitted discounts
- Admin Panel: Approve, edit, or remove discount listings in Airtable (edit and remove in the application itself)
- Responsive Design: Works on mobile and desktop screens

---

## System Architecture
The web application uses:
- **Frontend:** HTML, CSS, JS  
- **Backend/Database:** Airtable API  
- **Hosting:** Netlify / Vercel (optional)  
- **Version Control:** GitHub

Data flows from Airtable → API calls (fetch) → dynamic rendering of discount cards.

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Airtable REST API |
| Authentication | Custom (Username + Password stored in Users table) |
| Deployment | Netlify / Vercel |
| Version Control | GitHub |

---

# Student Discount Hub

A web application that helps students find discounts and deals available to them. This project was developed by Group 17.

## Features

- Browse a list of student discounts by category.
- Search for discounts by store or type.
- User-friendly interface for easy navigation.

## Installation and Setup

### Method 1: GitHub Pages

1. Open https://cr1ms0nc0de.github.io/Group-17-Student-Discount-Hub/

### Method 2: Cloning

1. Clone the repository:
```bash
git clone https://github.com/Cr1ms0nC0de/Group-17-Student-Discount-Hub
```
2. Open index.html
