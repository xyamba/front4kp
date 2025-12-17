export const initialTechnologies = [{
        id: 1,
        title: "HTML & CSS",
        description: "Основы верстки веб-страниц с использованием HTML для структуры и CSS для стилизации. Включает семантическую разметку, Flexbox, Grid и адаптивный дизайн.",
        category: "frontend",
        status: "completed",
        difficulty: "beginner",
        deadline: "2024-01-15",
        resources: ["https://developer.mozilla.org/ru/docs/Web/HTML", "https://developer.mozilla.org/ru/docs/Web/CSS"],
        progress: 100
    },
    {
        id: 2,
        title: "React Hooks (useState, useEffect)",
        description: "Изучение основных хуков React для управления состоянием и побочными эффектами. Включает создание кастомных хуков и правила их использования.",
        category: "frontend",
        status: "not-started",
        difficulty: "intermediate",
        deadline: "2024-03-20",
        resources: ["https://react.dev/reference/react/hooks"],
        progress: 0
    },
    {
        id: 3,
        title: "JavaScript (ES6+)",
        description: "Современный JavaScript с новыми возможностями ES6 и выше. Включает стрелочные функции, деструктуризацию, async/await, промисы и модули.",
        category: "frontend",
        status: "in-progress",
        difficulty: "intermediate",
        deadline: "2024-02-28",
        resources: ["https://developer.mozilla.org/ru/docs/Web/JavaScript", "https://learn.javascript.ru/"],
        progress: 65
    },
    {
        id: 4,
        title: "Node.js & Express",
        description: "Серверный JavaScript с использованием Node.js и фреймворка Express для создания REST API. Включает работу с файловой системой, маршрутизацию и middleware.",
        category: "backend",
        status: "not-started",
        difficulty: "intermediate",
        deadline: "2024-04-15",
        resources: ["https://nodejs.org/", "https://expressjs.com/"],
        progress: 0
    },
    {
        id: 5,
        title: "React Basics (JSX, Components, Props)",
        description: "Основы React: JSX синтаксис, функциональные и классовые компоненты, передача пропсов, управление состоянием компонентов.",
        category: "frontend",
        status: "completed",
        difficulty: "beginner",
        deadline: "2024-01-30",
        resources: ["https://react.dev/learn"],
        progress: 100
    },
    {
        id: 6,
        title: "MongoDB",
        description: "NoSQL база данных для современных приложений. Включает работу с документами, коллекциями, агрегациями и построение запросов.",
        category: "database",
        status: "not-started",
        difficulty: "intermediate",
        deadline: "2024-05-10",
        resources: ["https://www.mongodb.com/", "https://www.mongodb.com/docs/"],
        progress: 0
    },
    {
        id: 7,
        title: "Tailwind CSS",
        description: "Утилитарный CSS фреймворк для быстрой разработки интерфейсов. Позволяет создавать адаптивные дизайны с помощью utility-классов.",
        category: "styling",
        status: "in-progress",
        difficulty: "beginner",
        deadline: "2024-03-05",
        resources: ["https://tailwindcss.com/"],
        progress: 40
    },
    {
        id: 8,
        title: "Redux Toolkit",
        description: "Управление состоянием в React приложениях с использованием Redux Toolkit. Включает создание слайсов, асинхронные действия и оптимизацию.",
        category: "state-management",
        status: "not-started",
        difficulty: "advanced",
        deadline: "2024-04-30",
        resources: ["https://redux-toolkit.js.org/"],
        progress: 0
    },
    {
        id: 9,
        title: "TypeScript",
        description: "Типизированный JavaScript для улучшения качества кода. Включает статическую типизацию, интерфейсы, дженерики и интеграцию с React.",
        category: "language",
        status: "in-progress",
        difficulty: "intermediate",
        deadline: "2024-03-15",
        resources: ["https://www.typescriptlang.org/"],
        progress: 30
    },
    {
        id: 10,
        title: "Git и GitHub",
        description: "Система контроля версий и платформа для совместной разработки. Включает основные команды, ветвление, merge и работу с pull requests.",
        category: "tools",
        status: "completed",
        difficulty: "beginner",
        deadline: "2024-01-20",
        resources: ["https://git-scm.com/doc", "https://github.com/"],
        progress: 100
    }
];

export const categories = [
    { id: 'frontend', name: 'Frontend', color: '#1976d2' },
    { id: 'backend', name: 'Backend', color: '#7b1fa2' },
    { id: 'database', name: 'Database', color: '#388e3c' },
    { id: 'styling', name: 'Styling', color: '#f57c00' },
    { id: 'state-management', name: 'State Management', color: '#c2185b' },
    { id: 'language', name: 'Language', color: '#0097a7' },
    { id: 'tools', name: 'Tools', color: '#5d4037' }
];

export const statuses = [
    { id: 'not-started', name: 'Не начато', color: '#9e9e9e' },
    { id: 'in-progress', name: 'В процессе', color: '#ff9800' },
    { id: 'completed', name: 'Завершено', color: '#4caf50' }
];

export const difficulties = [
    { id: 'beginner', name: 'Начальный', color: '#4caf50' },
    { id: 'intermediate', name: 'Средний', color: '#ff9800' },
    { id: 'advanced', name: 'Продвинутый', color: '#f44336' }
];