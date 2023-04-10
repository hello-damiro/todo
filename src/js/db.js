export class DB {
    constructor() {
        this.projects = [
            {
                index: 0,
                title: 'Website Redesign',
                due_date: '2023-05-30',
                bookmark: true,
                color: 'white',
                tasks: [
                    { name: 'Analyze website metrics', priority: true },
                    { name: 'Define design requirements', priority: false },
                    { name: 'Create wireframes', priority: true },
                    { name: 'Design website layout', priority: true },
                    { name: 'Conduct user testing', priority: false },
                ],
                note: 'Improve user experience and engagement on website through design and testing.',
            },
            {
                index: 1,
                title: 'Social Media Campaign',
                due_date: '2023-06-15',
                bookmark: false,
                color: 'blue',
                tasks: [
                    { name: 'Define target audience', priority: true },
                    { name: 'Create social media calendar', priority: true },
                    { name: 'Develop content strategy', priority: false },
                    { name: 'Execute campaigns on social media', priority: false },
                    { name: 'Monitor and analyze campaign performance', priority: false },
                ],
                note: 'Boost brand awareness and engagement through effective social media content and campaigns.',
            },
            {
                index: 2,
                title: 'Mobile App Development',
                due_date: '2023-07-10',
                bookmark: false,
                color: 'pink',
                tasks: [
                    { name: 'Define app features', priority: true },
                    { name: 'Create wireframes and UI designs', priority: false },
                    { name: 'Develop app functionality', priority: false },
                    { name: 'Conduct testing and debugging', priority: false },
                    { name: 'Launch app on app store', priority: false },
                ],
                note: 'Create a functional and user-friendly mobile app for customers.',
            },
        ];
    }
}
