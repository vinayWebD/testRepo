# Project Folder Structure and Architecture

Welcome to the documentation for the folder structure and architecture of PurDriven. This guide outlines how the project is organized and provides insights into the rationale behind our chosen structure.

## Overview

At PurDriven, we emphasize a clean and modular codebase through thoughtful organization. Our folder structure is designed to encourage maintainability, scalability, and a clear separation of concerns.

## High-Level Structure

The project's root directory contains the following main folders:
```
src/
|-- assets/
| |-- images/
| |-- styles/
|-- components/
| |-- common/
| |-- layout/
| |-- UIComponent1/
| |-- UIComponent2/
|-- hooks/
|-- services/
|-- pages/
|-- utils/
|-- App.js
|-- index.js
```

## Key Directories

- **`assets/`**: Contains static assets like images, fonts, and global styles.

- **`components/`**: Holds all kinds of components related to UI, the common ones as well.

- **`hooks/`**: Holds custom hooks that encapsulate reusable functionality.

- **`services/`**: Contains API services and utility functions for external interactions.

- **`pages/`**: Holds pages that are displayed directly to the user.

- **`utils/`**: Holds utility functions and helper modules.

## Guidelines

- Keep components focused: Each component should serve a specific purpose and ideally be reusable.

- Use feature folders: Organize components, containers, and styles within feature folders for a clearer codebase.

- Maintain consistency: Follow established patterns to ensure a consistent structure and coding style.

---

We hope this documentation helps you understand our project's architecture. If you have any questions or suggestions, feel free to reach out to the team!
