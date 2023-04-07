export class DB {
    constructor() {
        this.projects = [
            {
                title: 'Website Redesign',
                due_date: '2023-05-30',
                bookmark: true,
                tasks: [
                    { name: 'Analyze website metrics', status: true },
                    { name: 'Define design requirements', status: false },
                    { name: 'Create wireframes', status: true },
                    { name: 'Design website layout', status: true },
                    { name: 'Conduct user testing', status: false },
                ],
                note: 'Improve user experience and engagement on website through design and testing.',
            },
            {
                title: 'Social Media Campaign',
                due_date: '2023-06-15',
                bookmark: false,
                tasks: [
                    { name: 'Define target audience', status: true },
                    { name: 'Create social media calendar', status: true },
                    { name: 'Develop content strategy', status: false },
                    { name: 'Execute campaigns on social media', status: false },
                    { name: 'Monitor and analyze campaign performance', status: false },
                ],
                note: 'Boost brand awareness and engagement through effective social media content and campaigns.',
            },
            {
                title: 'Mobile App Development',
                due_date: '2023-07-10',
                bookmark: false,
                tasks: [
                    { name: 'Define app features', status: true },
                    { name: 'Create wireframes and UI designs', status: false },
                    { name: 'Develop app functionality', status: false },
                    { name: 'Conduct testing and debugging', status: false },
                    { name: 'Launch app on app store', status: false },
                ],
                note: 'Create a functional and user-friendly mobile app for customers.',
            },
            {
                title: 'Content Marketing',
                due_date: '2023-08-05',
                bookmark: false,
                tasks: [
                    { name: 'Develop content strategy', status: false },
                    { name: 'Create content calendar', status: true },
                    { name: 'Write blog articles', status: true },
                    { name: 'Produce social media content', status: false },
                    { name: 'Monitor content performance', status: false },
                ],
                note: 'Drive traffic and increase engagement through strategic content creation and distribution.',
            },
            {
                title: 'Market Research Study',
                due_date: '2023-09-01',
                bookmark: false,
                tasks: [
                    { name: 'Define research objectives', status: true },
                    { name: 'Develop research methodology', status: true },
                    { name: 'Collect and analyze data', status: true },
                    { name: 'Generate insights and recommendations', status: false },
                    { name: 'Create research report', status: false },
                ],
                note: 'Generate valuable insights to inform business decisions.',
            },
            {
                title: 'Product Launch',
                due_date: '2023-10-10',
                bookmark: false,
                tasks: [
                    { name: 'Define product features', status: true },
                    { name: 'Develop product positioning', status: false },
                    { name: 'Create product messaging', status: true },
                    { name: 'Plan launch event', status: false },
                    { name: 'Execute launch strategy', status: false },
                ],
                note: 'Successfully launch a new product into the market through effective planning and execution.',
            },
            {
                title: 'Employee Training Program',
                due_date: '2023-11-15',
                bookmark: true,
                tasks: [
                    { name: 'Assess training needs', status: true },
                    { name: 'Develop training modules', status: false },
                    { name: 'Deliver training sessions', status: false },
                    { name: 'Assess training effectiveness', status: false },
                    { name: 'Provide ongoing training and support', status: false },
                ],
                note: 'Improve employee skills and performance through targeted and effective training programs.',
            },
            {
                title: 'Sales Team Performance',
                due_date: '2023-12-10',
                bookmark: false,
                tasks: [
                    { name: 'Analyze sales metrics', status: true },
                    { name: 'Identify areas for improvement', status: false },
                    { name: 'Develop sales training program', status: false },
                    { name: 'Implement sales training program', status: false },
                    { name: 'Monitor and evaluate sales team', status: true },
                ],
                note: 'Improve sales team performance and increase revenue through effective training and support.',
            },
            {
                title: 'Customer Service Improvement',
                due_date: '2024-01-15',
                bookmark: true,
                tasks: [
                    { name: 'Analyze customer feedback', status: false },
                    { name: 'Develop service improvement plan', status: false },
                    { name: 'Implement service improvements', status: false },
                    { name: 'Monitor customer satisfaction', status: false },
                ],
                note: 'Enhance customer experience and satisfaction through effective customer service improvements and training.',
            },
        ];
    }
}