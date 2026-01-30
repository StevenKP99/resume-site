# Resume Website Project - Claude Context & Guidelines

## Project Overview

This is a static personal resume website built with HTML, CSS, and vanilla JavaScript. Sections are generated dynamically from JSON data files to avoid hardcoding content in HTML. Current sections include:

- Experience (from experience.json or similar)
- Skills (from skills.json)
- Education (from education.json)

There is a static LinkedIn profile link and a download button linking to a static resume PDF (asset). The goal is single source of truth: update JSON → website and PDF both reflect changes automatically.

## Recommended Migration: Adopt JSON Resume Schema

To simplify maintenance, add new sections easily, and standardize data (making it portable/exportable), consolidate into **one file: data/resume.json** using the open JSON Resume schema[](https://jsonresume.org/schema/).

Key benefits:

- One file to edit instead of multiple JSONs.
- Standard sections: basics (intro/about me), profiles (LinkedIn), work (experience), education, skills, certificates/interests (for additional info).
- Extensible and community-supported.

### Core Schema Sections (from JSON Resume v1.0+)

```json
{
  "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json",
  "basics": {
    "name": "Steven Puckett",
    "label": "Software Engineer",
    "email": "steven.k.puckett24@gmail.com",
    "phone": "(918) 230-6879",
    "url": "https://spuckett.com",
    "summary": "Your About Me / Intro paragraph(s). This is perfect for a professional summary or bio.",
    "location": { ... },
    "profiles": [
      {
        "network": "LinkedIn",
        "username": "stevenpuckett1",
        "url": "https://www.linkedin.com/in/stevenpuckett1"
      },
      {
        "network": "GitHub",
        "username": "StevenKP99",
        "url":  "https://github.com/StevenKP99"
      }
    ]
  },
  "work": [ /* array of experience objects */ ],
  "education": [ /* array of education objects */ ],
  "skills": [ /* array of skill objects */ ],
  "certificates": [ /* for additional certs/licenses */ ],
  "interests": [ /* for hobbies, languages, or misc additional info */ ]
  // Add more like projects, awards, languages as needed
}
```
